/** @component modal */

import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@momentum-ui/react';

class ModalHeader extends React.PureComponent {
  render() {
    const {
      children,
      className,
      closeBtnProps,
      headerLabel,
      message,
      showCloseButton,
      ...props
    } = this.props;
    const {
      handleClose
    } = this.context;

    return (
      <div
        className={
          'md-modal__header' +
          `${(className && ` ${className}`) || ''}`
        }
        {...props}
      >
        {
          children
          ? children
          : [
              <span key='title-0' className='md-modal__title'>{headerLabel}</span>,
              message && <span key='title-1' className='md-modal__message'>{message}</span>
          ]
        }
        {
          showCloseButton &&
          <CloseIcon
            className='md-modal__close'
            onClick={handleClose}
            {...closeBtnProps}
          />
        }
      </div>
    );
  }
}

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
  showCloseButton: PropTypes.bool
};

ModalHeader.defaultProps = {
  children: null,
  className: '',
  closeBtnProps: null,
  headerLabel: '',
  message: '',
  showCloseButton: true,
};

ModalHeader.contextTypes = {
  handleClose: PropTypes.func,
};

ModalHeader.displayName = 'ModalHeader';

export default ModalHeader;
