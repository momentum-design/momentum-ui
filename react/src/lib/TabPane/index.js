import React from 'react';
import PropTypes from 'prop-types';

/**
 * Tab is supplemental, non-clickable component used to help bring attention to an item or object.
 * @param props
 * @returns {XML}
 * @constructor
 */
const TabPane = props => {
  const { children, active } = props;

  return (
    <div className={`cui-tab__pane` + `${active ? ' active' : ''}`}>
      <div className="cui-tab__content">{children}</div>
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
