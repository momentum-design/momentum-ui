import React from 'react';
import PropTypes from 'prop-types';
import DatePickerWeek from '@collab-ui/react/DatePicker/DatePickerWeek';
import {
  addWeeks,
  getMonth,
  getStartOfMonth,
  getStartOfWeek,
  isSameMonth,
} from '@collab-ui/react/DatePicker/date_utils';
import moment from 'moment';

class DatePickerMonth extends React.Component {
  static displayName = 'DatePickerMonth';

  renderWeeks = () => {
    const { day, ...otherProps } = this.props;

    let i = 0;
    let currentWeekStart = getStartOfWeek(
      getStartOfMonth(day.clone())
    );

    const weeks = [];
    const month = getMonth(day);

    do {
      weeks.push(
        <DatePickerWeek
          key={i++}
          day={currentWeekStart}
          month={month}
          {...otherProps}
        />
      );
      currentWeekStart = addWeeks(currentWeekStart.clone(), 1);

    } while(isSameMonth(currentWeekStart, day));

    return weeks;
  };


  render() {
    return (
      <div className='cui-datepicker__month'>
        {this.renderWeeks()}
      </div>
    );
  }
}

DatePickerMonth.propTypes = {
  day: PropTypes.instanceOf(moment).isRequired,
};

export default DatePickerMonth;
