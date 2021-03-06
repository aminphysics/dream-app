/** @externs */
/**
 * @externs
 * @suppress {duplicate,checkTypes}
 */
// NOTE: generated by tsickle, do not edit.
// externs from packages/animations/browser/src/dsl/animation_transition_expr.closure.js:

/** @typedef {?} */
var TransitionMatcherFn;
// externs from packages/animations/browser/src/dsl/animation_timeline_builder.closure.js:

/** @typedef {?} */
var StyleAtTime;
// externs from packages/animations/browser/src/render/web_animations/dom_animation.closure.js:
/**
 * @record
 * @struct
 */
function DOMAnimation() {}
 /** @type {?} */
DOMAnimation.prototype.onfinish;
 /** @type {?} */
DOMAnimation.prototype.position;
 /** @type {?} */
DOMAnimation.prototype.currentTime;

/**
 * @return {?}
 */
DOMAnimation.prototype.cancel = function() {};

/**
 * @return {?}
 */
DOMAnimation.prototype.play = function() {};

/**
 * @return {?}
 */
DOMAnimation.prototype.pause = function() {};

/**
 * @return {?}
 */
DOMAnimation.prototype.finish = function() {};

/**
 * @param {?} eventName
 * @param {?} handler
 * @return {?}
 */
DOMAnimation.prototype.addEventListener = function(eventName, handler) {};

/**
 * @param {?} eventName
 * @return {?}
 */
DOMAnimation.prototype.dispatchEvent = function(eventName) {};
