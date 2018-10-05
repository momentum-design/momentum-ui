import React from 'react';
import PropTypes from 'prop-types';

/** Input Error with required error */
const InputError = ({ error }) => {
  return (
    <div className="cui-input__messages" role="alert">
      <div className="message">{error}</div>
    </div>
  );
};

InputError.propTypes = {
  /** @prop Error message for InputError component */
  error: PropTypes.string.isRequired,
};

InputError.displayName = 'InputError';

export default InputError;
