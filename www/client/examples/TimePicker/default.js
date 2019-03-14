import React from 'react';
import { Input, TimePicker } from '@collab-ui/react';
export default class TimePickerDefault extends React.PureComponent {
  render() {
    return (
      <div className='timePicker-container'>
        <TimePicker
          selectedTime={new Date()}
        />
      </div>
    );
  }
}