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
  /**
   * optional children prop type
   */
  children: PropTypes.node,
  /**
   * optional active prop type
   */
  active: PropTypes.bool,
};

TabPane.defaultProps = {
  active: false,
};

TabPane.displayName = 'TabPane';

export default TabPane;
