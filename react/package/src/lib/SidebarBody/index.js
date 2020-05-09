/** @component sidebar */

import React from 'react';
import PropTypes from 'prop-types';

const SidebarBody = props => {
  const { children, className } = props;
  return (
    <div
      className={
        `md-sidebar__body` +
        `${(className && ` ${className}`) || ''}`
      }
    >
      {children}
    </div>
  );
};

SidebarBody.displayName = 'SidebarBody';

SidebarBody.propTypes = {
  /** @prop Children nodes to render inside SidebarBody | null */
  children: PropTypes.node,
  /** @prop Optional css class string | ''  */
  className: PropTypes.string,
};

SidebarBody.defaultProps = {
  children: null,
  className: '',
};

export default SidebarBody;
