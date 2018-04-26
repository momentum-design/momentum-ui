import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@collab-ui/react/CloseIcon';

const ModalHeader = props => (
  <div className={`cui-modal__header ${props.className}`}>
    <span className="cui-modal__title">{props.headerLabel}</span>
    {props.showCloseButton && (
      <CloseIcon onClick={props.onHide} className="cui-modal__close"/>
    )}
  </div>
);

ModalHeader.defaultProps = {
  className: '',
  headerLabel: '',
  onHide: null,
  showCloseButton: true,
};

ModalHeader.propTypes = {
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
  showCloseButton: PropTypes.bool,
  /**
   * OnHide call back
   */
  onHide: PropTypes.func,
};

ModalHeader.displayName = 'ModalHeader';

export default ModalHeader;
