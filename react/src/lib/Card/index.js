/** @component card */

import React from 'react';
import PropTypes from 'prop-types';

const Card = props => {
  const {
    children,
    className,
    onClick,
    ...otherProps
  } = props;

  const handleKeyDown = e => {
    if (
      e.which === 32
      || e.which === 13
      || e.charCode === 32
      || e.charCode === 13
    ) {
      onClick && onClick(e);
      e.preventDefault();
    }
  };

  return (
    <div
      className={
        `md-card` +
        `${onClick && ` md-card--clickable` || ''}` +
        `${className && ` ${className}` || ''}`
      }
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role='presentation'
      {...otherProps}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  /** @prop Children nodes to render inside of Card | null */
  children: PropTypes.node,
  /** @prop Optional CSS class names | '' */
  className: PropTypes.string,
  /** @prop Handler to be called when the card is clicked | '' */
  onClick: PropTypes.func,
};

Card.defaultProps = {
  children: null,
  className: '',
  onClick: null,
};

Card.displayName = 'Card';

export default Card;
