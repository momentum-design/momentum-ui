"use strict";

exports.__esModule = true;
exports.requestAnimationTimeout = exports.cancelAnimationTimeout = void 0;

var _requestAnimationFrame = require("../requestAnimationFrame");

var cancelAnimationTimeout = function cancelAnimationTimeout(frame) {
  return (0, _requestAnimationFrame.caf)(frame.id);
};
/**
 * Recursively calls requestAnimationFrame until a specified delay has been met or exceeded.
 * When the delay time has been reached the function you're timing out will be called.
 *
 * Credit: Joe Lambert (https://gist.github.com/joelambert/1002116#file-requesttimeout-js)
 */


exports.cancelAnimationTimeout = cancelAnimationTimeout;

var requestAnimationTimeout = function requestAnimationTimeout(callback, delay) {
  var start = Date.now();

  var timeout = function timeout() {
    if (Date.now() - start >= delay) {
      callback.call();
    } else {
      frame.id = (0, _requestAnimationFrame.raf)(timeout);
    }
  };

  var frame = {
    id: (0, _requestAnimationFrame.raf)(timeout)
  };
  return frame;
};

exports.requestAnimationTimeout = requestAnimationTimeout;