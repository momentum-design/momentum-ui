function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component menu */
import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { UIDReset } from 'react-uid';
import { EventOverlay } from "./..";
import MenuContext from "../MenuContext";

var MenuOverlay = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(MenuOverlay, _React$Component);

  function MenuOverlay() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      isOpen: _this.props.isOpen || false
    };

    _this.onSelect = function (e, opts) {
      var onSelect = _this.props.onSelect;
      var eventKey = opts.eventKey,
          element = opts.element;
      var keepMenuOpen = element.props.keepMenuOpen;
      onSelect && onSelect(e, {
        eventKey: eventKey,
        element: element
      });
      element.constructor.displayName !== 'SubMenu' && !keepMenuOpen && _this.handleClose();
    };

    _this.handleClose = function () {
      _this.setState({
        isOpen: false
      });
    };

    return _this;
  }

  var _proto = MenuOverlay.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.props.isOpen && this.forceUpdate();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var focusFirstQuery = this.props.focusFirstQuery;
    var isOpen = this.state.isOpen;

    if (!prevState.isOpen && prevState !== isOpen && focusFirstQuery) {
      var overlay = findDOMNode(this.menuOverlay);
      var focusElement = overlay && overlay.querySelector(focusFirstQuery);
      focusElement && focusElement.focus();
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        menuTrigger = _this$props.menuTrigger,
        showArrow = _this$props.showArrow,
        props = _objectWithoutPropertiesLoose(_this$props, ["children", "className", "menuTrigger", "showArrow"]);

    var isOpen = this.state.isOpen;
    var otherProps = omit(_extends({}, props), ['isOpen', 'focusFirstQuery', 'onSelect']);

    var setMenuTrigger = function setMenuTrigger() {
      return /*#__PURE__*/React.cloneElement(menuTrigger, {
        onClick: function onClick() {
          return _this2.setState({
            isOpen: !isOpen
          });
        },
        ref: function ref(_ref) {
          return _this2.anchorNode = _ref;
        }
      });
    };

    return /*#__PURE__*/React.createElement("div", {
      className: 'md-menu-overlay-wrapper' + ("" + (className && " " + className || ''))
    }, setMenuTrigger(), isOpen && /*#__PURE__*/React.createElement(EventOverlay, _extends({
      allowClickAway: true,
      anchorNode: this.anchorNode,
      className: "md-menu-overlay",
      close: this.handleClose,
      isOpen: isOpen,
      ref: function ref(_ref2) {
        return _this2.menuOverlay = _ref2;
      },
      showArrow: showArrow
    }, otherProps), /*#__PURE__*/React.createElement(MenuContext.Provider, {
      value: {
        parentOnSelect: this.onSelect
      }
    }, /*#__PURE__*/React.createElement(UIDReset, null, children))));
  };

  return MenuOverlay;
}(React.Component);

MenuOverlay.propTypes = {
  /** @prop Children nodes to render inside MenuOverlay | null */
  children: PropTypes.node,

  /** @prop Optional css class name | '' */
  className: PropTypes.string,

  /** @prop Queries children to find matching item to have focus | '' */
  focusFirstQuery: PropTypes.string,

  /** @prop Prop to initalize state as open | false */
  isOpen: PropTypes.bool,

  /** @prop HTML element that provides control to MenuOverlay user  */
  menuTrigger: PropTypes.element.isRequired,

  /** @prop Callback function invoked when user selects MenuOverlay | null */
  onSelect: PropTypes.func,

  /** @prop Determines if the MenuOverlay should show the open/close arrow | true */
  showArrow: PropTypes.bool
};
MenuOverlay.defaultProps = {
  children: null,
  className: '',
  focusFirstQuery: '',
  isOpen: false,
  onSelect: null,
  showArrow: true
};
MenuOverlay.displayName = 'MenuOverlay';
export default MenuOverlay;