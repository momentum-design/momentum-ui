"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require("./..");

var _omit = _interopRequireDefault(require("lodash/omit"));

var _reactUid = require("react-uid");

var _ButtonGroupContext = _interopRequireDefault(require("../ButtonGroupContext"));

var _SelectableContext = _interopRequireWildcard(require("../SelectableContext"));

var _mapContextToProps = _interopRequireDefault(require("@restart/context/mapContextToProps"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Button = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Button, _React$Component);

  function Button() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleKeyDown = function (e, eventKey) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          parentOnSelect = _this$props.parentOnSelect,
          parentKeyDown = _this$props.parentKeyDown;

      if (e.which === 32 || e.which === 13 || e.charCode === 32 || e.charCode === 13) {
        parentOnSelect && parentOnSelect(e, {
          eventKey: eventKey
        });
        onClick && onClick(e);
      } else {
        parentKeyDown && parentKeyDown(e, eventKey);
      }
    };

    _this.handleClick = function (e, eventKey) {
      var _this$props2 = _this.props,
          onClick = _this$props2.onClick,
          parentOnSelect = _this$props2.parentOnSelect;
      onClick && onClick(e);
      parentOnSelect && parentOnSelect(e, {
        eventKey: eventKey
      });
    };

    return _this;
  }

  var _proto = Button.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        active = _this$props3.active,
        ariaLabel = _this$props3.ariaLabel,
        ariaLabelledBy = _this$props3.ariaLabelledBy,
        ariaPressed = _this$props3.ariaPressed,
        children = _this$props3.children,
        circle = _this$props3.circle,
        className = _this$props3.className,
        color = _this$props3.color,
        containerLarge = _this$props3.containerLarge,
        disabled = _this$props3.disabled,
        eventKey = _this$props3.eventKey,
        expand = _this$props3.expand,
        href = _this$props3.href,
        keyboardKey = _this$props3.keyboardKey,
        label = _this$props3.label,
        loading = _this$props3.loading,
        large = _this$props3.large,
        removeStyle = _this$props3.removeStyle,
        size = _this$props3.size,
        style = _this$props3.style,
        tag = _this$props3.tag,
        type = _this$props3.type,
        props = _objectWithoutPropertiesLoose(_this$props3, ["active", "ariaLabel", "ariaLabelledBy", "ariaPressed", "children", "circle", "className", "color", "containerLarge", "disabled", "eventKey", "expand", "href", "keyboardKey", "label", "loading", "large", "removeStyle", "size", "style", "tag", "type"]);

    var otherProps = (0, _omit.default)(_extends({}, props), ['id', 'onClick', 'parentOnSelect', 'parentKeyDown']);

    var isButtonGroupIcon = function isButtonGroupIcon(isButtonGroup) {
      return isButtonGroup && children && _react.default.Children.toArray(children).reduce(function (prev, child) {
        return prev ? prev : child.type && child.type.displayName === 'Icon';
      }, false);
    };

    var getChildren = function getChildren() {
      return children && [loading && _react.default.createElement("div", {
        key: "child-0"
      }, _react.default.createElement(_.Loading, null)), _react.default.createElement("span", {
        className: "md-button__children",
        style: {
          opacity: "" + (loading ? 0 : 1)
        },
        key: "child-1"
      }, children)];
    };

    var getColor = function getColor() {
      if (removeStyle) return false;
      return color === 'none' ? 'color-none' : color;
    }; // Method for deprecated large prop


    var getSize = function getSize() {
      if (removeStyle) return false;
      /* eslint-disable no-console */

      var validButtonSize = checkButtonSize();

      if (!circle && !validButtonSize) {
        console.warn('[@momentum-ui/react] Button: selected size is not supported for non-circular button. Size will default to 36');
        return '36';
      } else if (large) {
        console.warn('[@momentum-ui/react] Button: large prop is deprecated and will be removed. Please use size prop.');
        return !circle ? '52' : '44';
      } else {
        return size === 'none' ? 'size-none' : size;
      }
      /* eslint-enable no-console */

    };

    var checkButtonSize = function checkButtonSize() {
      return ['none', '28', '36', '40', '52', 28, 36, 40, 52].includes(size);
    };

    var getTabIndex = function getTabIndex(_ref) {
      var isButtonGroup = _ref.isButtonGroup,
          focus = _ref.focus;

      if (!isButtonGroup) {
        return 0;
      } else if (isButtonGroup && focus) {
        return 0;
      } else return -1;
    };

    var withContext = function withContext() {
      return _react.default.createElement(_reactUid.UIDConsumer, {
        name: function name(id) {
          return "md-button-" + id;
        }
      }, function (id) {
        return _react.default.createElement(_ButtonGroupContext.default.Consumer, null, function (context) {
          var contextProps = {};
          contextProps.id = _this2.props.id || id;
          contextProps.uniqueKey = eventKey || contextProps.id;
          contextProps.active = active || context && context.active === contextProps.uniqueKey;
          contextProps.isButtonGroup = context && context.isButtonGroup || false;
          contextProps.focus = context && context.focus === contextProps.uniqueKey;
          contextProps.width = context && context.width || null;
          contextProps.tabIndex = disabled ? null : getTabIndex(contextProps);
          return createElement(contextProps);
        });
      });
    };

    var keyboardNavKey = (0, _SelectableContext.makeKeyboardKey)(keyboardKey || label || children);

    var createElement = function createElement(cxtProps) {
      return _react.default.createElement(tag, _extends({
        ref: function ref(_ref2) {
          return _this2.button = _ref2;
        },
        className: 'md-button' + ("" + (circle && " md-button--circle" || '')) + ("" + (isButtonGroupIcon(cxtProps.isButtonGroup) && " md-button--icon-group" || '')) + ("" + (getSize() && " md-button--" + getSize() || '')) + ("" + (expand && " md-button--expand" || '')) + ("" + (color && " md-button--" + getColor() || '')) + ("" + (removeStyle && ' md-button--none' || '')) + ("" + (cxtProps.active && !disabled && " active" || '')) + ("" + (className && " " + className || '')),
        id: cxtProps.id,
        'data-md-event-key': cxtProps.uniqueKey,
        onClick: function onClick(e) {
          return _this2.handleClick(e, cxtProps.uniqueKey);
        },
        onKeyDown: function onKeyDown(e) {
          return _this2.handleKeyDown(e, cxtProps.uniqueKey);
        },
        style: _extends({
          style: style
        }, cxtProps.width && {
          width: cxtProps.width
        }),
        disabled: disabled || loading,
        alt: ariaLabel || label,
        href: tag === 'a' && href || undefined,
        type: tag !== 'a' && type || ''
      }, keyboardNavKey && {
        'data-md-keyboard-key': keyboardNavKey
      }, {}, cxtProps.focus && {
        'aria-current': "" + cxtProps.focus
      }, {}, ariaLabel ? {
        'aria-label': ariaLabel
      } : {
        'aria-labelledby': ariaLabelledBy
      }, {
        'aria-pressed': ariaPressed
      }, ariaPressed && ariaPressed !== '' ? {
        'aria-pressed': ariaPressed
      } : {}, {
        tabIndex: cxtProps.tabIndex
      }, tag && tag !== 'button' && {
        role: 'button'
      }, {}, otherProps), getChildren());
    };

    return label ? _react.default.createElement("div", {
      className: "md-button__container" + (containerLarge ? '' : '--small')
    }, withContext(), _react.default.createElement("div", {
      className: "md-button__label"
    }, label)) : withContext();
  };

  return Button;
}(_react.default.Component);

Button.propTypes = {
  /** @prop Sets active css styling | false */
  active: _propTypes.default.bool,

  /** @prop Text to display for blindness accessibility features | '' */
  ariaLabel: _propTypes.default.string,

  /** @prop ID to reference for blindness accessibility feature | '' */
  ariaLabelledBy: _propTypes.default.string,

  /** @prop Boolean value for aria-pressed (toggle button accessibility) | null */
  ariaPressed: _propTypes.default.bool,

  /** @prop Children Nodes to Render inside Button | null */
  children: _propTypes.default.node,

  /** @prop Sets circle css styling | false */
  circle: _propTypes.default.bool,

  /** @prop Optional css class string | '' */
  className: _propTypes.default.string,

  /** @prop Sets optional Button color | '' */
  color: _propTypes.default.string,

  /** @prop Sets containerLarge css styling | false */
  containerLarge: _propTypes.default.bool,

  /** @prop Sets the attribute disabled to Button | false */
  disabled: _propTypes.default.bool,

  /** @prop Unique string used for tracking events among ancestors | '' */
  eventKey: _propTypes.default.string,

  /** @prop Sets expand css styling to widen the Button | false */
  expand: _propTypes.default.bool,

  /** @prop Href prop changes element to anchor element | '' */
  href: _propTypes.default.string,

  /** @prop Sets Button id | null */
  id: _propTypes.default.string,

  /** @prop Unique string used for keyboard navigation | '' */
  keyboardKey: _propTypes.default.string,

  /** @prop Text to display inside the button | '' */
  label: _propTypes.default.string,

  /** @prop Depreciated large css styling, use size instead | false */
  large: _propTypes.default.bool,

  /** @prop Activates the loading animation and sets the button to disabled | false */
  loading: _propTypes.default.bool,

  /** @prop Handler to be called when the user taps the button | null */
  onClick: _propTypes.default.func,
  // Internal Context Use Only
  parentKeyDown: _propTypes.default.func,
  // Internal Context Use Only
  parentOnSelect: _propTypes.default.func,

  /** @prop Optional prop to remove Button's default style | false */
  removeStyle: _propTypes.default.bool,

  /** @prop Optional string or number size prop | 36 */
  size: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /** @prop Additional css styling applied to the button | {} */
  style: _propTypes.default.object,

  /** @prop Optional tag to define type of element | 'button' */
  tag: _propTypes.default.oneOf(['button', 'input', 'a']),

  /** @prop Optional html type | 'button' */
  type: _propTypes.default.oneOf(['button', 'reset', 'submit'])
};
Button.defaultProps = {
  active: false,
  ariaLabel: '',
  ariaLabelledBy: '',
  ariaPressed: null,
  children: null,
  circle: false,
  className: '',
  color: '',
  containerLarge: false,
  disabled: false,
  eventKey: '',
  expand: false,
  href: '',
  id: '',
  keyboardKey: '',
  label: '',
  large: false,
  loading: false,
  onClick: null,
  parentKeyDown: null,
  parentOnSelect: null,
  removeStyle: false,
  size: 36,
  style: {},
  tag: 'button',
  type: 'button'
};
Button.displayName = 'Button';

var _default = (0, _mapContextToProps.default)(_SelectableContext.default, function (context) {
  return context;
}, Button);

exports.default = _default;