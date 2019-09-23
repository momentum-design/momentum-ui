/** @component input */

import React from 'react';
import PropTypes from 'prop-types';

/** Input Message with required message */
const InputMessage = ({ message }) => {
  return (
    <div className='md-input__message' role='alert'>
      {message}
    </div>
  );
};

InputMessage.propTypes = {
  /** @prop message message for InputMessage component */
  message: PropTypes.string.isRequired,
};

InputMessage.displayName = 'InputMessage';

export default InputMessage;
