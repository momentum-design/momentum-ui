function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component sub-menu */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import mapContextToProps from '@restart/context/mapContextToProps';
import { UIDConsumer, UIDFork } from 'react-uid';
import { EventOverlay, Icon, ListItem } from "./..";
import ListContext from "../ListContext";
import SelectableContext from "../SelectableContext";
import { prefix } from "../utils/prefixer";

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
    var otherProps = omit(_extends({}, props), ['customNode', 'index', 'keepMenuOpen', 'onClick', 'parentKeyDown', 'parentOnSelect']);
    return /*#__PURE__*/React.createElement(UIDFork, null, /*#__PURE__*/React.createElement(UIDConsumer, {
      name: function name(id) {
        return prefix + "-sub-menu-item-" + id;
      }
    }, function (id) {
      return /*#__PURE__*/React.createElement(ListContext.Consumer, null, function (listContext) {
        var cxtActive = isOpen || listContext && listContext.active && _this2.anchorRef && ReactDOM.findDOMNode(_this2.anchorRef) && ReactDOM.findDOMNode(_this2.anchorRef).attributes["data-" + prefix + "-event-key"] && ReactDOM.findDOMNode(_this2.anchorRef).attributes["data-" + prefix + "-event-key"].value && listContext.active.includes(ReactDOM.findDOMNode(_this2.anchorRef).attributes["data-" + prefix + "-event-key"].value);
        return /*#__PURE__*/React.createElement("div", {
          className: prefix + "-menu-item" + ("" + (className && " " + className || '')),
          "aria-expanded": cxtActive,
          "aria-haspopup": !!children
        }, /*#__PURE__*/React.createElement(SelectableContext.Provider, {
          value: selectContext
        }, /*#__PURE__*/React.createElement(ListItem, _extends({
          active: cxtActive,
          focusOnLoad: true,
          id: id,
          isReadOnly: isHeader,
          ref: function ref(_ref) {
            return _this2.anchorRef = _ref;
          },
          role: "menuitem"
        }, otherProps), customNode ? customNode : [/*#__PURE__*/React.createElement("div", {
          className: prefix + "-menu-item__content",
          key: "content-0"
        }, content || label), /*#__PURE__*/React.createElement("div", {
          className: prefix + "-menu-item__selected-value",
          title: selectedValue,
          key: "content-1"
        }, children && selectedValue), /*#__PURE__*/React.createElement("div", {
          className: prefix + "-menu-item__arrow",
          key: "content-2"
        }, children && /*#__PURE__*/React.createElement(Icon, {
          name: "arrow-right_16"
        }))])), cxtActive && /*#__PURE__*/React.createElement(EventOverlay, _extends({
          anchorNode: _this2.anchorRef,
          isOpen: cxtActive,
          direction: "right-top",
          closeOnClick: false,
          isContained: true
        }, eventOverlayProps), /*#__PURE__*/React.createElement("div", {
          "aria-label": label,
          role: "menu",
          className: prefix + "-menu-item-container"
        }, children)));
      });
    }));
  };

  return SubMenu;
}(React.Component);

SubMenu.propTypes = {
  /** @prop Children nodes to render inside SubMenu | null */
  children: PropTypes.node,

  /** @prop Optional CSS class names | '' */
  className: PropTypes.string,

  /** @prop SubMenu content element | null */
  content: PropTypes.element,

  /** @prop SubMenu custom Node | null */
  customNode: PropTypes.node,

  /** @prop Event Overlay props to be overwritten | null */
  eventOverlayProps: PropTypes.shape({}),

  /** @prop Index of SubMenu | [] */
  index: PropTypes.array,

  /** @prop Determines if the SubMenu is the header | false */
  isHeader: PropTypes.bool,

  /** @prop Determines if the SubMenu is Open | false */
  isOpen: PropTypes.bool,

  /** @prop Boolean whether to keep the SubMenu open | false */
  keepMenuOpen: PropTypes.bool,

  /** @prop SubMenu label string | '' */
  label: PropTypes.string,

  /** @prop Callback function invoked when user clicks the SubMenu | null */
  onClick: PropTypes.func,
  // Internal Context Use Only
  parentKeyDown: PropTypes.func,
  // Internal Context Use Only
  parentOnSelect: PropTypes.func,

  /** @prop Initial selected value within SubMenu | '' */
  selectedValue: PropTypes.string
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
export default mapContextToProps(SelectableContext, function (context) {
  return context;
}, SubMenu);