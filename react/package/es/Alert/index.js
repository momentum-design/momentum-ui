function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component alert */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from "./..";

var Alert = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(Alert, _React$PureComponent);

  function Alert() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = Alert.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        closable = _this$props.closable,
        dismissBtnProps = _this$props.dismissBtnProps,
        message = _this$props.message,
        show = _this$props.show,
        title = _this$props.title,
        type = _this$props.type,
        otherProps = _objectWithoutPropertiesLoose(_this$props, ["className", "closable", "dismissBtnProps", "message", "show", "title", "type"]);

    return show && React.createElement("div", _extends({
      className: 'md-alert' + (" md-alert--" + type) + ("" + (className && " " + className || ''))
    }, otherProps), React.createElement("div", {
      className: "md-alert__icon"
    }), React.createElement("div", {
      className: "md-alert__content"
    }, React.createElement("div", {
      className: "md-alert__title"
    }, title), React.createElement("div", {
      className: "md-alert__message"
    }, message)), closable && React.createElement("div", {
      className: "md-alert__button"
    }, React.createElement(Button, _extends({
      circle: true,
      size: 44
    }, dismissBtnProps), React.createElement(Icon, {
      name: "cancel_16"
    }))));
  };

  return Alert;
}(React.PureComponent);

Alert.defaultProps = {
  closable: true,
  dismissBtnProps: null,
  message: '',
  title: '',
  type: 'info'
};
Alert.propTypes = {
  /** @prop Optional css class string | '' */
  className: PropTypes.string,

  /** @prop To show/hide Close button of the Alert | true */
  closable: PropTypes.bool,

  /** @prop Props to be passed to dismiss button | null */
  dismissBtnProps: PropTypes.object,

  /** @prop Optional Alert message | '' */
  message: PropTypes.string,

  /** @prop Set Alert visibility */
  show: PropTypes.bool.isRequired,

  /** @prop Optional Alert title | '' */
  title: PropTypes.string,

  /** @prop Sets the type of the Alert | 'info' */
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error'])
};
Alert.displayName = 'Alert';
export default Alert;