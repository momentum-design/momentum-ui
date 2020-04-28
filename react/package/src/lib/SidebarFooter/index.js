/** @component sidebar */

import React from 'react';
import PropTypes from 'prop-types';

const SidebarFooter = props => {
  const { children, className, ...otherProps } = props;
  return (
    <div
      className={
        `md-sidebar__footer` +
        `${(className && ` ${className}`) || ''}`
      }
      {...otherProps}
    >
      {children}
    </div>
  );
};

SidebarFooter.displayName = 'SidebarFooter';

SidebarFooter.propTypes = {
  /** @prop Children nodes to render inside SidebarFooter | null */
  children: PropTypes.node,
  /** @prop Optional css class string | ''  */
  className: PropTypes.string,
};

SidebarFooter.defaultProps = {
  children: null,
  className: '',
};

export default SidebarFooter;
