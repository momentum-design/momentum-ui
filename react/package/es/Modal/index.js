function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component modal */
import React from 'react';
import PropTypes from 'prop-types'; // Library that manages Tabbing and Accessibility for Modal https://github.com/davidtheclark/react-aria-modal

import AriaModal from 'react-aria-modal';

var Modal = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Modal, _React$Component);

  function Modal() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      animationClass: _this.props.show ? 'in' : ''
    };

    _this.getChildContext = function () {
      return {
        handleClose: function handleClose(e) {
          return _this.closeModal(e);
        }
      };
    };

    _this.closeModal = function (e) {
      _this.setAnimationState();

      return setTimeout(function () {
        _this.props.onHide(e);
      }, 300);
    };

    _this.setAnimationState = function (isOpen) {
      _this.setState({
        animationClass: isOpen ? 'in' : ''
      });
    };

    return _this;
  }

  var _proto = Modal.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    prevProps.show !== this.props.show && this.props.show && this.setAnimationState(true);
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        applicationId = _this$props.applicationId,
        backdrop = _this$props.backdrop,
        backdropClickExit = _this$props.backdropClickExit,
        children = _this$props.children,
        className = _this$props.className,
        escapeExits = _this$props.escapeExits,
        focusDialog = _this$props.focusDialog,
        htmlId = _this$props.htmlId,
        renderTo = _this$props.renderTo,
        show = _this$props.show,
        size = _this$props.size,
        props = _objectWithoutPropertiesLoose(_this$props, ["applicationId", "backdrop", "backdropClickExit", "children", "className", "escapeExits", "focusDialog", "htmlId", "renderTo", "show", "size"]);

    var modalContent = React.createElement("div", {
      className: "md-modal__content"
    }, React.createElement("div", {
      className: "md-modal__flex-container"
    }, children));
    var RenderModal = renderTo ? AriaModal.renderTo("#" + renderTo) : AriaModal;

    var getModal = function getModal() {
      return show && React.createElement(RenderModal, _extends({
        onExit: _this2.closeModal,
        getApplicationNode: function getApplicationNode() {
          return document.querySelector("#" + applicationId);
        },
        dialogClass: "md-modal" + (" md-modal--" + size) + (" " + _this2.state.animationClass) + ("" + (className && " " + className || '')),
        includeDefaultStyles: false,
        titleId: htmlId,
        underlayClass: backdrop ? "md-modal__backdrop fade" + (" " + _this2.state.animationClass) : '',
        underlayClickExits: backdropClickExit,
        escapeExits: escapeExits,
        focusDialog: focusDialog
      }, props), modalContent);
    };

    return getModal();
  };

  return Modal;
}(React.Component);

Modal.childContextTypes = {
  handleClose: PropTypes.func
};
Modal.propTypes = {
  /** @prop application DOM id, used to set aria-hidden to true when modal is open */
  applicationId: PropTypes.string.isRequired,

  /** @prop Determines the visibility and ability to edit the backdrop of the Modal | true */
  backdrop: PropTypes.bool,

  /** @prop To enable/disable clicking on underlay to exit modal | false */
  backdropClickExit: PropTypes.bool,

  /** @prop Children nodes to render inside the Modal | null */
  children: PropTypes.node,

  /** @prop Optional css class names | '' */
  className: PropTypes.string,

  /** @prop To enable/disable escape to exit modal | true */
  escapeExits: PropTypes.bool,

  /** @prop To set focus to the entire modal rather than elements within modal | true */
  focusDialog: PropTypes.bool,

  /** @prop Unique HTML ID used for tying label to HTML input for automated testing */
  htmlId: PropTypes.string.isRequired,

  /** @prop Icon node to be rendered for Dialog | null */
  icon: PropTypes.element,

  /** @prop Callback function invoked when user clicks on cross button or esc key */
  onHide: PropTypes.func.isRequired,

  /** @prop To render to an element other than the browser window | null */
  renderTo: PropTypes.string,

  /** @prop Show/hide modal */
  show: PropTypes.bool.isRequired,

  /** @prop Size of the modal | 'default' */
  size: PropTypes.oneOf(['large', 'medium', 'default', 'small', 'full', 'dialog'])
};
Modal.defaultProps = {
  backdrop: true,
  backdropClickExit: false,
  children: null,
  className: '',
  escapeExits: true,
  focusDialog: true,
  icon: null,
  renderTo: null,
  show: false,
  size: 'default'
};
Modal.displayName = 'Modal';
export default Modal;