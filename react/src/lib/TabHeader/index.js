import React from 'react';
import PropTypes from 'prop-types';

/**
 * Tabheader is used for Large Tabs with subheadings;
 * @param props
 * @returns {XML}
 * @constructor
 */

const TabHeader = props => {
  const { heading, subHeading } = props;

  return (
    //Element type requires by UI-Collab Style
    <cui-tab-heading>
      {heading}
      {subHeading && <div>{subHeading}</div>}
    </cui-tab-heading>
  );
};

TabHeader.propTypes = {
  /** @prop TabHeader text */
  heading: PropTypes.string.isRequired,
  /** @prop Subheader text | '' */
  subHeading: PropTypes.string,
};

TabHeader.defaultProps = {
  subHeading: '',
};

TabHeader.displayName = 'TabHeader';

export default TabHeader;
