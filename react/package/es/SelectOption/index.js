function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component select-option */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Checkbox, Icon, ListItem, ListItemSection } from "./..";
import SelectContext from "../SelectContext";
import ListContext from "../ListContext";
import { UIDConsumer } from 'react-uid';

var SelectOption = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(SelectOption, _React$Component);

  function SelectOption() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = SelectOption.prototype;

  _proto.render = function render() {
    var _this = this;

    var _this$props = this.props,
        className = _this$props.className,
        active = _this$props.active,
        children = _this$props.children,
        label = _this$props.label,
        title = _this$props.title,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "active", "children", "label", "title"]);

    var separateChildren = function separateChildren(isMulti, cxtActive, uniqueId) {
      return isMulti ? React.createElement(Checkbox, {
        htmlId: uniqueId + "__checkbox",
        label: label,
        checked: cxtActive || false,
        onChange: function onChange() {}
      }) : [React.createElement(ListItemSection, {
        key: "child-0",
        position: "center"
      }, label || children), React.createElement(ListItemSection, {
        key: "child-1",
        position: "right"
      }, cxtActive && React.createElement(Icon, {
        color: "blue-50",
        name: "check_20"
      }))];
    };

    return React.createElement(UIDConsumer, {
      name: function name(id) {
        return "md-select-option-" + id;
      }
    }, function (id) {
      return React.createElement(SelectContext.Consumer, null, function (isMulti) {
        return React.createElement(ListContext.Consumer, null, function (listContext) {
          var cxtActive = active || listContext && listContext.active && ReactDOM.findDOMNode(_this) && ReactDOM.findDOMNode(_this).attributes['data-md-event-key'] && ReactDOM.findDOMNode(_this).attributes['data-md-event-key'].value && listContext.active.includes(ReactDOM.findDOMNode(_this).attributes['data-md-event-key'].value);
          var uniqueId = _this.props.id || id;
          return React.createElement(ListItem, _extends({
            className: "" + (className && " " + className || ''),
            id: uniqueId,
            label: label,
            title: title || label
          }, props), separateChildren(isMulti, cxtActive, uniqueId));
        });
      });
    });
  };

  return SelectOption;
}(React.Component);

SelectOption.propTypes = {
  /** @prop SelectOption Boolean that describes active state | false */
  active: PropTypes.bool,

  /** @prop Children nodes to render inside SelectOption | null */
  children: PropTypes.node,

  /** @prop Optional HTML Class Name for ListItem | '' */
  className: PropTypes.string,

  /** @prop SelectOption ID | '' */
  id: PropTypes.string,

  /** @prop SelectOption label text | '' */
  label: PropTypes.string,

  /** @prop ListItem Title | '' */
  title: PropTypes.string,

  /** @prop SelectOption value | '' */
  value: PropTypes.string
};
SelectOption.defaultProps = {
  active: false,
  children: null,
  className: '',
  id: '',
  label: '',
  title: '',
  value: ''
};
SelectOption.displayName = 'SelectOption';
export default SelectOption;