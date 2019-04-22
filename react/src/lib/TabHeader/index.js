/** @component tabs */

import React from 'react';
import PropTypes from 'prop-types';

const TabHeader = props => {
  const { heading, subHeading } = props;

  return (
    //Element type requires by UI-Collab Style
    <md-tab-heading>
      {heading}
      {subHeading && <div>{subHeading}</div>}
    </md-tab-heading>
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
