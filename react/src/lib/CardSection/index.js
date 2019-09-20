/** @component card */

import React from 'react';
import PropTypes from 'prop-types';

const CardSection = props => {
  const {
    children,
    className,
    full,
    ...otherProps
  } = props;

  return (
    <div className={
      `md-card-section` +
      `${full && ` md-card-section--full` || ''}` +
      `${className && ` ${className}` || ''}`
      }
      {...otherProps}
    >
      {children}
    </div>
  );
};

CardSection.propTypes = {
  /** @prop Children nodes to render inside the CardSection | null */
  children: PropTypes.node,
  /** @prop Optional css class names | '' */
  className: PropTypes.string,
  /** @prop Set the card section to be the full width | false */
  full: PropTypes.bool,
};

CardSection.defaultProps = {
  children: null,
  className: '',
  full: false,
};

CardSection.displayName = 'CardSection';

export default CardSection;
