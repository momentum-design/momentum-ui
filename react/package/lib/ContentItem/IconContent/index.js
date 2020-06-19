"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require("../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var IconContent = function IconContent(props) {
  var actionNode = props.actionNode,
      className = props.className,
      icon = props.icon,
      isProtected = props.isProtected,
      loading = props.loading,
      onClick = props.onClick,
      subtitle = props.subtitle,
      title = props.title,
      otherProps = _objectWithoutPropertiesLoose(props, ["actionNode", "className", "icon", "isProtected", "loading", "onClick", "subtitle", "title"]);

  var handleKeyDown = function handleKeyDown(e) {
    if (e.which === 32 || e.which === 13 || e.charCode === 32 || e.charCode === 13) {
      onClick && onClick(e);
      e.preventDefault();
    }
  };

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", _extends({
    className: 'md-content-file' + ("" + (onClick && ' md-content-file--clickable' || '')) + ("" + (className && " " + className || '')),
    onClick: onClick,
    onKeyDown: handleKeyDown,
    role: "presentation"
  }, otherProps), !isProtected && actionNode && /*#__PURE__*/_react.default.createElement("div", {
    className: "md-content-file__icon"
  }, actionNode), /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_.Icon, {
    name: icon
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "md-content-file__info-container"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "md-content-file__title"
  }, loading ? 'Loading' : title), /*#__PURE__*/_react.default.createElement("span", {
    className: "md-content-file__subtitle"
  }, " ", subtitle, " ")));
};

IconContent.defaultProps = {
  actionNode: null,
  className: '',
  icon: '',
  isProtected: null,
  loading: false,
  onClick: null,
  subtitle: '',
  title: ''
};
IconContent.propTypes = {
  actionNode: _propTypes.default.node,
  className: _propTypes.default.string,
  icon: _propTypes.default.string,
  isProtected: _propTypes.default.bool,
  loading: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  subtitle: _propTypes.default.string,
  title: _propTypes.default.string
};
IconContent.displayName = 'IconContent';
var _default = IconContent;
exports.default = _default;