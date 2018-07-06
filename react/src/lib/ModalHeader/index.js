import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@collab-ui/react';

class ModalHeader extends React.PureComponent {
  render() {
    const {
      children,
      className,
      headerLabel,
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
          : <span className='cui-modal__title'>{headerLabel}</span>
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

ModalHeader.contextTypes = {
  handleClose: PropTypes.func,
};

ModalHeader.defaultProps = {
  children: null,
  className: '',
  headerLabel: '',
  showCloseButton: true,
};

ModalHeader.propTypes = {
  /**
   * header label.
   */
  children: PropTypes.node,
  /**
   * CSS classnames
   */
  className: PropTypes.string,
  /**
   * header label.
   */
  headerLabel: PropTypes.string,
  /**
   * show/hide close button
   */
  showCloseButton: PropTypes.bool
};

ModalHeader.displayName = 'ModalHeader';

export default ModalHeader;
