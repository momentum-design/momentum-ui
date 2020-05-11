function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component tabs */
import React from 'react';
import PropTypes from 'prop-types';

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

    return React.createElement("li", _extends({
      className: 'md-tab__item' + ("" + (className && " " + className || '')) + ("" + (active ? ' active' : '')) + ("" + (isType && " md-type--" + isType || '')) + ("" + (disabled ? ' disabled' : ''))
    }, !disabled ? {
      tabIndex: '-1'
    } : {}), React.createElement("a", {
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
}(React.PureComponent);
/* eslint-enable */


Tab.propTypes = {
  /** @prop Set Tab with an active state | false */
  active: PropTypes.bool,

  /** @prop Optional CSS class name */
  className: PropTypes.string,

  /** @prop Sets the attribute disabled to the Tab | false */
  disabled: PropTypes.bool,

  /** @prop Specifies if Tab should automatically get focus when page loads | false */
  focus: PropTypes.bool,

  /** @prop Tab Heading Text */
  heading: PropTypes.string.isRequired,

  /** @prop Currently unused prop myKey | 0 */
  myKey: PropTypes.number,

  /** @prop Callback function invoked when user presses a key | null */
  onKeyDown: PropTypes.func,

  /** @prop Callback function invoked when user presses on the Tab | null */
  onPress: PropTypes.func,

  /** @prop Tab's anchor role type | 'tab' */
  role: PropTypes.string,
  isType: PropTypes.string
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
export default Tab;