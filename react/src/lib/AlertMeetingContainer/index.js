import React from 'react';
import PropTypes from 'prop-types';

const AlertMeetingContainer = props => {
  const { alertList } = props;

  return (
    <div className='cui-alert__container cui-alert__container--bottom-right'>
      {alertList}
    </div>
  );
};

AlertMeetingContainer.defaultProps = {
  alertList: []
};

AlertMeetingContainer.propTypes = {
  /** @prop Array of AlertMeeting components | [] */
  alertList: PropTypes.arrayOf(PropTypes.node)
};

AlertMeetingContainer.displayName = 'AlertMeetingContainer';

export default AlertMeetingContainer;
