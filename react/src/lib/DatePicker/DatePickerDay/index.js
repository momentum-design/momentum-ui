import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@collab-ui/react';
import {
  getDate,
  getMonth,
  isDayDisabled,
  isSameDay,
  now,
} from '@collab-ui/react/utils/dateUtils';
import moment from 'moment';
import clsx from 'clsx';

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
          clsx('cui-datepicker__day', {
            [` cui-datepicker__day--selected`]: isSelected,
            [` cui-datepicker__day--focus`]: hasFocus,
            [` cui-datepicker__day--today`]: isToday,
            [` cui-datepicker__day--outside-month`]: isOutsideMonth
          })
        }
        onClick={this.handleClick}
        ariaLabel={`${getDate(day)}`}
        aria-selected={isSelected}
        tabIndex={-1}
      >
        {getDate(day)}
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
  /** @prop Required day that the DatePickerDay displays */
  day: PropTypes.instanceOf(moment).isRequired,
  /** @prop Required month that the DatePickerDay displays */
  month: PropTypes.number.isRequired,
};

export default DatePickerDay;
