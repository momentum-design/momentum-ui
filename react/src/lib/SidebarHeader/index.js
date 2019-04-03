/** @component sidebar */

import React from 'react';
import PropTypes from 'prop-types';

const SidebarHeader = props => {
  const { children, className, ...otherProps } = props;
  return (
    <div
      className={
        `cui-sidebar__header` +
        `${(className && ` ${className}`) || ''}`
      }
      {...otherProps}
    >
      {children}
    </div>
  );
};

SidebarHeader.displayName = 'SidebarHeader';

SidebarHeader.propTypes = {
  /** @prop Children nodes to render inside SidebarHeader | null */
  children: PropTypes.node,
  /** @prop Optional css class string | ''  */
  className: PropTypes.string,
};

SidebarHeader.defaultProps = {
  children: null,
  className: '',
};

export default SidebarHeader;
