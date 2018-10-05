import React from 'react';
import PropTypes from 'prop-types';
import DatePickerDay from '@collab-ui/react/DatePicker/DatePickerDay';
import { addDays, getStartOfWeek } from '@collab-ui/react/utils/dateUtils';
import moment from 'moment';

class DatePickerWeek extends React.PureComponent {
  static displayName = 'DatePickerWeek';

  render() {
    const { day, ...otherProps } = this.props;

    const renderDays = () => {
      const startOfWeek = getStartOfWeek(day.clone());

      const days = [0, 1, 2, 3, 4, 5, 6].map(offset => {
        const day = addDays(startOfWeek.clone(), offset);
        return (
          <DatePickerDay
            key={offset}
            day={day}
            {...otherProps}
          />
        );
      });

      return days;
    };

    return (
      <div className="cui-datepicker__week">
        {renderDays()}
      </div>
    );
  }
}

DatePickerWeek.propTypes = {
  /** Required day for the DatePickerWeek */
  day: PropTypes.instanceOf(moment).isRequired,
};

export default DatePickerWeek;
