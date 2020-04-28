import React from 'react';
import { TimePicker } from '@momentum-ui/react';
export default class TimePicker24Hr extends React.PureComponent {
  render() {
    return (
      <div className='timePicker-container'>
        <TimePicker
          selectedTime={new Date('Tue Oct 01 2019 18:19:00 GMT-0500 (Central Daylight Time)')}
          militaryTime
          inputId='24hour'
        />
      </div>
    );
  }
}
