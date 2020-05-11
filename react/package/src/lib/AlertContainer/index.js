/** @component alert */

import React from 'react';
import PropTypes from 'prop-types';

class AlertContainer extends React.Component {
  render() {
    const { 
      children,
      className,
      position,
      ...otherProps
    } = this.props;

    return (
      <div 
        className={
          'md-alert__container' + 
          ` md-alert__container--${position}` +
          `${(className && ` ${className}`) || ''}`
        }
        {...otherProps}
        role='alert'
      >
        {children}
      </div>
    );
  }
}

AlertContainer.defaultProps = {
  children: null,
  className: '',
  position: 'bottom-right'
};

AlertContainer.propTypes = {
  /** @prop Children Nodes to Render inside container | null */
  children: PropTypes.node,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Define alert's position with css class name | 'bottom-right' */
  position: PropTypes.oneOf(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'])
};

AlertContainer.displayName = 'AlertContainer';

export default AlertContainer;