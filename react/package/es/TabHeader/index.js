/** @component tabs */
import React from 'react';
import PropTypes from 'prop-types';

var TabHeader = function TabHeader(props) {
  var heading = props.heading,
      subHeading = props.subHeading;
  return (
    /*#__PURE__*/
    //Element type required by Momentum UI Style
    React.createElement("md-tab-heading", null, heading, subHeading && /*#__PURE__*/React.createElement("div", null, subHeading))
  );
};

TabHeader.propTypes = {
  /** @prop TabHeader text */
  heading: PropTypes.string.isRequired,

  /** @prop Subheader text | '' */
  subHeading: PropTypes.string
};
TabHeader.defaultProps = {
  subHeading: ''
};
TabHeader.displayName = 'TabHeader';
export default TabHeader;