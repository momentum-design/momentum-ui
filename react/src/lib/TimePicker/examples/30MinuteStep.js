import React from 'react';
import { TimePicker } from '@momentum-ui/react';

export default class TimePicker30MinStep extends React.PureComponent {
  render() {
    return (
      <div className="timePicker-container">
        <TimePicker inputId='30min' minuteInterval={30} selectedTime={new Date('Tue Oct 01 2019 18:19:00 GMT-0500 (Central Daylight Time)')} />
      </div>
    );
  }
}
