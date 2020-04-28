"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Link = function Link(_ref) {
  var className = _ref.className,
      children = _ref.children,
      color = _ref.color,
      disabled = _ref.disabled,
      tag = _ref.tag,
      theme = _ref.theme,
      props = _objectWithoutPropertiesLoose(_ref, ["className", "children", "color", "disabled", "tag", "theme"]);

  return _react.default.createElement(tag, _extends({
    className: 'md-link' + ("" + (color && " md-link--" + color || '')) + ("" + (theme && " md-link--" + theme || '')) + ("" + (className && " " + className || '')),
    disabled: disabled
  }, !disabled && {
    tabIndex: 0
  }, {}, props), children);
};

Link.propTypes = {
  /** @prop Children nodes to render inside Link Component | null */
  children: _propTypes.default.node.isRequired,

  /** @prop Optional css class string | '' */
  className: _propTypes.default.string,

  /** @prop Optional color css styling | 'blue' */
  color: _propTypes.default.string,

  /** @prop Sets the attribute disabled to the Link | false */
  disabled: _propTypes.default.bool,

  /** @prop Set HTML tag type | 'a' */
  tag: _propTypes.default.oneOf(['a', 'div', 'span']),

  /** @prop Set Link theme | ''  */
  theme: _propTypes.default.string
};
Link.defaultProps = {
  children: null,
  className: '',
  color: 'blue',
  disabled: false,
  tag: 'a',
  theme: ''
};
Link.displayName = 'Link';
var _default = Link;
exports.default = _default;