function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component topbar */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, ListSeparator } from "./..";
import { prefix } from "../utils/index";

var TopbarMobile = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(TopbarMobile, _React$Component);

  function TopbarMobile() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      isMobileOpen: false
    };

    _this.handleClose = function () {
      _this.setState({
        isMobileOpen: false
      });
    };

    _this.handleOpen = function () {
      _this.setState({
        isMobileOpen: true
      });
    };

    _this.handleKeyDown = function (e) {
      if (e.which === 32 || e.which === 13 || e.charCode === 32 || e.charCode === 13) {
        _this.handleClose();

        e.preventDefault();
      }
    };

    return _this;
  }

  var _proto = TopbarMobile.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        brandNode = _this$props.brandNode,
        children = _this$props.children,
        className = _this$props.className,
        closeMenuAriaLabel = _this$props.closeMenuAriaLabel,
        shouldCloseOnClick = _this$props.shouldCloseOnClick,
        openMenuAriaLabel = _this$props.openMenuAriaLabel,
        otherProps = _objectWithoutPropertiesLoose(_this$props, ["brandNode", "children", "className", "closeMenuAriaLabel", "shouldCloseOnClick", "openMenuAriaLabel"]);

    var isMobileOpen = this.state.isMobileOpen;
    var mobileButton = React.createElement(Icon, {
      name: "list-menu_20",
      buttonClassName: prefix + "-top-bar__mobile-menu-button",
      onClick: this.handleOpen,
      ariaLabel: openMenuAriaLabel,
      "aria-pressed": isMobileOpen
    });
    var passClickHandlerToChildren = React.Children.map(children, function (child) {
      return React.cloneElement(child, {
        onClick: _this2.handleClose
      });
    });
    return React.createElement("div", null, !isMobileOpen && mobileButton, React.createElement("div", _extends({
      className: prefix + "-top-bar__mobile " + prefix + "-tb-mobile" + ("" + (isMobileOpen ? ' open' : '')) + ("" + (className && " " + className || '')),
      onClick: function onClick() {
        return shouldCloseOnClick ? _this2.handleClose : null;
      },
      onKeyDown: this.handleKeyDown,
      role: "menu",
      tabIndex: 0
    }, otherProps), React.createElement(Icon, {
      name: "cancel_20",
      buttonClassName: prefix + "-tb-mobile__close",
      "aria-pressed": isMobileOpen,
      onClick: this.handleClose,
      ariaLabel: closeMenuAriaLabel
    }), React.createElement("span", {
      onClick: this.handleClose,
      onKeyDown: this.handleKeyDown
    }, brandNode), React.createElement(ListSeparator, null), React.createElement("nav", {
      className: prefix + "-tb-mobile__nav"
    }, !shouldCloseOnClick && passClickHandlerToChildren || children)), React.createElement("div", {
      className: prefix + "-tb-mobile__mask" + ("" + (isMobileOpen ? ' open' : '')),
      onClick: this.handleClose,
      role: "none"
    }));
  };

  return TopbarMobile;
}(React.Component);

TopbarMobile.propTypes = {
  /** @prop Brand Node | null */
  brandNode: PropTypes.node,

  /** @prop Children node to render inside of TopbarMobile | null */
  children: PropTypes.node,

  /** @prop Optional CSS class string | '' */
  className: PropTypes.string,

  /** @prop Aria Label for close Button | 'Close Menu' */
  closeMenuAriaLabel: PropTypes.string,

  /** @prop Set mobile menu to close on any click | true */
  shouldCloseOnClick: PropTypes.bool,

  /** @prop Aria Label for open Button | 'Open Menu */
  openMenuAriaLabel: PropTypes.string
};
TopbarMobile.defaultProps = {
  brandNode: null,
  children: null,
  className: '',
  closeMenuAriaLabel: 'Close Menu',
  shouldCloseOnClick: true,
  openMenuAriaLabel: 'Open Menu'
};
TopbarMobile.displayName = 'TopbarMobile';
export default TopbarMobile;