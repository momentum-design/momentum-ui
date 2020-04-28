function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component sidebar */
import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import SidebarContext from "../SidebarContext";
import { UIDReset } from 'react-uid';
import { CollapseButton } from "./..";

var Sidebar = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Sidebar, _React$Component);

  function Sidebar(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleNavToggle = function () {
      _this.setState({
        expanded: !_this.state.expanded
      });
    };

    _this.setExpanded = function () {
      _this.setState({
        expanded: _this.props.expanded
      });
    };

    _this.setSidebarContext = function (property) {
      _this.setState(function (state) {
        var _extends2;

        return {
          sidebarContext: _extends({}, state.sidebarContext, (_extends2 = {}, _extends2[property] = true, _extends2))
        };
      });
    };

    _this.state = {
      expanded: _this.props.expanded,
      sidebarContext: {
        primary: true,
        secondary: false,
        setContext: _this.setSidebarContext,
        tertiary: false
      }
    };
    return _this;
  }

  var _proto = Sidebar.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    this.props.expanded !== prevProps.expanded && this.state.expanded !== this.props.expanded && this.setExpanded();
  };

  _proto.render = function render() {
    var _this$props = this.props,
        buttonProps = _this$props.buttonProps,
        children = _this$props.children,
        className = _this$props.className,
        collapsable = _this$props.collapsable,
        isFixed = _this$props.isFixed,
        isPageLevel = _this$props.isPageLevel,
        theme = _this$props.theme,
        withToggle = _this$props.withToggle,
        withIcons = _this$props.withIcons,
        withTopbar = _this$props.withTopbar,
        wrapperClass = _this$props.wrapperClass,
        props = _objectWithoutPropertiesLoose(_this$props, ["buttonProps", "children", "className", "collapsable", "isFixed", "isPageLevel", "theme", "withToggle", "withIcons", "withTopbar", "wrapperClass"]);

    var _this$state = this.state,
        expanded = _this$state.expanded,
        sidebarContext = _this$state.sidebarContext;
    var otherProps = omit(_extends({}, props), ['expanded']);

    var hasTiers = function hasTiers() {
      if (sidebarContext.secondary || sidebarContext.tertiary) {
        return true;
      } else {
        return false;
      }
    };

    var getCollapseClass = function getCollapseClass(prefix) {
      if ((collapsable || withToggle) && !expanded && !withIcons) {
        return " " + prefix + "--collapsed";
      } else if ((collapsable || withToggle) && !expanded && withIcons) {
        return " " + prefix + "--minimized";
      } else return '';
    };

    return React.createElement("div", {
      className: 'md-sidebar__wrapper' + ("" + (isFixed && " md-sidebar__wrapper--fixed" || '')) + ("" + (wrapperClass && " " + wrapperClass || ''))
    }, React.createElement("div", _extends({
      className: 'md-sidebar' + ("" + (theme && " md-sidebar--" + theme || '')) + ("" + (isFixed && " md-sidebar--fixed" || '')) + ("" + (!isPageLevel && " md-sidebar--global" || '')) + ("" + (withTopbar && " md-sidebar--topbar" || '')) + ("" + (withIcons && !isPageLevel && " md-sidebar--indented" || '')) + ("" + (hasTiers() && " md-sidebar--nested" || '')) + ("" + getCollapseClass('md-sidebar')) + ("" + (className && " " + className || ''))
    }, otherProps), React.createElement(SidebarContext.Provider, {
      value: sidebarContext
    }, React.createElement(UIDReset, null, children))), withToggle && React.createElement("div", {
      className: 'md-sidebar__toggle' + ("" + getCollapseClass('md-sidebar__toggle'))
    }, React.createElement(CollapseButton, _extends({
      collapse: !expanded,
      onClick: this.handleNavToggle
    }, buttonProps))));
  };

  return Sidebar;
}(React.Component);

Sidebar.propTypes = {
  /**  @prop Optional CSS class for the toggle button | {} */
  buttonProps: PropTypes.object,

  /** @prop Children nodes to Render inside side navigation | null */
  children: PropTypes.node,

  /** @prop Optional CSS class string | '' */
  className: PropTypes.string,

  /** @prop Set to make the navigation collapsable | false */
  collapsable: PropTypes.bool,

  /** @prop Set navigation expanded or collapsed | true */
  expanded: PropTypes.bool,

  /** @prop Sets Sidebar to position fixed | false */
  isFixed: PropTypes.bool,

  /** @prop Sets Sidebar styling for page level | false */
  isPageLevel: PropTypes.bool,

  /** @prop Optional color theme | '' */
  theme: PropTypes.string,

  /** @prop Changes padding based on Icon nav | true */
  withIcons: PropTypes.bool,

  /** @prop Optional toggle button to expand/collapse sidebar | false */
  withToggle: PropTypes.bool,

  /** @prop Sets padding for Topbar | false */
  withTopbar: PropTypes.bool,

  /** @prop Optional CSS class string for sidebar wrapper | '' */
  wrapperClass: PropTypes.string
};
Sidebar.defaultProps = {
  buttonProps: {},
  children: null,
  className: '',
  collapsable: false,
  expanded: true,
  isFixed: false,
  isPageLevel: false,
  theme: '',
  withIcons: true,
  withToggle: false,
  withTopbar: false,
  wrapperClass: ''
};
Sidebar.displayName = 'Sidebar';
export default Sidebar;