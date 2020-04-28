"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var AccordionGroup = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(AccordionGroup, _React$Component);

  function AccordionGroup() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.getChildContext = function () {
      return {
        onClick: _this.props.onClick,
        onKeyDown: _this.props.onKeyDown
      };
    };

    _this.verifyChildren = function () {
      var children = _this.props.children;

      var childrenArr = _react.default.Children.toArray(children);

      return children && childrenArr.length === 2 && childrenArr[0].type.displayName === 'AccordionHeader' && childrenArr[1].type.displayName === 'AccordionContent';
    };

    return _this;
  }

  var _proto = AccordionGroup.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (!this.verifyChildren()) {
      throw new Error('AccordionGroup should contain 2 children ' + 'AccordionHeader and AccordionContent respectively.');
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        isExpanded = _this$props.isExpanded,
        disabled = _this$props.disabled,
        focus = _this$props.focus,
        showSeparator = _this$props.showSeparator;

    var setGroupContent = _react.default.Children.map(children, function (child) {
      return _react.default.cloneElement(child, {
        disabled: disabled,
        focus: focus,
        showSeparator: showSeparator
      });
    });

    return _react.default.createElement("div", {
      "aria-expanded": isExpanded,
      className: "md-accordion__group" + ("" + (disabled && ' md-accordion__group--disabled' || '')) + ("" + (isExpanded && " md-accordion__group--active" || '')) + ("" + (className && " " + className || ''))
    }, setGroupContent);
  };

  return AccordionGroup;
}(_react.default.Component);

AccordionGroup.displayName = 'AccordionGroup';
AccordionGroup.childContextTypes = {
  onClick: _propTypes.default.func,
  onKeyDown: _propTypes.default.func
};
AccordionGroup.propTypes = {
  /** @prop Children nodes to render inside Accordion | null  */
  children: _propTypes.default.node,

  /** @prop Set accordionGroup to be expanded | false  */
  isExpanded: _propTypes.default.bool,

  /** @prop Handler to be called when the user taps the AccordionGroup | null */
  onClick: _propTypes.default.func,

  /** @prop Handler to be called when the user presses a key | null */
  onKeyDown: _propTypes.default.func,

  /** @prop Optional css class string | '' */
  className: _propTypes.default.string,

  /** @prop Set the attribute disabled to the accordionGroup | false */
  disabled: _propTypes.default.bool,

  /** @prop Specifies if AccordionGroup show automatically get focus when page loads | false  */
  focus: _propTypes.default.bool,

  /** @prop Optional underline under Accordion menu item | false */
  showSeparator: _propTypes.default.bool
};
AccordionGroup.defaultProps = {
  children: null,
  isExpanded: false,
  onClick: null,
  onKeyDown: null,
  className: '',
  disabled: false,
  focus: false,
  showSeparator: false
};
var _default = AccordionGroup;
exports.default = _default;