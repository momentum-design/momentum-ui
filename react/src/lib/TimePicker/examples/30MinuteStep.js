import React from 'react';
import { TimePicker } from '@momentum-ui/react';

export default class TimePicker30MinStep extends React.PureComponent {
  render() {
    return (
      <div className="timePicker-container">
        <TimePicker minuteInterval={30} selectedTime={new Date()} />
      </div>
    );
  }
}
