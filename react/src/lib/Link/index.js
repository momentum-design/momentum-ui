import React from 'react';
import PropTypes from 'prop-types';

/**
 * @category controls
 * @component link
 * @variations collab-ui-react
 */

const Link = ({ className, children, color, disabled, tag, theme, ...props }) => {
  return (
    React.createElement(
      tag,
      {
        className:
          'cui-link' +
          `${(color && ` cui-link--${color}`) || ''}` +
          `${(theme && ` cui-link--${theme}`) || ''}` +
          `${(className && ` ${className}`) || ''}`,
        disabled: disabled,
        ...!disabled && { tabIndex: 0 },
        ...props
      },
      children
    )
  );
};

Link.defaultProps = {
  className: '',
  color: 'blue',
  disabled: false,
  tag: 'a',
  theme: ''
};

Link.propTypes = {
  /** Link children */
  children: PropTypes.node.isRequired,
  /** HTML Class for associated input */
  className: PropTypes.string,
  /** color prop type */
  color: PropTypes.string,
  /** theme prop type */
  theme: PropTypes.string,
  /** Sets the attribute disabled to the link */
  disabled: PropTypes.bool,
  /** optional tag prop type */
  tag: PropTypes.oneOf(['a', 'div', 'span']),
};

Link.displayName = 'Link';

export default Link;


/**
* @name Default Link
* @description Default Link.
*
* @category controls
* @component link
* @section default
*
* @js

export default function LinkDefault() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div className='columns small-3'>
          <Link>Default</Link>
          <Link tag='div'>Tag Prop(div)</Link>
          <Link tag='span'>Tag Prop(span)</Link>
      </div>
    </div>
  );
}

**/

/**
* @name Link Colors
* @description Vary colors by using theme & color props.
*
* @category controls
* @component link
* @section colors
*
* @js
*
export default function LinkDefault() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div className='columns small-3'>
        <Link tag='div' color='red'>Color Prop(red)</Link>
      </div>
    </div>
  );
}
*/
