/**
* @category containers
* @component list-item
* @variations collab-ui-react
*/

import React from 'react';
import PropTypes from 'prop-types';

const ListItemSection = props => { 
    const { children, position, className } = props;

  return (
    <div
      className={
        `cui-list-item__${position}` +
        `${(className && ` ${className}`) || ''}`
      }
    >
      {children}
    </div>
  );
};

ListItemSection.propTypes = {
  position: PropTypes.oneOf(['left', 'center', 'right', 'center-align']),
  children: PropTypes.node,
  className: PropTypes.string
};

ListItemSection.defaultProps = {
  position: 'center',
  children: null,
  className: ''
};

ListItemSection.displayName = 'ListItemSection';

export default ListItemSection;