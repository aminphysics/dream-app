/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/transformers/node_emitter_transform", ["require", "exports", "tslib", "typescript", "@angular/compiler-cli/src/transformers/node_emitter", "@angular/compiler-cli/src/transformers/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var ts = require("typescript");
    var node_emitter_1 = require("@angular/compiler-cli/src/transformers/node_emitter");
    var util_1 = require("@angular/compiler-cli/src/transformers/util");
    function getPreamble(original) {
        return "/**\n * @fileoverview This file was generated by the Angular template compiler. Do not edit.\n * " + original + "\n * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}\n * tslint:disable\n */";
    }
    /**
     * Returns a transformer that does two things for generated files (ngfactory etc):
     * - adds a fileoverview JSDoc comment containing Closure Compiler specific "suppress"ions in JSDoc.
     *   The new comment will contain any fileoverview comment text from the original source file this
     *   file was generated from.
     * - updates generated files that are not in the given map of generatedFiles to have an empty
     *   list of statements as their body.
     */
    function getAngularEmitterTransformFactory(generatedFiles, program) {
        return function () {
            var emitter = new node_emitter_1.TypeScriptNodeEmitter();
            return function (sourceFile) {
                var g = generatedFiles.get(sourceFile.fileName);
                var orig = g && program.getSourceFile(g.srcFileUrl);
                var originalComment = '';
                if (orig)
                    originalComment = getFileoverviewComment(orig);
                var preamble = getPreamble(originalComment);
                if (g && g.stmts) {
                    var orig_1 = program.getSourceFile(g.srcFileUrl);
                    var originalComment_1 = '';
                    if (orig_1)
                        originalComment_1 = getFileoverviewComment(orig_1);
                    var _a = tslib_1.__read(emitter.updateSourceFile(sourceFile, g.stmts, preamble), 1), newSourceFile = _a[0];
                    return newSourceFile;
                }
                else if (util_1.GENERATED_FILES.test(sourceFile.fileName)) {
                    // The file should be empty, but emitter.updateSourceFile would still add imports
                    // and various minutiae.
                    // Clear out the source file entirely, only including the preamble comment, so that
                    // ngc produces an empty .js file.
                    return ts.updateSourceFileNode(sourceFile, [emitter.createCommentStatement(sourceFile, preamble)]);
                }
                return sourceFile;
            };
        };
    }
    exports.getAngularEmitterTransformFactory = getAngularEmitterTransformFactory;
    /**
     * Parses and returns the comment text (without start and end markers) of a \@fileoverview comment
     * in the given source file. Returns the empty string if no such comment can be found.
     */
    function getFileoverviewComment(sourceFile) {
        var trivia = sourceFile.getFullText().substring(0, sourceFile.getStart());
        var leadingComments = ts.getLeadingCommentRanges(trivia, 0);
        if (!leadingComments || leadingComments.length === 0)
            return '';
        var comment = leadingComments[0];
        if (comment.kind !== ts.SyntaxKind.MultiLineCommentTrivia)
            return '';
        // Only comments separated with a \n\n from the file contents are considered file-level comments
        // in TypeScript.
        if (sourceFile.getFullText().substring(comment.end, comment.end + 2) !== '\n\n')
            return '';
        var commentText = sourceFile.getFullText().substring(comment.pos, comment.end);
        // Closure Compiler ignores @suppress and similar if the comment contains @license.
        if (commentText.indexOf('@license') !== -1)
            return '';
        return commentText.replace(/^\/\*\*/, '').replace(/ ?\*\/$/, '');
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9lbWl0dGVyX3RyYW5zZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyLWNsaS9zcmMvdHJhbnNmb3JtZXJzL25vZGVfZW1pdHRlcl90cmFuc2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7O0lBR0gsK0JBQWlDO0lBRWpDLG9GQUFxRDtJQUNyRCxvRUFBdUM7SUFFdkMscUJBQXFCLFFBQWdCO1FBQ25DLE9BQU8sc0dBRUosUUFBUSxxSEFHVCxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCwyQ0FDSSxjQUEwQyxFQUFFLE9BQW1CO1FBRWpFLE9BQU87WUFDTCxJQUFNLE9BQU8sR0FBRyxJQUFJLG9DQUFxQixFQUFFLENBQUM7WUFDNUMsT0FBTyxVQUFTLFVBQXlCO2dCQUN2QyxJQUFNLENBQUMsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbEQsSUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUM7Z0JBQ3pCLElBQUksSUFBSTtvQkFBRSxlQUFlLEdBQUcsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pELElBQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRTtvQkFDaEIsSUFBTSxNQUFJLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ2pELElBQUksaUJBQWUsR0FBRyxFQUFFLENBQUM7b0JBQ3pCLElBQUksTUFBSTt3QkFBRSxpQkFBZSxHQUFHLHNCQUFzQixDQUFDLE1BQUksQ0FBQyxDQUFDO29CQUNuRCxJQUFBLCtFQUF5RSxFQUF4RSxxQkFBYSxDQUE0RDtvQkFDaEYsT0FBTyxhQUFhLENBQUM7aUJBQ3RCO3FCQUFNLElBQUksc0JBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUNwRCxpRkFBaUY7b0JBQ2pGLHdCQUF3QjtvQkFDeEIsbUZBQW1GO29CQUNuRixrQ0FBa0M7b0JBQ2xDLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixDQUMxQixVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDekU7Z0JBQ0QsT0FBTyxVQUFVLENBQUM7WUFDcEIsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQTVCRCw4RUE0QkM7SUFFRDs7O09BR0c7SUFDSCxnQ0FBZ0MsVUFBeUI7UUFDdkQsSUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDNUUsSUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsZUFBZSxJQUFJLGVBQWUsQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ2hFLElBQU0sT0FBTyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0I7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUNyRSxnR0FBZ0c7UUFDaEcsaUJBQWlCO1FBQ2pCLElBQUksVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssTUFBTTtZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQzNGLElBQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakYsbUZBQW1GO1FBQ25GLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUN0RCxPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbkUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtHZW5lcmF0ZWRGaWxlfSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcblxuaW1wb3J0IHtUeXBlU2NyaXB0Tm9kZUVtaXR0ZXJ9IGZyb20gJy4vbm9kZV9lbWl0dGVyJztcbmltcG9ydCB7R0VORVJBVEVEX0ZJTEVTfSBmcm9tICcuL3V0aWwnO1xuXG5mdW5jdGlvbiBnZXRQcmVhbWJsZShvcmlnaW5hbDogc3RyaW5nKSB7XG4gIHJldHVybiBgLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IFRoaXMgZmlsZSB3YXMgZ2VuZXJhdGVkIGJ5IHRoZSBBbmd1bGFyIHRlbXBsYXRlIGNvbXBpbGVyLiBEbyBub3QgZWRpdC5cbiAqICR7b3JpZ2luYWx9XG4gKiBAc3VwcHJlc3Mge3N1c3BpY2lvdXNDb2RlLHVzZWxlc3NDb2RlLG1pc3NpbmdQcm9wZXJ0aWVzLG1pc3NpbmdPdmVycmlkZSxjaGVja1R5cGVzfVxuICogdHNsaW50OmRpc2FibGVcbiAqL2A7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIHRyYW5zZm9ybWVyIHRoYXQgZG9lcyB0d28gdGhpbmdzIGZvciBnZW5lcmF0ZWQgZmlsZXMgKG5nZmFjdG9yeSBldGMpOlxuICogLSBhZGRzIGEgZmlsZW92ZXJ2aWV3IEpTRG9jIGNvbW1lbnQgY29udGFpbmluZyBDbG9zdXJlIENvbXBpbGVyIHNwZWNpZmljIFwic3VwcHJlc3NcImlvbnMgaW4gSlNEb2MuXG4gKiAgIFRoZSBuZXcgY29tbWVudCB3aWxsIGNvbnRhaW4gYW55IGZpbGVvdmVydmlldyBjb21tZW50IHRleHQgZnJvbSB0aGUgb3JpZ2luYWwgc291cmNlIGZpbGUgdGhpc1xuICogICBmaWxlIHdhcyBnZW5lcmF0ZWQgZnJvbS5cbiAqIC0gdXBkYXRlcyBnZW5lcmF0ZWQgZmlsZXMgdGhhdCBhcmUgbm90IGluIHRoZSBnaXZlbiBtYXAgb2YgZ2VuZXJhdGVkRmlsZXMgdG8gaGF2ZSBhbiBlbXB0eVxuICogICBsaXN0IG9mIHN0YXRlbWVudHMgYXMgdGhlaXIgYm9keS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFuZ3VsYXJFbWl0dGVyVHJhbnNmb3JtRmFjdG9yeShcbiAgICBnZW5lcmF0ZWRGaWxlczogTWFwPHN0cmluZywgR2VuZXJhdGVkRmlsZT4sIHByb2dyYW06IHRzLlByb2dyYW0pOiAoKSA9PlxuICAgIChzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlKSA9PiB0cy5Tb3VyY2VGaWxlIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGVtaXR0ZXIgPSBuZXcgVHlwZVNjcmlwdE5vZGVFbWl0dGVyKCk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpOiB0cy5Tb3VyY2VGaWxlIHtcbiAgICAgIGNvbnN0IGcgPSBnZW5lcmF0ZWRGaWxlcy5nZXQoc291cmNlRmlsZS5maWxlTmFtZSk7XG4gICAgICBjb25zdCBvcmlnID0gZyAmJiBwcm9ncmFtLmdldFNvdXJjZUZpbGUoZy5zcmNGaWxlVXJsKTtcbiAgICAgIGxldCBvcmlnaW5hbENvbW1lbnQgPSAnJztcbiAgICAgIGlmIChvcmlnKSBvcmlnaW5hbENvbW1lbnQgPSBnZXRGaWxlb3ZlcnZpZXdDb21tZW50KG9yaWcpO1xuICAgICAgY29uc3QgcHJlYW1ibGUgPSBnZXRQcmVhbWJsZShvcmlnaW5hbENvbW1lbnQpO1xuICAgICAgaWYgKGcgJiYgZy5zdG10cykge1xuICAgICAgICBjb25zdCBvcmlnID0gcHJvZ3JhbS5nZXRTb3VyY2VGaWxlKGcuc3JjRmlsZVVybCk7XG4gICAgICAgIGxldCBvcmlnaW5hbENvbW1lbnQgPSAnJztcbiAgICAgICAgaWYgKG9yaWcpIG9yaWdpbmFsQ29tbWVudCA9IGdldEZpbGVvdmVydmlld0NvbW1lbnQob3JpZyk7XG4gICAgICAgIGNvbnN0IFtuZXdTb3VyY2VGaWxlXSA9IGVtaXR0ZXIudXBkYXRlU291cmNlRmlsZShzb3VyY2VGaWxlLCBnLnN0bXRzLCBwcmVhbWJsZSk7XG4gICAgICAgIHJldHVybiBuZXdTb3VyY2VGaWxlO1xuICAgICAgfSBlbHNlIGlmIChHRU5FUkFURURfRklMRVMudGVzdChzb3VyY2VGaWxlLmZpbGVOYW1lKSkge1xuICAgICAgICAvLyBUaGUgZmlsZSBzaG91bGQgYmUgZW1wdHksIGJ1dCBlbWl0dGVyLnVwZGF0ZVNvdXJjZUZpbGUgd291bGQgc3RpbGwgYWRkIGltcG9ydHNcbiAgICAgICAgLy8gYW5kIHZhcmlvdXMgbWludXRpYWUuXG4gICAgICAgIC8vIENsZWFyIG91dCB0aGUgc291cmNlIGZpbGUgZW50aXJlbHksIG9ubHkgaW5jbHVkaW5nIHRoZSBwcmVhbWJsZSBjb21tZW50LCBzbyB0aGF0XG4gICAgICAgIC8vIG5nYyBwcm9kdWNlcyBhbiBlbXB0eSAuanMgZmlsZS5cbiAgICAgICAgcmV0dXJuIHRzLnVwZGF0ZVNvdXJjZUZpbGVOb2RlKFxuICAgICAgICAgICAgc291cmNlRmlsZSwgW2VtaXR0ZXIuY3JlYXRlQ29tbWVudFN0YXRlbWVudChzb3VyY2VGaWxlLCBwcmVhbWJsZSldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzb3VyY2VGaWxlO1xuICAgIH07XG4gIH07XG59XG5cbi8qKlxuICogUGFyc2VzIGFuZCByZXR1cm5zIHRoZSBjb21tZW50IHRleHQgKHdpdGhvdXQgc3RhcnQgYW5kIGVuZCBtYXJrZXJzKSBvZiBhIFxcQGZpbGVvdmVydmlldyBjb21tZW50XG4gKiBpbiB0aGUgZ2l2ZW4gc291cmNlIGZpbGUuIFJldHVybnMgdGhlIGVtcHR5IHN0cmluZyBpZiBubyBzdWNoIGNvbW1lbnQgY2FuIGJlIGZvdW5kLlxuICovXG5mdW5jdGlvbiBnZXRGaWxlb3ZlcnZpZXdDb21tZW50KHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpOiBzdHJpbmcge1xuICBjb25zdCB0cml2aWEgPSBzb3VyY2VGaWxlLmdldEZ1bGxUZXh0KCkuc3Vic3RyaW5nKDAsIHNvdXJjZUZpbGUuZ2V0U3RhcnQoKSk7XG4gIGNvbnN0IGxlYWRpbmdDb21tZW50cyA9IHRzLmdldExlYWRpbmdDb21tZW50UmFuZ2VzKHRyaXZpYSwgMCk7XG4gIGlmICghbGVhZGluZ0NvbW1lbnRzIHx8IGxlYWRpbmdDb21tZW50cy5sZW5ndGggPT09IDApIHJldHVybiAnJztcbiAgY29uc3QgY29tbWVudCA9IGxlYWRpbmdDb21tZW50c1swXTtcbiAgaWYgKGNvbW1lbnQua2luZCAhPT0gdHMuU3ludGF4S2luZC5NdWx0aUxpbmVDb21tZW50VHJpdmlhKSByZXR1cm4gJyc7XG4gIC8vIE9ubHkgY29tbWVudHMgc2VwYXJhdGVkIHdpdGggYSBcXG5cXG4gZnJvbSB0aGUgZmlsZSBjb250ZW50cyBhcmUgY29uc2lkZXJlZCBmaWxlLWxldmVsIGNvbW1lbnRzXG4gIC8vIGluIFR5cGVTY3JpcHQuXG4gIGlmIChzb3VyY2VGaWxlLmdldEZ1bGxUZXh0KCkuc3Vic3RyaW5nKGNvbW1lbnQuZW5kLCBjb21tZW50LmVuZCArIDIpICE9PSAnXFxuXFxuJykgcmV0dXJuICcnO1xuICBjb25zdCBjb21tZW50VGV4dCA9IHNvdXJjZUZpbGUuZ2V0RnVsbFRleHQoKS5zdWJzdHJpbmcoY29tbWVudC5wb3MsIGNvbW1lbnQuZW5kKTtcbiAgLy8gQ2xvc3VyZSBDb21waWxlciBpZ25vcmVzIEBzdXBwcmVzcyBhbmQgc2ltaWxhciBpZiB0aGUgY29tbWVudCBjb250YWlucyBAbGljZW5zZS5cbiAgaWYgKGNvbW1lbnRUZXh0LmluZGV4T2YoJ0BsaWNlbnNlJykgIT09IC0xKSByZXR1cm4gJyc7XG4gIHJldHVybiBjb21tZW50VGV4dC5yZXBsYWNlKC9eXFwvXFwqXFwqLywgJycpLnJlcGxhY2UoLyA/XFwqXFwvJC8sICcnKTtcbn1cbiJdfQ==