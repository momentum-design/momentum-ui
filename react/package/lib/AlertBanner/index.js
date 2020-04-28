"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require("./..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var AlertBanner = function AlertBanner(props) {
  var className = props.className,
      closable = props.closable,
      closeBtnProps = props.closeBtnProps,
      children = props.children,
      onHide = props.onHide,
      onKeyDownClose = props.onKeyDownClose,
      show = props.show,
      type = props.type,
      otherProps = _objectWithoutPropertiesLoose(props, ["className", "closable", "closeBtnProps", "children", "onHide", "onKeyDownClose", "show", "type"]);

  var handleKeyDown = function handleKeyDown(e) {
    if (e.which === 32 || e.charCode === 32 || e.which === 13 || e.charCode === 13) {
      onHide && onHide(e);
      e.preventDefault();
    }

    onKeyDownClose && onKeyDownClose(e);
  };

  return show && _react.default.createElement("div", _extends({
    className: "md-alert-banner" + (" md-alert-banner--" + type) + ("" + (className && " " + className || ''))
  }, otherProps), _react.default.createElement("div", {
    className: "md-alert-banner__text"
  }, children), closable && _react.default.createElement("div", _extends({
    className: "md-alert-banner__close"
  }, onHide && {
    onClick: function onClick(e) {
      return onHide(e);
    }
  }, (onHide || onKeyDownClose) && {
    onKeyDown: function onKeyDown(e) {
      return handleKeyDown(e);
    },
    role: 'button',
    tabIndex: 0
  }, closeBtnProps), _react.default.createElement(_.Icon, {
    name: "cancel_16"
  })));
};

AlertBanner.defaultProps = {
  children: null,
  className: '',
  closable: false,
  closeBtnProps: null,
  onKeyDownClose: null,
  onHide: null,
  type: 'info'
};
AlertBanner.propTypes = {
  /** @prop Optional css class string | '' */
  className: _propTypes.default.string,

  /** @prop Sets the visibility of AlertBanner's close button | false */
  closable: _propTypes.default.bool,

  /** @prop Props to be passed to close button | null */
  closeBtnProps: _propTypes.default.object,

  /** @prop Children nodes to render inside AccordionHeader | null  */
  children: _propTypes.default.node,

  /** @prop Invoked when the user presses on the AlertBanner's close button | null */
  onHide: _propTypes.default.func,

  /** @prop Optional callback function invoked on keydown of close button | null */
  onKeyDownClose: _propTypes.default.func,

  /** @prop Set AlertBanner visibility */
  show: _propTypes.default.bool.isRequired,

  /** @prop Sets the AlertBanner type | 'info' */
  type: _propTypes.default.oneOf(['info', 'warning', 'error'])
};
AlertBanner.displayName = 'AlertBanner';
var _default = AlertBanner;
exports.default = _default;