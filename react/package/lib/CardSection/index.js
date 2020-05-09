"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var CardSection = function CardSection(props) {
  var children = props.children,
      className = props.className,
      full = props.full,
      otherProps = _objectWithoutPropertiesLoose(props, ["children", "className", "full"]);

  return _react.default.createElement("div", _extends({
    className: "md-card-section" + ("" + (full && " md-card-section--full" || '')) + ("" + (className && " " + className || ''))
  }, otherProps), children);
};

CardSection.propTypes = {
  /** @prop Children nodes to render inside the CardSection | null */
  children: _propTypes.default.node,

  /** @prop Optional css class names | '' */
  className: _propTypes.default.string,

  /** @prop Set the card section to be the full width | false */
  full: _propTypes.default.bool
};
CardSection.defaultProps = {
  children: null,
  className: '',
  full: false
};
CardSection.displayName = 'CardSection';
var _default = CardSection;
exports.default = _default;