/**
 * @category communication
 * @component tooltip
 * @variations collab-ui-react
 */

// import React from 'react';
import PropTypes from 'prop-types';

const TooltipContent = ({ children }) => {
  return children;
};

TooltipContent.propTypes = {
  children: PropTypes.node
};

TooltipContent.defaultProps = {
  children: null
};

TooltipContent.displayName = 'TooltipContent';

export default TooltipContent;