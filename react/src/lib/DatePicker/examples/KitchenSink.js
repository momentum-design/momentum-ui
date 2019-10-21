import React from 'react';
import moment from 'moment-timezone';
import {
  Button,
  DatePicker,
} from '@momentum-ui/react';

export default class DatePickerKitchenSink extends React.Component {
  render() {
    const date = () => {
      moment.tz.setDefault('Asia/Kolkata');
      return moment('2018-04-15');
    };

    return (
      <React.Fragment>
        <DatePicker selectedDate={date().toDate()}>
          <Button
            children='Pick a Date'
            ariaLabel='DatePicker'
            id='default-1'
          />
        </DatePicker>
      </React.Fragment>
    );
  }
}
