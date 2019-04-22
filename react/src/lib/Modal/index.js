/** @component modal */

import React from 'react';
import PropTypes from 'prop-types';
// Library that manages Tabbing and Accessibility for Modal https://github.com/davidtheclark/react-aria-modal
import AriaModal from 'react-aria-modal';

class Modal extends React.Component {

  static childContextTypes = {
    handleClose: PropTypes.func
  };

  state = {
    animationClass: this.props.show ? 'in' : '',
  };

  getChildContext = () => {
    return {
      handleClose: e => this.closeModal(e)
    };
  };

  componentDidUpdate(prevProps) {
    prevProps.show !== this.props.show
      && this.props.show
      && this.setAnimationState(true);
  }

  closeModal = e => {
    this.setAnimationState();

    return setTimeout(() => {
      this.props.onHide(e);
    }, 300);
  }

  setAnimationState = isOpen => {
    this.setState({ animationClass: isOpen ? 'in' : '' });
  }

  render() {
    const {
      applicationId,
      backdrop,
      backdropClickExit,
      children,
      className,
      escapeExits,
      focusDialog,
      htmlId,
      renderTo,
      show,
      size,
      ...props
    } = this.props;

    const modalContent = (
      <div className="md-modal__content">
        <div className="md-modal__flex-container">
          {children}
        </div>
      </div>
    );

    const RenderModal = renderTo
      ? AriaModal.renderTo(`#${renderTo}`)
      : AriaModal;

    const getModal = () => {
      return show
        &&
        <RenderModal
          onExit={this.closeModal}
          getApplicationNode={() => document.querySelector(`#${applicationId}`)}
          dialogClass={
            `md-modal` +
            ` md-modal--${size}` +
            ` ${this.state.animationClass}` +
            `${(className && ` ${className}`) || ''}`
          }
          includeDefaultStyles={false}
          titleId={htmlId}
          underlayClass={
            backdrop
              ? `md-modal__backdrop fade` + ` ${this.state.animationClass}`
              : ''
          }
          underlayClickExits={backdropClickExit}
          escapeExits={escapeExits}
          focusDialog={focusDialog}
          {...props}
        >
          {modalContent}
        </RenderModal>;
      };

    return (
      getModal()
    );
  }
}

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
  size: PropTypes.oneOf(['large', 'medium', 'default', 'small', 'full', 'dialog']),
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
  size: 'default',
};

Modal.displayName = 'Modal';

export default Modal;
