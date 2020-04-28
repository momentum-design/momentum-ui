import React from 'react';
import {
  TimePicker24Hour,
  TimePicker30MinuteStep,
  TimePickerDefault,
} from './index';

export default class TimePickerKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TimePicker24Hour />
        <TimePicker30MinuteStep />
        <TimePickerDefault />
      </React.Fragment>
    );
  }
}
