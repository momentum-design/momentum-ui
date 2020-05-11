"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Label = function Label(_ref) {
  var children = _ref.children,
      className = _ref.className,
      htmlFor = _ref.htmlFor,
      label = _ref.label,
      theme = _ref.theme,
      props = _objectWithoutPropertiesLoose(_ref, ["children", "className", "htmlFor", "label", "theme"]);

  return _react.default.createElement("label", _extends({
    className: 'md-label' + ("" + (className ? " " + className : '')) + ("" + (theme ? " md-label--" + theme : '')),
    htmlFor: htmlFor
  }, props), label ? _react.default.createElement("span", null, label) : children);
};

Label.propTypes = {
  /** @prop Children nodes to render inside the Label | null */
  children: _propTypes.default.node,

  /** @prop HTML class name for associated Input | '' */
  className: _propTypes.default.string,

  /** @prop HTML ID for associated Input | null */
  htmlFor: _propTypes.default.string.isRequired,

  /** @prop Required Label text | null */
  label: _propTypes.default.string,

  /** @prop Set Label's color theme | '' */
  theme: _propTypes.default.string
};
Label.defaultProps = {
  children: null,
  className: '',
  htmlFor: null,
  label: null,
  theme: ''
};
Label.displayName = 'Label';
var _default = Label;
exports.default = _default;