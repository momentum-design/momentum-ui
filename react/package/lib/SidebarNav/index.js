"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require("./..");

var _reactUid = require("react-uid");

var _SidebarNavContext = _interopRequireDefault(require("../SidebarNavContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var SidebarNav = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(SidebarNav, _React$PureComponent);

  function SidebarNav() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = SidebarNav.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        focusQuery = _this$props.focusQuery,
        headerNode = _this$props.headerNode,
        title = _this$props.title,
        props = _objectWithoutPropertiesLoose(_this$props, ["children", "className", "focusQuery", "headerNode", "title"]);

    return /*#__PURE__*/_react.default.createElement(_reactUid.UIDFork, null, /*#__PURE__*/_react.default.createElement(_SidebarNavContext.default.Provider, {
      value: {
        level: 'primary'
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "md-sidebar-nav" + ("" + (title && " md-sidebar-nav--header" || '')) + ("" + (className && " " + className || ''))
    }, title ? /*#__PURE__*/_react.default.createElement("div", {
      className: "md-sidebar-nav__header"
    }, title) : headerNode, /*#__PURE__*/_react.default.createElement(_.List, _extends({
      className: 'md-sidebar-nav__group' + ' md-sidebar-nav__group--primary' + ("" + (className && " " + className || '')),
      focusQuery: "\n                .md-sidebar-nav__group--primary > .md-list-item:not(.disabled):not(:disabled):not(.md-list-item--read-only),\n                .md-sidebar-nav__group--secondary.md-sidebar-nav__group--expanded > .md-list-item:not(.disabled):not(:disabled):not(.md-list-item--read-only),\n                .md-sidebar-nav__group--secondary.md-sidebar-nav__group--expanded > .md-sidebar-nav__group--expanded > .md-list-item:not(.disabled):not(:disabled):not(.md-list-item--read-only)\n                " + (focusQuery ? ", " + focusQuery : '') + "\n              "
    }, props), children))));
  };

  return SidebarNav;
}(_react.default.PureComponent);

SidebarNav.displayName = 'SidebarNav';
SidebarNav.propTypes = {
  /** @prop Children nodes to render inside SidebarNav | null */
  children: _propTypes.default.node,

  /** @prop Optional css class string | ''  */
  className: _propTypes.default.string,

  /** @prop Additional elements that can be focused by selector | '' */
  focusQuery: _propTypes.default.string,

  /** @prop Optional header node to replace header element | ''  */
  headerNode: _propTypes.default.node,

  /** @prop Optional string to be used for Section Title | ''  */
  title: _propTypes.default.string
};
SidebarNav.defaultProps = {
  children: null,
  className: '',
  focusQuery: '',
  headerNode: null,
  title: ''
};
var _default = SidebarNav;
exports.default = _default;