"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _reactUid = require("react-uid");

var _ = require("./..");

var _MenuContext = _interopRequireDefault(require("../MenuContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

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
      var overlay = (0, _reactDom.findDOMNode)(this.menuOverlay);
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
    var otherProps = (0, _omit.default)(_extends({}, props), ['isOpen', 'focusFirstQuery', 'onSelect']);

    var setMenuTrigger = function setMenuTrigger() {
      return _react.default.cloneElement(menuTrigger, {
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

    return _react.default.createElement("div", {
      className: 'md-menu-overlay-wrapper' + ("" + (className && " " + className || ''))
    }, setMenuTrigger(), isOpen && _react.default.createElement(_.EventOverlay, _extends({
      allowClickAway: true,
      anchorNode: this.anchorNode,
      className: "md-menu-overlay",
      close: this.handleClose,
      isOpen: isOpen,
      ref: function ref(_ref2) {
        return _this2.menuOverlay = _ref2;
      },
      showArrow: showArrow
    }, otherProps), _react.default.createElement(_MenuContext.default.Provider, {
      value: {
        parentOnSelect: this.onSelect
      }
    }, _react.default.createElement(_reactUid.UIDReset, null, children))));
  };

  return MenuOverlay;
}(_react.default.Component);

MenuOverlay.propTypes = {
  /** @prop Children nodes to render inside MenuOverlay | null */
  children: _propTypes.default.node,

  /** @prop Optional css class name | '' */
  className: _propTypes.default.string,

  /** @prop Queries children to find matching item to have focus | '' */
  focusFirstQuery: _propTypes.default.string,

  /** @prop Prop to initalize state as open | false */
  isOpen: _propTypes.default.bool,

  /** @prop HTML element that provides control to MenuOverlay user  */
  menuTrigger: _propTypes.default.element.isRequired,

  /** @prop Callback function invoked when user selects MenuOverlay | null */
  onSelect: _propTypes.default.func,

  /** @prop Determines if the MenuOverlay should show the open/close arrow | true */
  showArrow: _propTypes.default.bool
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
var _default = MenuOverlay;
exports.default = _default;