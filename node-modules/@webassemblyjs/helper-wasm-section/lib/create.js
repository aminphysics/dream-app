"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEmptySection = createEmptySection;

var _wasmGen = require("@webassemblyjs/wasm-gen");

var _helperBuffer = require("@webassemblyjs/helper-buffer");

var _helperWasmBytecode = _interopRequireDefault(require("@webassemblyjs/helper-wasm-bytecode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var t = require("@webassemblyjs/ast");

var debug = require("debug")("wasm:createsection");

function findLastSection(ast, forSection) {
  var targetSectionId = _helperWasmBytecode.default.sections[forSection]; // $FlowIgnore: metadata can not be empty

  var moduleSections = ast.body[0].metadata.sections;
  var lastSection;
  var lastId = 0;

  for (var i = 0, len = moduleSections.length; i < len; i++) {
    var section = moduleSections[i]; // Ignore custom section since they can actually occur everywhere

    if (section.section === "custom") {
      continue;
    }

    var sectionId = _helperWasmBytecode.default.sections[section.section];

    if (targetSectionId > lastId && targetSectionId < sectionId) {
      return lastSection;
    }

    lastId = sectionId;
    lastSection = section;
  }

  return lastSection;
}

function createEmptySection(ast, uint8Buffer, section) {
  // previous section after which we are going to insert our section
  var lastSection = findLastSection(ast, section);
  var start, end;
  /**
   * It's the first section
   */

  if (lastSection == null || lastSection.section === "custom") {
    start = 8
    /* wasm header size */
    ;
    end = start;
    debug("create empty section=%s first", section);
  } else {
    start = lastSection.startOffset + lastSection.size.value + 1;
    end = start;
    debug("create empty section=%s after=%s start=%d end=%d", section, lastSection.section, start, end);
  } // section id


  start += 1;
  var sizeStartLoc = {
    line: -1,
    column: start
  };
  var sizeEndLoc = {
    line: -1,
    column: start + 1
  }; // 1 byte for the empty vector

  var size = t.withLoc(t.numberLiteral(1), sizeEndLoc, sizeStartLoc);
  var vectorOfSizeStartLoc = {
    line: -1,
    column: sizeEndLoc.column
  };
  var vectorOfSizeEndLoc = {
    line: -1,
    column: sizeEndLoc.column + 1
  };
  var vectorOfSize = t.withLoc(t.numberLiteral(0), vectorOfSizeEndLoc, vectorOfSizeStartLoc);
  var sectionMetadata = t.sectionMetadata(section, start, size, vectorOfSize);
  var sectionBytes = (0, _wasmGen.encodeNode)(sectionMetadata);
  uint8Buffer = (0, _helperBuffer.overrideBytesInBuffer)(uint8Buffer, start - 1, end, sectionBytes); // Add section into the AST for later lookups

  if (_typeof(ast.body[0].metadata) === "object") {
    // $FlowIgnore: metadata can not be empty
    ast.body[0].metadata.sections.push(sectionMetadata);
    t.sortSectionMetadata(ast.body[0]);
  }
  /**
   * Update AST
   */
  // Once we hit our section every that is after needs to be shifted by the delta


  var deltaBytes = +sectionBytes.length;
  var encounteredSection = false;
  t.traverse(ast, {
    SectionMetadata: function SectionMetadata(path) {
      if (path.node.section === section) {
        encounteredSection = true;
        return;
      }

      if (encounteredSection === true) {
        t.shiftSection(ast, path.node, deltaBytes);
        debug("shift section section=%s detla=%d", path.node.section, deltaBytes);
      }
    }
  });
  return {
    uint8Buffer: uint8Buffer,
    sectionMetadata: sectionMetadata
  };
}