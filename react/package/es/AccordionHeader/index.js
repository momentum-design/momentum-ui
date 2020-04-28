function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component accordion */
import React from 'react';
import PropTypes from 'prop-types';

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
    return React.createElement("div", {
      role: "button",
      ref: function ref(_ref) {
        return _this.headerRef = _ref;
      },
      onClick: onClick,
      onKeyDown: onKeyDown,
      tabIndex: !disabled ? 0 : -1,
      className: 'md-accordion__header' + ("" + (showSeparator && " md-accordion__header--separator" || '')) + ("" + (height && " md-accordion__header--" + height || '')) + ("" + (className && " " + className || ''))
    }, children, React.createElement("span", {
      className: "md-accordion__header-icon"
    }));
  };

  return AccordionHeader;
}(React.Component);

AccordionHeader.displayName = 'AccordionHeader';
AccordionHeader.contextTypes = {
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func
};
AccordionHeader.propTypes = {
  /** @prop Children nodes to render inside AccordionHeader | null  */
  children: PropTypes.node,

  /** @prop Optional css class string | '' */
  className: PropTypes.string,

  /** @prop Set the attribute disabled to the AccordionHeader | false */
  disabled: PropTypes.bool,

  /** @prop Specifies if AccordionHeader automatically gets focus when page loads | false  */
  focus: PropTypes.bool,

  /** @prop Optional underline under Accordion menu item | false */
  showSeparator: PropTypes.bool,

  /** @prop Set the height of the AccordionHeader to either the default or 56px | '' */
  height: PropTypes.oneOf(['', 56])
};
AccordionHeader.defaultProps = {
  children: null,
  className: '',
  disabled: false,
  focus: false,
  showSeparator: true,
  height: ''
};
export default AccordionHeader;