"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var InputHelper = function InputHelper(_ref) {
  var message = _ref.message,
      className = _ref.className,
      props = _objectWithoutPropertiesLoose(_ref, ["message", "className"]);

  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: "md-input__help-text" + ("" + (className && " " + className || ''))
  }, props), message);
};

InputHelper.propTypes = {
  /** @prop Optional css class name | '' */
  className: _propTypes.default.string,

  /** @prop Input help message for parent Input | null */
  message: _propTypes.default.string.isRequired
};
InputHelper.defaultProps = {
  className: '',
  message: null
};
InputHelper.displayName = 'InputHelper';
var _default = InputHelper;
exports.default = _default;