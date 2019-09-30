import React from 'react';
import { TimePicker } from '@momentum-ui/react';

export default class TimePicker30MinStep extends React.PureComponent {
  render() {
    return (
      <div className="timePicker-container">
        <TimePicker inputId='30min' minuteInterval={30} selectedTime={new Date()} />
      </div>
    );
  }
}
