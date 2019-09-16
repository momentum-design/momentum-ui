import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@momentum-ui/react';
import {
  getDate,
  getMonth,
  isDayDisabled,
  isSameDay,
  now,
} from '@momentum-ui/react/utils/dateUtils';
import moment from 'moment';

class DatePickerDay extends React.Component {
  static displayName = 'DatePickerDay';

  handleClick = e => {
    const { handleDayClick } = this.context;
    const { day } = this.props;
    return (
      handleDayClick
      && handleDayClick(e, day)
    );
  };

  render() {
    const { day, month } = this.props;
    const { selected, focus } = this.context;

    const isOutsideMonth = month !== getMonth(day);
    const isSelected = isSameDay(day, selected);
    const isToday = isSameDay(day, now());
    const disabled = isDayDisabled(day, this.props);
    const hasFocus = isSameDay(day, focus);

    return (
      <Button
        circle
        size={28}
        disabled={disabled}
        className={
          'md-datepicker__day' +
          `${(isSelected && ` md-datepicker__day--selected`) || ''}` +
          `${(hasFocus && ` md-datepicker__day--focus`) || ''}` +
          `${(isToday && ` md-datepicker__day--today`) || ''}` +
          `${(isOutsideMonth && ` md-datepicker__day--outside-month`) || ''}`
        }
        onClick={this.handleClick}
        ariaLabel={`${day.format("dddd, MMMM Do YYYY")}`}
        aria-selected={isSelected}
        tabIndex={-1}
      >
        <div aria-label={day.format("dddd, MMMM Do YYYY")}>
          {getDate(day)}
        </div>
      </Button>
    );
  }
}

DatePickerDay.contextTypes = {
  focus: PropTypes.instanceOf(moment),
  handleDayClick: PropTypes.func,
  selected: PropTypes.instanceOf(moment),
};

DatePickerDay.propTypes = {
  /** Required day that the DatePickerDay displays */
  day: PropTypes.instanceOf(moment).isRequired,
  /** Required month that the DatePickerDay displays */
  month: PropTypes.number.isRequired,
};

export default DatePickerDay;
