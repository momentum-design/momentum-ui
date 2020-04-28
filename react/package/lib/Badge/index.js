"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Badge = function Badge(props) {
  var className = props.className,
      rounded = props.rounded,
      color = props.color,
      otherHTMLProps = _objectWithoutPropertiesLoose(props, ["className", "rounded", "color"]);

  return _react.default.createElement("span", _extends({
    className: "md-badge" + ("" + (rounded && ' md-badge--round' || '')) + ("" + (color && " md-badge--" + color || '')) + ("" + (className && " " + className || ''))
  }, otherHTMLProps), props.children);
};

Badge.displayName = 'Badge';
Badge.propTypes = {
  /** @prop Children nodes to render inside Accordion | null */
  children: _propTypes.default.node,

  /** @prop Optional css class string | '' */
  className: _propTypes.default.string,

  /** @prop Optional color prop type | null */
  color: _propTypes.default.string,

  /** @prop Optional rounded corners for the Badge | false */
  rounded: _propTypes.default.bool
};
Badge.defaultProps = {
  children: null,
  className: '',
  rounded: false
};
var _default = Badge;
exports.default = _default;