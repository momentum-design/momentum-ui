import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@collab-ui/react';

class ModalHeader extends React.PureComponent {
  render() {
    const {
      children,
      className,
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
          'cui-modal__header' +
          `${(className && ` ${className}`) || ''}`
        }
        {...props}
      >
        { 
          children
          ? children
          : [
              <span key='title-0' className='cui-modal__title'>{headerLabel}</span>,
              message && <span key='title-1' className='cui-modal__message'>{message}</span>
          ]
        }
        {
          showCloseButton &&
          <CloseIcon 
            className='cui-modal__close'
            onClick={handleClose}
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
  headerLabel: '',
  message: '',
  showCloseButton: true,
};

ModalHeader.contextTypes = {
  handleClose: PropTypes.func,
};

ModalHeader.displayName = 'ModalHeader';

export default ModalHeader;
