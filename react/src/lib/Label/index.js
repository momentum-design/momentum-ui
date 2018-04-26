import React from 'react';
import PropTypes from 'prop-types';

/**
 * @category controls
 * @component label
 * @variations collab-ui-react
 */

const Label = ({ className, label, htmlFor }) => {
  return (
    <label className={className} htmlFor={htmlFor}>
      <span>{label}</span>
    </label>
  );
};

Label.defaultProps = {
  className: '',
};

Label.propTypes = {
  /** HTML ID for associated input */
  htmlFor: PropTypes.string.isRequired,
  /** HTML Class for associated input */
  className: PropTypes.string,
  /** Label text */
  label: PropTypes.string.isRequired,
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
