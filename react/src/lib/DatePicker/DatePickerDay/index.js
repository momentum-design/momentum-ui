import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@momentum-ui/react';
import DatePickerContext from '@momentum-ui/react/DatePickerContext';
import {
  getDate,
  getMonth,
  isDayDisabled,
  isSameDay,
  now,
} from '@momentum-ui/react/utils/dateUtils';
import mapContextToProps from 'react-context-toolbox/mapContextToProps';
import moment from 'moment';

class DatePickerDay extends React.Component {
  static displayName = 'DatePickerDay';

  constructor(props) {
    super(props);
    this.dayButton = React.createRef();
  }

  componentDidUpdate = () => {
    const { day, focus } = this.props;

    isSameDay(day, focus) && this.dayButton.current.button.focus();
  }

  handleClick = e => {
    const { handleDayClick, day } = this.props;
    return (
      handleDayClick
      && handleDayClick(e, day)
    );
  };

  render() {
    const { selected, focus, day, month } = this.props;

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
        ariaLabel={`${day.format("D, dddd MMMM YYYY")}`}
        aria-selected={isSelected}
        tabIndex={-1}
        ref={this.dayButton}
      >
        <div aria-hidden="true">
          {getDate(day)}
        </div>
      </Button>
    );
  }
}

DatePickerDay.propTypes = {
  /** Required day that the DatePickerDay displays */
  day: PropTypes.instanceOf(moment).isRequired,
  // Internal Context Use Only
  focus: PropTypes.instanceOf(moment),
  // Internal Context Use Only
  handleDayClick: PropTypes.func,
  /** Required month that the DatePickerDay displays */
  month: PropTypes.number.isRequired,
  // Internal Context Use Only
  selected: PropTypes.instanceOf(moment),
};

export default mapContextToProps(
  DatePickerContext,
  context => context,
  DatePickerDay
);
