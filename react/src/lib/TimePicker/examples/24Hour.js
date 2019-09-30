import React from 'react';
import { TimePicker } from '@momentum-ui/react';
export default class TimePicker24Hr extends React.PureComponent {
  render() {
    return (
      <div className='timePicker-container'>
        <TimePicker
          selectedTime={new Date()}
          militaryTime
          inputId='24hour'
        />
      </div>
    );
  }
}
