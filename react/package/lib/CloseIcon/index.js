"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var CloseIcon = function CloseIcon(props) {
  var className = props.className,
      onClick = props.onClick,
      otherHTMLProps = _objectWithoutPropertiesLoose(props, ["className", "onClick"]);

  return _react.default.createElement("button", _extends({
    className: "md-close" + ("" + (className && " " + className || '')),
    onClick: onClick
  }, otherHTMLProps));
};

CloseIcon.defaultProps = {
  onClick: function onClick() {},
  className: ''
};
CloseIcon.propTypes = {
  /** @prop Handler when the user clicks the CloseIcon | () => {} */
  onClick: _propTypes.default.func,

  /** @prop Optional css class string | '' */
  className: _propTypes.default.string
};
CloseIcon.displayName = 'CloseIcon';
var _default = CloseIcon;
exports.default = _default;