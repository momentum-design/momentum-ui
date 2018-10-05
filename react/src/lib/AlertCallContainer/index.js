import React from 'react';
import PropTypes from 'prop-types';

const AlertCallContainer = props => {
  const {alertList} = props;

  return (
    <div className='cui-alert__container cui-alert__container--call'>
      {alertList}
    </div>
  );
};

AlertCallContainer.defaultProps = {
  alertList: []
};

AlertCallContainer.propTypes = {
  /** @prop Array of AlertCall components | [] */
  alertList: PropTypes.arrayOf(PropTypes.node)
};

AlertCallContainer.displayName = 'AlertCallContainer';

export default AlertCallContainer;
