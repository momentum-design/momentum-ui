import React from 'react';
import PropTypes from 'prop-types';

/**
 * TabContent helps organize the TabPanes and provides the Tab-content CSS wrapper;
 * @param props
 * @returns {XML}
 * @constructor
 */

const TabContent = props => {
  const { children, activeIndex } = props;

  const setPanels = React.Children.map(children, (child, idx) => {
    return React.cloneElement(child, {
      active: activeIndex === idx ? true : false,
    });
  });

  return <div className={`cui-tab__content`}>{setPanels}</div>;
};

TabContent.propTypes = {
  /**
   * optional children prop type
   */
  activeIndex: PropTypes.number,
  /**
   * optional children prop type
   */
  children: PropTypes.node,
};

TabContent.displayName = 'TabContent';

export default TabContent;
