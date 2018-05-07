import React from 'react';
import PropTypes from 'prop-types';

const AlertContainer = props => {
  const { children, className } = props;

  return (
    <div className={
      'cui-alert' +
      ` ${className}`
    }>
      {children}
    </div>
  );
};

AlertContainer.propTypes = {
  /**
   * Child component to display in Alert Container
   */
  children: PropTypes.node,
  /**
   * optional className prop type
   */
  className: PropTypes.string,
};

AlertContainer.defaultProps = {
  children: null,
};

AlertContainer.displayName = 'AlertContainer';

export default AlertContainer;
