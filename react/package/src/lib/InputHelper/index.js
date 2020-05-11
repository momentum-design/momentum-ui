/** @component input */

import React from 'react';
import PropTypes from 'prop-types';

const InputHelper = ({ message, className, ...props }) => {
  return (
    <div 
      className={
        `md-input__help-text` +
        `${className && ` ${className}` || ''}`
      }
      {...props}
    >
      {message}
    </div>
  );
};

InputHelper.propTypes = {
  /** @prop Optional css class name | '' */
  className: PropTypes.string,
  /** @prop Input help message for parent Input | null */
  message: PropTypes.string.isRequired
};

InputHelper.defaultProps = {
  className: '',
  message: null,
};

InputHelper.displayName = 'InputHelper';

export default InputHelper;
