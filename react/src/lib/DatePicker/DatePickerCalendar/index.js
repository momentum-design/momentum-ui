import React from 'react';
import PropTypes from 'prop-types';
import DatePickerMonth from '@collab-ui/react/DatePicker/DatePickerMonth';
import { Icon }  from '@collab-ui/react';
import {
  addDays,
  addMonths,
  getLocaleData,
  getStartOfWeek,
  getWeekdayMinInLocale,
  isSameDay,
  localizeDate,
  now,
  shouldNextMonthDisable,
  shouldPrevMonthDisable,
  subtractMonths,
} from '@collab-ui/react/utils/dateUtils';
import moment from 'moment';

class DatePickerCalendar extends React.Component {
  static displayName = 'DatePickerCalendar';

  state = {
    date: null,
  };

  componentDidMount () {
    const { focus, selected } = this.context;
    this.setDate(focus || selected || now());
  }

  componentDidUpdate (prevProps, prevState, prevContext) {
    const { focus } = this.context;
    if (
      focus &&
      !isSameDay(prevContext.focus, focus)
    ) {
      this.setDate(focus);
    }
  }

  setDate = (date, cb) => {
    this.setState({
      date
    }, cb);
  };

  increaseMonth = event => {
    const { handleMonthChange } = this.context;
    const { date } = this.state;
    this.setDate(
      addMonths(date.clone(), 1),
      () => handleMonthChange && handleMonthChange(event, this.state.date)
    );
  };

  decreaseMonth = event => {
    const { handleMonthChange } = this.context;
    const { date } = this.state;
    this.setDate(
      subtractMonths(date.clone(), 1),
      () => handleMonthChange && handleMonthChange(event, this.state.date)
    );
  };

  render() {

    const { date } = this.state;
    const {
      locale,
      monthFormat,
      nextArialLabel,
      previousArialLabel,
      ...otherProps
    } = this.props;

    const renderMonthName = () => {
      return (
        <div className='cui-datepicker__navigation--current-month'>
          {localizeDate(date, locale).format(monthFormat)}
        </div>
      );
    };

    const renderPreviousMonthButton = () => {
      const { minDate } = this.props;
      const allPrevDaysDisabled = shouldPrevMonthDisable(date, minDate);
      return (
        <Icon
          ariaLabel={previousArialLabel}
          disabled={allPrevDaysDisabled}
          onClick={this.decreaseMonth}
          name='arrow-left_16'
        />
      );
    };

    const renderNextMonthButton = () => {
      const { maxDate } = this.props;
      const allNextDaysDisabled = shouldNextMonthDisable(date, maxDate);

      return (
        <Icon
          ariaLabel={nextArialLabel}
          disabled={allNextDaysDisabled}
          onClick={this.increaseMonth}
          name='arrow-right_16'
        />
      );
    };

    const header = () => {
      const startOfWeek = getStartOfWeek(date.clone());
      const dayNames = [];
      return dayNames.concat(
        [0, 1, 2, 3, 4, 5, 6].map(offset => {
          const day = addDays(localizeDate(startOfWeek, locale), offset);
          const localeData = getLocaleData(day);
          const weekDayName = getWeekdayMinInLocale(localeData, day);
          return (
            <div key={offset} className='cui-datepicker__day--name'>
              {weekDayName}
            </div>
          );
        })
      );
    };

    const renderMonth = () => {
      return (
        <div className='cui-datepicker__month-container'>
          <div className='cui-datepicker__header'>
            <div className='cui-datepicker__navigation'>
              {renderMonthName()}
              <div className='cui-datepicker__navigation--buttons'>
                {renderPreviousMonthButton()}
                {renderNextMonthButton()}
              </div>
            </div>
            <div className='cui-datepicker__day--names'>
              {header()}
            </div>
          </div>
          <DatePickerMonth
            day={date}
            {...otherProps}
          />
        </div>
      );
    };

    return (
      <div>
        {date && renderMonth()}
      </div>
    );
  }
}

DatePickerCalendar.contextTypes = {
  focus: PropTypes.instanceOf(moment),
  handleMonthChange: PropTypes.func,
  selected: PropTypes.instanceOf(moment),
};

DatePickerCalendar.propTypes = {
  /** @prop Sets the language for the DatePickerCalendar | 'en' */
  locale: PropTypes.string,
  /** @prop Sets the last date in which the calendar does not disable | null */
  maxDate: PropTypes.instanceOf(Date),
  /** @prop Sets the first date in which the calendar does not disable | null */
  minDate: PropTypes.instanceOf(Date),
  /** @prop Sets the format in how the Month is displayed | null */
  monthFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  /** @prop Text to display for blindness accessibility features | 'next' */
  nextArialLabel: PropTypes.string,
  /** @prop Text to display for blindness accessibility features | 'previous' */
  previousArialLabel: PropTypes.string,
};

DatePickerCalendar.defaultProps = {
  locale: 'en',
  maxDate: null,
  minDate: null,
  monthFormat: 'MMMM YYYY',
  nextArialLabel: 'next',
  previousArialLabel: 'previous',
};

export default DatePickerCalendar;
