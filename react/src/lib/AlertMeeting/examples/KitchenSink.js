import React from 'react';
import {
  AlertMeetingDefault,
  AlertMeetingMultiple,
} from './index';

export default class AlertMeetingKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AlertMeetingDefault />
        <AlertMeetingMultiple />
      </React.Fragment>
    );
  }
}
