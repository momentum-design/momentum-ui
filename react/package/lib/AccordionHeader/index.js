"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var AccordionHeader = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(AccordionHeader, _React$Component);

  function AccordionHeader() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = AccordionHeader.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var focus = this.props.focus;
    !prevProps.focus && focus && this.headerRef.focus();
  };

  _proto.render = function render() {
    var _this = this;

    var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        disabled = _this$props.disabled,
        showSeparator = _this$props.showSeparator,
        height = _this$props.height;
    var _this$context = this.context,
        onClick = _this$context.onClick,
        onKeyDown = _this$context.onKeyDown;
    return _react.default.createElement("div", {
      role: "button",
      ref: function ref(_ref) {
        return _this.headerRef = _ref;
      },
      onClick: onClick,
      onKeyDown: onKeyDown,
      tabIndex: !disabled ? 0 : -1,
      className: 'md-accordion__header' + ("" + (showSeparator && " md-accordion__header--separator" || '')) + ("" + (height && " md-accordion__header--" + height || '')) + ("" + (className && " " + className || ''))
    }, children, _react.default.createElement("span", {
      className: "md-accordion__header-icon"
    }));
  };

  return AccordionHeader;
}(_react.default.Component);

AccordionHeader.displayName = 'AccordionHeader';
AccordionHeader.contextTypes = {
  onClick: _propTypes.default.func,
  onKeyDown: _propTypes.default.func
};
AccordionHeader.propTypes = {
  /** @prop Children nodes to render inside AccordionHeader | null  */
  children: _propTypes.default.node,

  /** @prop Optional css class string | '' */
  className: _propTypes.default.string,

  /** @prop Set the attribute disabled to the AccordionHeader | false */
  disabled: _propTypes.default.bool,

  /** @prop Specifies if AccordionHeader automatically gets focus when page loads | false  */
  focus: _propTypes.default.bool,

  /** @prop Optional underline under Accordion menu item | false */
  showSeparator: _propTypes.default.bool,

  /** @prop Set the height of the AccordionHeader to either the default or 56px | '' */
  height: _propTypes.default.oneOf(['', 56])
};
AccordionHeader.defaultProps = {
  children: null,
  className: '',
  disabled: false,
  focus: false,
  showSeparator: true,
  height: ''
};
var _default = AccordionHeader;
exports.default = _default;