/** @component label */

import React from 'react';
import PropTypes from 'prop-types';

const Label = ({
  children,
  className,
  htmlFor,
  label,
  theme,
  ...props
}) => {
  return (
    <label
      className={
        `${className ? `${className}` : ''}` +
        `${theme ? ` md-label--${theme}` : ''}`
      }
      htmlFor={htmlFor}
      {...props}
    >
      {
        label 
        ? <span>{label}</span>
        : children
      }
    </label>
  );
};

Label.propTypes = {
  /** @prop Children nodes to render inside the Label | null */
  children: PropTypes.node,
  /** @prop HTML class name for associated Input | '' */
  className: PropTypes.string,
  /** @prop HTML ID for associated Input | null */
  htmlFor: PropTypes.string.isRequired,
  /** @prop Required Label text | null */
  label: PropTypes.string,
  /** @prop Set Label's color theme | '' */
  theme: PropTypes.string,
};

Label.defaultProps = {
  children: null,
  className: '',
  htmlFor: null,
  label: null,
  theme: '',
};

Label.displayName = 'Label';

export default Label;
