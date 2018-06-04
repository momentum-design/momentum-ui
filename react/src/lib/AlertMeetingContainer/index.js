import React from 'react';
import { AlertMeeting } from '@collab-ui/react';
import {
  bind,
  reject,
  uniqueId
} from 'lodash';

class AlertMeetingContainer extends React.Component {
  static displayName = 'AlertMeetingContainer';

  state = {
    alertList: []
  }

  meetingAlert = (
    title,
    status,
    message,
    onHide,
    onSnooze,
    attendees,
    avatar
  ) => {
    this.handleMeetingAlert(
      title,
      status,
      message,
      onHide,
      onSnooze,
      attendees,
      avatar
    );
  }

  handleMeetingAlert = (
    title,
    status,
    message,
    onHide,
    onSnooze,
    attendees,
    avatar
  ) => {
    const key = uniqueId('meeting_alert_');
    const nextAlert = {
      key,
      title: title,
      status: status,
      message: message,
      onHide: bind(this.handleOnHide, this, key, onHide),
      onSnooze: bind(this.handleOnSnooze, this, key, onSnooze),
      attendees: attendees,
      avatar: avatar,
      show: true
    }
    this.setState(state => ({
      alertList: [...state.alertList, nextAlert]
    }));
  }

  handleOnSnooze = (key, onSnooze, e) => {
    this.setState(state => {
      onSnooze && onSnooze(e);
      return { alertList: reject(state.alertList, {key}) };
    });
  }

  handleOnHide = (key, onHide, e) => {
    this.setState(state => {
      onHide && onHide(e);
      return { alertList: reject(state.alertList, {key}) };
    });
  }

  render() {
    return (
      <div className='cui-alert__container cui-alert__container--bottom-right'>
        {
          this.state.alertList.map(alert => (
            <AlertMeeting
              key={alert.key}
              title={alert.title}
              status={alert.status}
              message={alert.message}
              onHide={alert.onHide}
              onSnooze={alert.onSnooze}
              attendees={alert.attendees}
              avatar={alert.avatar}
              show={alert.show}
            />
          ))
        }
      </div>
    );
  }
}

export default AlertMeetingContainer;
