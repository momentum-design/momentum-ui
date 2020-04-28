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

var ModalHeader = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(ModalHeader, _React$PureComponent);

  function ModalHeader() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = ModalHeader.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        closeBtnProps = _this$props.closeBtnProps,
        headerLabel = _this$props.headerLabel,
        message = _this$props.message,
        showCloseButton = _this$props.showCloseButton,
        props = _objectWithoutPropertiesLoose(_this$props, ["children", "className", "closeBtnProps", "headerLabel", "message", "showCloseButton"]);

    var handleClose = this.context.handleClose;
    return _react.default.createElement("div", _extends({
      className: 'md-modal__header' + ("" + (className && " " + className || ''))
    }, props), children ? children : [_react.default.createElement("span", {
      key: "title-0",
      className: "md-modal__title"
    }, headerLabel), message && _react.default.createElement("span", {
      key: "title-1",
      className: "md-modal__message"
    }, message)], showCloseButton && _react.default.createElement(_.CloseIcon, _extends({
      className: "md-modal__close",
      onClick: handleClose
    }, closeBtnProps)));
  };

  return ModalHeader;
}(_react.default.PureComponent);

ModalHeader.propTypes = {
  /** @prop Children nodes to render inside of ModalHeader | null */
  children: _propTypes.default.node,

  /** @prop Optional CSS class names | '' */
  className: _propTypes.default.string,

  /** @prop Props to be passed to close button | null */
  closeBtnProps: _propTypes.default.object,

  /** @prop ModalHeader label text | '' */
  headerLabel: _propTypes.default.string,

  /** @prop Modal message | '' */
  message: _propTypes.default.string,

  /** @prop show/hide close button | true */
  showCloseButton: _propTypes.default.bool
};
ModalHeader.defaultProps = {
  children: null,
  className: '',
  closeBtnProps: null,
  headerLabel: '',
  message: '',
  showCloseButton: true
};
ModalHeader.contextTypes = {
  handleClose: _propTypes.default.func
};
ModalHeader.displayName = 'ModalHeader';
var _default = ModalHeader;
exports.default = _default;