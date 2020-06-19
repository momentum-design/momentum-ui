function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component tooltip */
import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from "./..";

var Tooltip = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Tooltip, _React$Component);

  function Tooltip() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Tooltip.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        popoverProps = _this$props.popoverProps,
        tooltip = _this$props.tooltip,
        tooltipTrigger = _this$props.tooltipTrigger,
        width = _this$props.width,
        otherProps = _objectWithoutPropertiesLoose(_this$props, ["children", "className", "popoverProps", "tooltip", "tooltipTrigger", "width"]);

    var content = /*#__PURE__*/React.createElement("span", _extends({
      className: "md-tooltip__text"
    }, width && {
      style: {
        width: width + "px"
      }
    }), tooltip);

    var clonedChildren = function clonedChildren() {
      return /*#__PURE__*/React.cloneElement(children, _extends({}, otherProps));
    };

    return /*#__PURE__*/React.createElement(Popover, _extends({
      className: 'md-tooltip' + ("" + (className && " " + className || '')),
      content: content,
      popoverTrigger: tooltipTrigger,
      showArrow: true
    }, popoverProps), clonedChildren());
  };

  return Tooltip;
}(React.Component);

Tooltip.propTypes = {
  /** @prop Children element to wrap Tooltip component around | null */
  children: PropTypes.element,

  /** @prop Optional CSS class string | '' */
  className: PropTypes.string,

  /** @prop Optional object for Popover Component props | {} */
  popoverProps: PropTypes.object,

  /** @prop Tooltip text | '' */
  tooltip: PropTypes.string,

  /** @prop Set the action which triggers the Tooltip | 'MouseEnter' */
  tooltipTrigger: PropTypes.oneOf(['MouseEnter', 'Click', 'Focus']),

  /** @prop Set the Tooltip width | null */
  width: PropTypes.number
};
Tooltip.defaultProps = {
  children: null,
  className: '',
  popoverProps: {},
  tooltip: '',
  tooltipTrigger: 'MouseEnter',
  width: null
};
Tooltip.displayName = 'Tooltip';
export default Tooltip;