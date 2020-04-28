function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component menu-item */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import mapContextToProps from '@restart/context/mapContextToProps';
import { UIDConsumer } from 'react-uid';
import { ListItem } from "./..";
import ListContext from "../ListContext";
import SelectableContext from "../SelectableContext";
import { prefix } from "../utils/index";

var MenuItem = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(MenuItem, _React$Component);

  function MenuItem(props) {
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
        parentKeyDown: !props.isHeader ? _this.handleKeyDown : null,
        parentOnSelect: !props.isHeader ? _this.handleClick : null
      }
    };
    return _this;
  }

  var _proto = MenuItem.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        children = _this$props3.children,
        className = _this$props3.className,
        isHeader = _this$props3.isHeader,
        isOpen = _this$props3.isOpen,
        itemClassName = _this$props3.itemClassName,
        props = _objectWithoutPropertiesLoose(_this$props3, ["children", "className", "isHeader", "isOpen", "itemClassName"]);

    var selectContext = this.state.selectContext;
    var otherProps = omit(_extends({}, props), ['keepMenuOpen', 'onClick', 'parentKeyDown', 'parentOnSelect']);
    return React.createElement(UIDConsumer, {
      name: function name(id) {
        return prefix + "-menu-item-" + id;
      }
    }, function (id) {
      return React.createElement(SelectableContext.Provider, {
        value: selectContext
      }, React.createElement(ListContext.Consumer, null, function (listContext) {
        var cxtActive = isOpen || listContext && listContext.active && ReactDOM.findDOMNode(_this2.anchorRef) && ReactDOM.findDOMNode(_this2.anchorRef).attributes["data-" + prefix + "-event-key"] && ReactDOM.findDOMNode(_this2.anchorRef).attributes["data-" + prefix + "-event-key"].value && listContext.active.includes(ReactDOM.findDOMNode(_this2.anchorRef).attributes["data-" + prefix + "-event-key"].value);
        return React.createElement("div", {
          className: prefix + "-menu-item" + ("" + (className && " " + className || '')),
          "aria-expanded": cxtActive,
          "aria-haspopup": !!children
        }, React.createElement(ListItem, _extends({
          active: cxtActive,
          className: "" + (isHeader && "md-menu-item__header" || '') + ("" + (itemClassName && " " + itemClassName || '')),
          focusOnLoad: true,
          isReadOnly: isHeader,
          id: id,
          ref: function ref(_ref) {
            return _this2.anchorRef = _ref;
          },
          role: "menuitem"
        }, otherProps), children));
      }));
    });
  };

  return MenuItem;
}(React.Component);

MenuItem.propTypes = {
  /** @prop Children nodes to render inside MenuItem | null */
  children: PropTypes.node,

  /** @prop Optional css class name | '' */
  className: PropTypes.string,

  /** @prop Determines if MenuItem is the header | false */
  isHeader: PropTypes.bool,

  /** @prop Determines if MenuItem is open | false */
  isOpen: PropTypes.bool,

  /** @prop Optional list css class name | '' */
  itemClassName: PropTypes.string,

  /** @prop Set to keep the MenuItem open | false */
  keepMenuOpen: PropTypes.bool,

  /** @prop Callback function invoked when user taps on MenutItem | null */
  onClick: PropTypes.func,
  // Internal Context Use Only
  parentKeyDown: PropTypes.func,
  // Internal Context Use Only
  parentOnSelect: PropTypes.func
};
MenuItem.defaultProps = {
  children: null,
  className: '',
  isHeader: false,
  isOpen: false,
  itemClassName: '',
  keepMenuOpen: false,
  onClick: null,
  parentKeyDown: null,
  parentOnSelect: null
};
MenuItem.displayName = 'MenuItem';
export default mapContextToProps(SelectableContext, function (context) {
  return context;
}, MenuItem);