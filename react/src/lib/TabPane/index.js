/** @component tabs */

import React from 'react';
import PropTypes from 'prop-types';

const TabPane = props => {
  const { children, active } = props;

  return (
    <div className={`md-tab__pane` + `${active ? ' active' : ''}`}>
      <div className="md-tab__content">{children}</div>
    </div>
  );
};

TabPane.propTypes = {
  /** @prop Determines if TabPane is active | false */
  active: PropTypes.bool,
  /** @prop Children nodes to render inside TabPane | null */
  children: PropTypes.node,
};

TabPane.defaultProps = {
  active: false,
  children: null,
};

TabPane.displayName = 'TabPane';

export default TabPane;
