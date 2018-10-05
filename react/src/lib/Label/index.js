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
