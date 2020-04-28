"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @component input */

/** Input Message with required message */
var InputMessage = function InputMessage(_ref) {
  var message = _ref.message;
  return _react.default.createElement("div", {
    className: "md-input__message",
    role: "alert"
  }, message);
};

InputMessage.propTypes = {
  /** @prop message message for InputMessage component */
  message: _propTypes.default.string.isRequired
};
InputMessage.displayName = 'InputMessage';
var _default = InputMessage;
exports.default = _default;