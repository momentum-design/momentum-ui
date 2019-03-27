/** @component modal */

import React from 'react';
import PropTypes from 'prop-types';

const ModalFooter = props => {
  const { className, children } = props;
  return (
    <div className={
      'cui-modal__footer' +
      `${(className && ` ${className}`) || ''}`
      }
    >
      {children}
    </div>
  );
};

ModalFooter.propTypes = {
  /** @prop Children nodes to render inside of ModalFooter | null */
  children: PropTypes.node,
  /** @prop Optional css class names | '' */
  className: PropTypes.string,
};

ModalFooter.defaultProps = {
  children: null,
  className: '',
};

ModalFooter.displayName = 'ModalFooter';

export default ModalFooter;
