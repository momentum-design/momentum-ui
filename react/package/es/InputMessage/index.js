/** @component input */
import React from 'react';
import PropTypes from 'prop-types';
/** Input Message with required message */

var InputMessage = function InputMessage(_ref) {
  var message = _ref.message;
  return React.createElement("div", {
    className: "md-input__message",
    role: "alert"
  }, message);
};

InputMessage.propTypes = {
  /** @prop message message for InputMessage component */
  message: PropTypes.string.isRequired
};
InputMessage.displayName = 'InputMessage';
export default InputMessage;