import React from 'react';
import PropTypes from 'prop-types';

/**
 * @category controls
 * @component label
 * @variations collab-ui-react
 */

const Label = ({ className, htmlFor, label, theme, ...props }) => {
  return (
    <label
      className={
        `${className ? ` ${className}` : ''}`+
        `${theme ? ` cui-label--${theme}` : ''}`
      }
      htmlFor={htmlFor}
      {...props}
    >
      <span>{label}</span>
    </label>
  );
};

Label.defaultProps = {
  className: '',
  theme: '',
};

Label.propTypes = {
  /** HTML Class for associated input */
  className: PropTypes.string,
  /** HTML ID for associated input */
  htmlFor: PropTypes.string.isRequired,
  /** Label text */
  label: PropTypes.string.isRequired,
  /** theme prop type */
  theme: PropTypes.string,
};

Label.displayName = 'Label';

export default Label;

/**
* @name Default Label
* @description Labels are useful.
*
* @category controls
* @component label
* @section default
*
* @js

export default function Default() {
  return (
    <div className='row'>
      <Label
        htmlFor='label1'
        label='Default Label'
      />
    </div>
  );
}

**/
