import React from 'react';
import { Button, DatePicker } from '@collab-ui/react';
export default class DatePickerDefault extends React.PureComponent {
  state = {
    date: null,
  };
  render() {
    const { date } = this.state;
    return (
      <div>
      <span>
        <h4 className="columns">Selected Date: {date && date.toDateString()}</h4>
        <DatePicker onSelect={(e, date) => this.setState({ date })}>
          <Button
            children='Pick a Date'
            ariaLabel='DatePicker'
          />
        </DatePicker>
      </span>
      <span className="cui--contrast">
        <DatePicker onSelect={(e, date) => this.setState({ date })}>
          <Button
            children='Pick a Date (with Contrast)'
            ariaLabel='DatePicker'
          />
        </DatePicker>
      </span>
      </div>
    );
  }
}