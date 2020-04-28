function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component sidebar */
import React from 'react';
import PropTypes from 'prop-types';
import { List } from "./..";
import { UIDFork } from 'react-uid';
import SidebarNavContext from "../SidebarNavContext";

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

    return React.createElement(UIDFork, null, React.createElement(SidebarNavContext.Provider, {
      value: {
        level: 'primary'
      }
    }, React.createElement("div", {
      className: "md-sidebar-nav" + ("" + (title && " md-sidebar-nav--header" || '')) + ("" + (className && " " + className || ''))
    }, title ? React.createElement("div", {
      className: "md-sidebar-nav__header"
    }, title) : headerNode, React.createElement(List, _extends({
      className: 'md-sidebar-nav__group' + ' md-sidebar-nav__group--primary' + ("" + (className && " " + className || '')),
      focusQuery: "\n                .md-sidebar-nav__group--primary > .md-list-item:not(.disabled):not(:disabled):not(.md-list-item--read-only),\n                .md-sidebar-nav__group--secondary.md-sidebar-nav__group--expanded > .md-list-item:not(.disabled):not(:disabled):not(.md-list-item--read-only),\n                .md-sidebar-nav__group--secondary.md-sidebar-nav__group--expanded > .md-sidebar-nav__group--expanded > .md-list-item:not(.disabled):not(:disabled):not(.md-list-item--read-only)\n                " + (focusQuery ? ", " + focusQuery : '') + "\n              "
    }, props), children))));
  };

  return SidebarNav;
}(React.PureComponent);

SidebarNav.displayName = 'SidebarNav';
SidebarNav.propTypes = {
  /** @prop Children nodes to render inside SidebarNav | null */
  children: PropTypes.node,

  /** @prop Optional css class string | ''  */
  className: PropTypes.string,

  /** @prop Additional elements that can be focused by selector | '' */
  focusQuery: PropTypes.string,

  /** @prop Optional header node to replace header element | ''  */
  headerNode: PropTypes.node,

  /** @prop Optional string to be used for Section Title | ''  */
  title: PropTypes.string
};
SidebarNav.defaultProps = {
  children: null,
  className: '',
  focusQuery: '',
  headerNode: null,
  title: ''
};
export default SidebarNav;