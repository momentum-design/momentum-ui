import React from 'react';
import { TimePicker } from '@collab-ui/react';
export default class TimePicker24Hr extends React.PureComponent {
  render() {
    return (
      <div className='timePicker-container'>
        <TimePicker
          selectedTime={new Date()}
          militaryTime
        />
      </div>
    );
  }
}
