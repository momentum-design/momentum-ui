/** @component label */

import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ className, htmlFor, label, theme, ...props }) => {
  return (
    <label
      className={
        `${className ? ` ${className}` : ''}`+
        `${theme ? ` md-label--${theme}` : ''}`
      }
      htmlFor={htmlFor}
      {...props}
    >
      <span>{label}</span>
    </label>
  );
};

Label.propTypes = {
  /** @prop HTML class name for associated Input | '' */
  className: PropTypes.string,
  /** @prop HTML ID for associated Input | null */
  htmlFor: PropTypes.string.isRequired,
  /** @prop Required Label text | null */
  label: PropTypes.string.isRequired,
  /** @prop Set Label's color theme | '' */
  theme: PropTypes.string,
};

Label.defaultProps = {
  className: '',
  htmlFor: null,
  label: null,
  theme: '',
};

Label.displayName = 'Label';

export default Label;
