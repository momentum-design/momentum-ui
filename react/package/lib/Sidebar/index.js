"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _SidebarContext = _interopRequireDefault(require("../SidebarContext"));

var _reactUid = require("react-uid");

var _ = require("./..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

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
    var otherProps = (0, _omit.default)(_extends({}, props), ['expanded']);

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

    return /*#__PURE__*/_react.default.createElement("div", {
      className: 'md-sidebar__wrapper' + ("" + (isFixed && " md-sidebar__wrapper--fixed" || '')) + ("" + (wrapperClass && " " + wrapperClass || ''))
    }, /*#__PURE__*/_react.default.createElement("div", _extends({
      className: 'md-sidebar' + ("" + (theme && " md-sidebar--" + theme || '')) + ("" + (isFixed && " md-sidebar--fixed" || '')) + ("" + (!isPageLevel && " md-sidebar--global" || '')) + ("" + (withTopbar && " md-sidebar--topbar" || '')) + ("" + (withIcons && !isPageLevel && " md-sidebar--indented" || '')) + ("" + (hasTiers() && " md-sidebar--nested" || '')) + ("" + getCollapseClass('md-sidebar')) + ("" + (className && " " + className || ''))
    }, otherProps), /*#__PURE__*/_react.default.createElement(_SidebarContext.default.Provider, {
      value: sidebarContext
    }, /*#__PURE__*/_react.default.createElement(_reactUid.UIDReset, null, children))), withToggle && /*#__PURE__*/_react.default.createElement("div", {
      className: 'md-sidebar__toggle' + ("" + getCollapseClass('md-sidebar__toggle'))
    }, /*#__PURE__*/_react.default.createElement(_.CollapseButton, _extends({
      collapse: !expanded,
      onClick: this.handleNavToggle
    }, buttonProps))));
  };

  return Sidebar;
}(_react.default.Component);

Sidebar.propTypes = {
  /**  @prop Optional CSS class for the toggle button | {} */
  buttonProps: _propTypes.default.object,

  /** @prop Children nodes to Render inside side navigation | null */
  children: _propTypes.default.node,

  /** @prop Optional CSS class string | '' */
  className: _propTypes.default.string,

  /** @prop Set to make the navigation collapsable | false */
  collapsable: _propTypes.default.bool,

  /** @prop Set navigation expanded or collapsed | true */
  expanded: _propTypes.default.bool,

  /** @prop Sets Sidebar to position fixed | false */
  isFixed: _propTypes.default.bool,

  /** @prop Sets Sidebar styling for page level | false */
  isPageLevel: _propTypes.default.bool,

  /** @prop Optional color theme | '' */
  theme: _propTypes.default.string,

  /** @prop Changes padding based on Icon nav | true */
  withIcons: _propTypes.default.bool,

  /** @prop Optional toggle button to expand/collapse sidebar | false */
  withToggle: _propTypes.default.bool,

  /** @prop Sets padding for Topbar | false */
  withTopbar: _propTypes.default.bool,

  /** @prop Optional CSS class string for sidebar wrapper | '' */
  wrapperClass: _propTypes.default.string
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
var _default = Sidebar;
exports.default = _default;