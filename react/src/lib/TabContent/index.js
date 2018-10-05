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
  /** @prop Determines the initial active index | null */
  activeIndex: PropTypes.number,
  /** @prop Children nodes to render inside TabContent | null */
  children: PropTypes.node,
};

TabContent.defaultProps = {
  activeIndex: null,
  children: null,
};

TabContent.displayName = 'TabContent';

export default TabContent;
