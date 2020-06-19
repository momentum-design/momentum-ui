function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component modal */
import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from "./..";

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
        role = _this$props.role,
        ariaLevel = _this$props.ariaLevel,
        ariaLabel = _this$props.ariaLabel,
        props = _objectWithoutPropertiesLoose(_this$props, ["children", "className", "closeBtnProps", "headerLabel", "message", "showCloseButton", "role", "ariaLevel", "ariaLabel"]);

    var handleClose = this.context.handleClose;
    return /*#__PURE__*/React.createElement("div", _extends({
      className: 'md-modal__header' + ("" + (className && " " + className || ''))
    }, props), children ? children : [/*#__PURE__*/React.createElement("span", {
      key: "title-0",
      className: "md-modal__title",
      role: role,
      "aria-level": ariaLevel,
      "aria-label": ariaLabel
    }, headerLabel), message && /*#__PURE__*/React.createElement("span", {
      key: "title-1",
      className: "md-modal__message"
    }, message)], showCloseButton && /*#__PURE__*/React.createElement(CloseIcon, _extends({
      className: "md-modal__close",
      onClick: handleClose
    }, closeBtnProps)));
  };

  return ModalHeader;
}(React.PureComponent);

ModalHeader.propTypes = {
  /** @prop Children nodes to render inside of ModalHeader | null */
  children: PropTypes.node,

  /** @prop Optional CSS class names | '' */
  className: PropTypes.string,

  /** @prop Props to be passed to close button | null */
  closeBtnProps: PropTypes.object,

  /** @prop ModalHeader label text | '' */
  headerLabel: PropTypes.string,

  /** @prop Modal message | '' */
  message: PropTypes.string,

  /** @prop show/hide close button | true */
  showCloseButton: PropTypes.bool,

  /** @prop role modal header | null */
  role: PropTypes.string,

  /** @prop ariaLevel modal header | null */
  ariaLevel: PropTypes.number,

  /** @prop ariaLabel modal header | null */
  ariaLabel: PropTypes.string
};
ModalHeader.defaultProps = {
  children: null,
  className: '',
  closeBtnProps: null,
  headerLabel: '',
  message: '',
  showCloseButton: true,
  role: null,
  ariaLabel: null,
  ariaLevel: null
};
ModalHeader.contextTypes = {
  handleClose: PropTypes.func
};
ModalHeader.displayName = 'ModalHeader';
export default ModalHeader;