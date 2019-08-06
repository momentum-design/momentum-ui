/** @component input */

import React from 'react';
import PropTypes from 'prop-types';

const InputSection = props => {
    const {
      children,
      className,
      position,
      ...otherProps
    } = props;

  return (
    <span
      className={
        `md-input__${position}` +
        `${className && ` ${className}` || ''}`
      }
      {...otherProps}
    >
      {children}
    </span>
  );
};

InputSection.propTypes = {
  /** @prop Children nodes to render inside InputSection | null */
  children: PropTypes.node,
  /** @prop Optional css class name | '' */
  className: PropTypes.string,
  /** @prop Determine the InputSection's position | 'before' */
  position: PropTypes.oneOf(['before', 'after']),
};

InputSection.defaultProps = {
  children: null,
  className: '',
  position: 'before',
};

InputSection.displayName = 'InputSection';

export default InputSection;
