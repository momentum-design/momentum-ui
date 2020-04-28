/** @component menu-content */

import React from 'react';
import PropTypes from 'prop-types';

class MenuContent extends React.PureComponent {

  render() {
    const { children, className, ...props } = this.props;


    return (
      <div
        className={
          'md-menu-content' +
          `${(className && ` ${className}`) || ''}`
        }
        {...props}
      >
        {children}
      </div>
    );
  }
}

MenuContent.propTypes = {
  /** @prop Children nodes to render inside MenuContent component | null */
  children: PropTypes.node,
  /** @prop Optional css class name | '' */
  className: PropTypes.string
};

MenuContent.defaultProps = {
  children: null,
  className: '',
};

MenuContent.displayName = 'MenuContent';

export default MenuContent;
