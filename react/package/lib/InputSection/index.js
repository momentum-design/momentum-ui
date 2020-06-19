"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var InputSection = function InputSection(props) {
  var children = props.children,
      className = props.className,
      position = props.position,
      otherProps = _objectWithoutPropertiesLoose(props, ["children", "className", "position"]);

  return /*#__PURE__*/_react.default.createElement("span", _extends({
    className: "md-input__" + position + ("" + (className && " " + className || ''))
  }, otherProps), children);
};

InputSection.propTypes = {
  /** @prop Children nodes to render inside InputSection | null */
  children: _propTypes.default.node,

  /** @prop Optional css class name | '' */
  className: _propTypes.default.string,

  /** @prop Determine the InputSection's position | 'before' */
  position: _propTypes.default.oneOf(['before', 'after'])
};
InputSection.defaultProps = {
  children: null,
  className: '',
  position: 'before'
};
InputSection.displayName = 'InputSection';
var _default = InputSection;
exports.default = _default;