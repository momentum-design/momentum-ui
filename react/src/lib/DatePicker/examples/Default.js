import React from 'react';
import { Button, DatePicker } from '@momentum-ui/react';
export default class DatePickerDefault extends React.PureComponent {
  state = {
    date: null,
  };
  render() {
    const { date } = this.state;
    return (
      <span>
        <h4 className="columns">Selected Date: {date && date.toDateString()}</h4>
        <DatePicker onSelect={(e, date) => this.setState({ date })}>
          <Button
            children='Pick a Date'
            ariaLabel='DatePicker'
          />
        </DatePicker>
      </span>
    );
  }
}
