"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require("./..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

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

    var content = _react.default.createElement("span", _extends({
      className: "md-tooltip__text"
    }, width && {
      style: {
        width: width + "px"
      }
    }), tooltip);

    var clonedChildren = function clonedChildren() {
      return _react.default.cloneElement(children, _extends({}, otherProps));
    };

    return _react.default.createElement(_.Popover, _extends({
      className: 'md-tooltip' + ("" + (className && " " + className || '')),
      content: content,
      popoverTrigger: tooltipTrigger,
      showArrow: true
    }, popoverProps), clonedChildren());
  };

  return Tooltip;
}(_react.default.Component);

Tooltip.propTypes = {
  /** @prop Children element to wrap Tooltip component around | null */
  children: _propTypes.default.element,

  /** @prop Optional CSS class string | '' */
  className: _propTypes.default.string,

  /** @prop Optional object for Popover Component props | {} */
  popoverProps: _propTypes.default.object,

  /** @prop Tooltip text | '' */
  tooltip: _propTypes.default.string,

  /** @prop Set the action which triggers the Tooltip | 'MouseEnter' */
  tooltipTrigger: _propTypes.default.oneOf(['MouseEnter', 'Click', 'Focus']),

  /** @prop Set the Tooltip width | null */
  width: _propTypes.default.number
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
var _default = Tooltip;
exports.default = _default;