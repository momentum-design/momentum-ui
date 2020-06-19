"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _mapContextToProps = _interopRequireDefault(require("@restart/context/mapContextToProps"));

var _reactUid = require("react-uid");

var _ = require("./..");

var _ListContext = _interopRequireDefault(require("../ListContext"));

var _SelectableContext = _interopRequireDefault(require("../SelectableContext"));

var _prefixer = require("../utils/prefixer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var SubMenu = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(SubMenu, _React$Component);

  function SubMenu(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleClick = function (e, opts) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          parentOnSelect = _this$props.parentOnSelect;
      var eventKey = opts.eventKey,
          label = opts.label,
          value = opts.value;
      onClick && onClick(e, {
        value: value,
        label: label
      });
      parentOnSelect && parentOnSelect(e, {
        eventKey: eventKey,
        element: _assertThisInitialized(_this)
      });
    };

    _this.handleKeyDown = function (e, opts) {
      var _this$props2 = _this.props,
          onClick = _this$props2.onClick,
          parentKeyDown = _this$props2.parentKeyDown,
          parentOnSelect = _this$props2.parentOnSelect;
      var eventKey = opts.eventKey;

      if (e.which === 32 || e.which === 13 || e.charCode === 32 || e.charCode === 13) {
        onClick && onClick(e);
        parentOnSelect && parentOnSelect(e, {
          eventKey: eventKey,
          element: _assertThisInitialized(_this)
        });
        e.preventDefault();
      } else {
        parentKeyDown && parentKeyDown(e, {
          eventKey: eventKey,
          element: _assertThisInitialized(_this)
        });
      }
    };

    _this.state = {
      selectContext: {
        parentKeyDown: _this.handleKeyDown,
        parentOnSelect: _this.handleClick
      }
    };
    return _this;
  }

  var _proto = SubMenu.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        children = _this$props3.children,
        className = _this$props3.className,
        content = _this$props3.content,
        customNode = _this$props3.customNode,
        eventOverlayProps = _this$props3.eventOverlayProps,
        isHeader = _this$props3.isHeader,
        isOpen = _this$props3.isOpen,
        label = _this$props3.label,
        selectedValue = _this$props3.selectedValue,
        props = _objectWithoutPropertiesLoose(_this$props3, ["children", "className", "content", "customNode", "eventOverlayProps", "isHeader", "isOpen", "label", "selectedValue"]);

    var selectContext = this.state.selectContext;
    var otherProps = (0, _omit.default)(_extends({}, props), ['customNode', 'index', 'keepMenuOpen', 'onClick', 'parentKeyDown', 'parentOnSelect']);
    return /*#__PURE__*/_react.default.createElement(_reactUid.UIDFork, null, /*#__PURE__*/_react.default.createElement(_reactUid.UIDConsumer, {
      name: function name(id) {
        return _prefixer.prefix + "-sub-menu-item-" + id;
      }
    }, function (id) {
      return /*#__PURE__*/_react.default.createElement(_ListContext.default.Consumer, null, function (listContext) {
        var cxtActive = isOpen || listContext && listContext.active && _this2.anchorRef && _reactDom.default.findDOMNode(_this2.anchorRef) && _reactDom.default.findDOMNode(_this2.anchorRef).attributes["data-" + _prefixer.prefix + "-event-key"] && _reactDom.default.findDOMNode(_this2.anchorRef).attributes["data-" + _prefixer.prefix + "-event-key"].value && listContext.active.includes(_reactDom.default.findDOMNode(_this2.anchorRef).attributes["data-" + _prefixer.prefix + "-event-key"].value);
        return /*#__PURE__*/_react.default.createElement("div", {
          className: _prefixer.prefix + "-menu-item" + ("" + (className && " " + className || '')),
          "aria-expanded": cxtActive,
          "aria-haspopup": !!children
        }, /*#__PURE__*/_react.default.createElement(_SelectableContext.default.Provider, {
          value: selectContext
        }, /*#__PURE__*/_react.default.createElement(_.ListItem, _extends({
          active: cxtActive,
          focusOnLoad: true,
          id: id,
          isReadOnly: isHeader,
          ref: function ref(_ref) {
            return _this2.anchorRef = _ref;
          },
          role: "menuitem"
        }, otherProps), customNode ? customNode : [/*#__PURE__*/_react.default.createElement("div", {
          className: _prefixer.prefix + "-menu-item__content",
          key: "content-0"
        }, content || label), /*#__PURE__*/_react.default.createElement("div", {
          className: _prefixer.prefix + "-menu-item__selected-value",
          title: selectedValue,
          key: "content-1"
        }, children && selectedValue), /*#__PURE__*/_react.default.createElement("div", {
          className: _prefixer.prefix + "-menu-item__arrow",
          key: "content-2"
        }, children && /*#__PURE__*/_react.default.createElement(_.Icon, {
          name: "arrow-right_16"
        }))])), cxtActive && /*#__PURE__*/_react.default.createElement(_.EventOverlay, _extends({
          anchorNode: _this2.anchorRef,
          isOpen: cxtActive,
          direction: "right-top",
          closeOnClick: false,
          isContained: true
        }, eventOverlayProps), /*#__PURE__*/_react.default.createElement("div", {
          "aria-label": label,
          role: "menu",
          className: _prefixer.prefix + "-menu-item-container"
        }, children)));
      });
    }));
  };

  return SubMenu;
}(_react.default.Component);

SubMenu.propTypes = {
  /** @prop Children nodes to render inside SubMenu | null */
  children: _propTypes.default.node,

  /** @prop Optional CSS class names | '' */
  className: _propTypes.default.string,

  /** @prop SubMenu content element | null */
  content: _propTypes.default.element,

  /** @prop SubMenu custom Node | null */
  customNode: _propTypes.default.node,

  /** @prop Event Overlay props to be overwritten | null */
  eventOverlayProps: _propTypes.default.shape({}),

  /** @prop Index of SubMenu | [] */
  index: _propTypes.default.array,

  /** @prop Determines if the SubMenu is the header | false */
  isHeader: _propTypes.default.bool,

  /** @prop Determines if the SubMenu is Open | false */
  isOpen: _propTypes.default.bool,

  /** @prop Boolean whether to keep the SubMenu open | false */
  keepMenuOpen: _propTypes.default.bool,

  /** @prop SubMenu label string | '' */
  label: _propTypes.default.string,

  /** @prop Callback function invoked when user clicks the SubMenu | null */
  onClick: _propTypes.default.func,
  // Internal Context Use Only
  parentKeyDown: _propTypes.default.func,
  // Internal Context Use Only
  parentOnSelect: _propTypes.default.func,

  /** @prop Initial selected value within SubMenu | '' */
  selectedValue: _propTypes.default.string
};
SubMenu.defaultProps = {
  children: null,
  className: '',
  content: null,
  customNode: null,
  eventOverlayProps: null,
  index: [],
  isHeader: false,
  isOpen: false,
  keepMenuOpen: false,
  label: '',
  onClick: null,
  parentKeyDown: null,
  parentOnSelect: null,
  selectedValue: ''
};
SubMenu.displayName = 'SubMenu';

var _default = (0, _mapContextToProps.default)(_SelectableContext.default, function (context) {
  return context;
}, SubMenu);

exports.default = _default;