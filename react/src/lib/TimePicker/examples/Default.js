import React from 'react';
import { TimePicker } from '@momentum-ui/react';
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
