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

    return show && _react.default.createElement("div", _extends({
      className: 'md-alert' + (" md-alert--" + type) + ("" + (className && " " + className || ''))
    }, otherProps), _react.default.createElement("div", {
      className: "md-alert__icon"
    }), _react.default.createElement("div", {
      className: "md-alert__content"
    }, _react.default.createElement("div", {
      className: "md-alert__title"
    }, title), _react.default.createElement("div", {
      className: "md-alert__message"
    }, message)), closable && _react.default.createElement("div", {
      className: "md-alert__button"
    }, _react.default.createElement(_.Button, _extends({
      circle: true,
      size: 44
    }, dismissBtnProps), _react.default.createElement(_.Icon, {
      name: "cancel_16"
    }))));
  };

  return Alert;
}(_react.default.PureComponent);

Alert.defaultProps = {
  closable: true,
  dismissBtnProps: null,
  message: '',
  title: '',
  type: 'info'
};
Alert.propTypes = {
  /** @prop Optional css class string | '' */
  className: _propTypes.default.string,

  /** @prop To show/hide Close button of the Alert | true */
  closable: _propTypes.default.bool,

  /** @prop Props to be passed to dismiss button | null */
  dismissBtnProps: _propTypes.default.object,

  /** @prop Optional Alert message | '' */
  message: _propTypes.default.string,

  /** @prop Set Alert visibility */
  show: _propTypes.default.bool.isRequired,

  /** @prop Optional Alert title | '' */
  title: _propTypes.default.string,

  /** @prop Sets the type of the Alert | 'info' */
  type: _propTypes.default.oneOf(['info', 'success', 'warning', 'error'])
};
Alert.displayName = 'Alert';
var _default = Alert;
exports.default = _default;