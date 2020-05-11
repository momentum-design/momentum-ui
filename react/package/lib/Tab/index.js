"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Tab = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(Tab, _React$PureComponent);

  function Tab() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = Tab.prototype;

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.props.focus && this.tabLink.focus();
  };

  _proto.render = function render() {
    var _this = this;

    var _this$props = this.props,
        heading = _this$props.heading,
        active = _this$props.active,
        isType = _this$props.isType,
        onPress = _this$props.onPress,
        onKeyDown = _this$props.onKeyDown,
        role = _this$props.role,
        focus = _this$props.focus,
        className = _this$props.className,
        disabled = _this$props.disabled; // Due to Momentum UI must keep anchor element instead of button eventhough accessibility would like the anchor element to be switched to a button.

    /* eslint-disable */

    return _react.default.createElement("li", _extends({
      className: 'md-tab__item' + ("" + (className && " " + className || '')) + ("" + (active ? ' active' : '')) + ("" + (isType && " md-type--" + isType || '')) + ("" + (disabled ? ' disabled' : ''))
    }, !disabled ? {
      tabIndex: '-1'
    } : {}), _react.default.createElement("a", {
      ref: function ref(_ref) {
        return _this.tabLink = _ref;
      },
      role: role,
      href: "javascript:void(0)",
      onKeyDown: onKeyDown,
      onClick: onPress,
      tabIndex: focus ? 0 : -1,
      "aria-current": active
    }, heading));
  };

  return Tab;
}(_react.default.PureComponent);
/* eslint-enable */


Tab.propTypes = {
  /** @prop Set Tab with an active state | false */
  active: _propTypes.default.bool,

  /** @prop Optional CSS class name */
  className: _propTypes.default.string,

  /** @prop Sets the attribute disabled to the Tab | false */
  disabled: _propTypes.default.bool,

  /** @prop Specifies if Tab should automatically get focus when page loads | false */
  focus: _propTypes.default.bool,

  /** @prop Tab Heading Text */
  heading: _propTypes.default.string.isRequired,

  /** @prop Currently unused prop myKey | 0 */
  myKey: _propTypes.default.number,

  /** @prop Callback function invoked when user presses a key | null */
  onKeyDown: _propTypes.default.func,

  /** @prop Callback function invoked when user presses on the Tab | null */
  onPress: _propTypes.default.func,

  /** @prop Tab's anchor role type | 'tab' */
  role: _propTypes.default.string,
  isType: _propTypes.default.string
};
Tab.defaultProps = {
  active: false,
  className: '',
  disabled: false,
  focus: false,
  myKey: 0,
  onKeyDown: null,
  onPress: null,
  role: 'tab',
  isType: 'pills'
};
Tab.displayName = 'Tab';
var _default = Tab;
exports.default = _default;