import React from 'react';
import PropTypes from 'prop-types';
import DatePickerMonth from '@momentum-ui/react/DatePicker/DatePickerMonth';
import { Icon }  from '@momentum-ui/react';
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
} from '@momentum-ui/react/utils/dateUtils';
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

  componentDidUpdate (prevProps) {
    const { focus } = prevProps;
    if (
      focus &&
      !isSameDay(this.props.focus, focus)
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
        <div className='md-datepicker__navigation--current-month'>
          {localizeDate(date, locale).format(monthFormat)}
        </div>
      );
    };

    const renderPreviousMonthButton = () => {
      const { minDate } = this.props;
      const allPrevDaysDisabled = shouldPrevMonthDisable(date, minDate);
      return (
        <Icon
          ariaLabel={`${previousArialLabel} month, ${subtractMonths(date.clone(), 1).format("MMMM")}`}
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
          ariaLabel={`${nextArialLabel} month, ${addMonths(date.clone(), 1).format("MMMM")}`}
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
            <div key={offset} className='md-datepicker__day--name'>
              {weekDayName}
            </div>
          );
        })
      );
    };

    const renderMonth = () => {
      return (
        <div className='md-datepicker__month-container'>
          <div className='md-datepicker__header'>
            <div className='md-datepicker__navigation'>
              {renderMonthName()}
              <div className='md-datepicker__navigation--buttons'>
                {renderPreviousMonthButton()}
                {renderNextMonthButton()}
              </div>
            </div>
            <div className='md-datepicker__day--names'>
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
  /** Set the focus on the current date being focused | null */
  focus: PropTypes.instanceOf(moment),
  /** Sets the language for the DatePickerCalendar | 'en' */
  locale: PropTypes.string,
  /** Sets the last date in which the calendar does not disable | null */
  maxDate: PropTypes.instanceOf(Date),
  /** Sets the first date in which the calendar does not disable | null */
  minDate: PropTypes.instanceOf(Date),
  /** Sets the format in how the Month is displayed | null */
  monthFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  /** Text to display for blindness accessibility features | 'next' */
  nextArialLabel: PropTypes.string,
  /** Text to display for blindness accessibility features | 'previous' */
  previousArialLabel: PropTypes.string,
};

DatePickerCalendar.defaultProps = {
  focus: null,
  locale: 'en',
  maxDate: null,
  minDate: null,
  monthFormat: 'MMMM YYYY',
  nextArialLabel: 'next',
  previousArialLabel: 'previous',
};

export default DatePickerCalendar;
