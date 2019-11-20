import React from 'react';
import PropTypes from 'prop-types';
import DatePickerContext from '@momentum-ui/react/DatePickerContext';
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
import mapContextToProps from 'react-context-toolbox/mapContextToProps';
import moment from 'moment';

class DatePickerCalendar extends React.Component {
  static displayName = 'DatePickerCalendar';

  constructor(props) {
    super(props);
    this.state = {
      date: null,
    };
    this.nextMonthRef = React.createRef();
    this.prevMonthRef = React.createRef();
  }

  componentDidMount () {
    const { focus, selected } = this.props;
    this.setDate(focus || selected || now());
  }

  componentDidUpdate (prevProps) {
    const { focus, monthNavFocus } = prevProps;
    if (
      focus &&
      !isSameDay(this.props.focus, focus)
    ) {
      this.setDate(focus);
    } 
    if (monthNavFocus !== this.props.monthNavFocus) {
      this.props.monthNavFocus === 'prev' && this.prevMonthRef.button.focus();
      this.props.monthNavFocus === 'next' && this.nextMonthRef.button.focus();
    }
  }

  setDate = (date, cb) => {
    this.setState({
      date
    }, cb);
  };

  increaseMonth = event => {
    const { handleMonthChange } = this.props;
    const { date } = this.state;
    this.setDate(
      addMonths(date.clone(), 1),
      () => handleMonthChange && handleMonthChange(event, this.state.date)
    );
  };

  decreaseMonth = event => {
    const { handleMonthChange } = this.props;
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
          ariaLabel={
            !previousArialLabel 
            ? 
            `previous month, ${subtractMonths(date.clone(), 1).format('MMMM')}` : previousArialLabel
          }
          disabled={allPrevDaysDisabled}
          onClick={this.decreaseMonth}
          name='arrow-left_16'
          buttonProps={{ref: ref => this.prevMonthRef = ref}}
          tabIndex={-1}
        />
      );
    };

    const renderNextMonthButton = () => {
      const { maxDate } = this.props;
      const allNextDaysDisabled = shouldNextMonthDisable(date, maxDate);
      return (
        <Icon
          ariaLabel={
            !nextArialLabel 
            ? 
            `next month, ${addMonths(date.clone(), 1).format('MMMM')}` : nextArialLabel
          }
          disabled={allNextDaysDisabled}
          onClick={this.increaseMonth}
          name='arrow-right_16'
          buttonProps={{ref: ref => this.nextMonthRef = ref}}
          tabIndex={-1}
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

DatePickerCalendar.propTypes = {
  // Internal Context Use Only
  focus: PropTypes.instanceOf(moment),
  // Internal Context Use Only
  handleMonthChange: PropTypes.func,
  /** Sets the language for the DatePickerCalendar | 'en' */
  locale: PropTypes.string,
  /** Sets the last date in which the calendar does not disable | null */
  maxDate: PropTypes.instanceOf(Date),
  /** Sets the first date in which the calendar does not disable | null */
  minDate: PropTypes.instanceOf(Date),
  /** Sets the format in how the Month is displayed | null */
  monthFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  /** Sets which arrow button for the month navigation should have focus */
  monthNavFocus: PropTypes.string,
  /** Text to display for blindness accessibility features | 'next' */
  nextArialLabel: PropTypes.string,
  /** Text to display for blindness accessibility features | 'previous' */
  previousArialLabel: PropTypes.string,
  // Internal Context Use Only
  selected: PropTypes.instanceOf(moment),
};

DatePickerCalendar.defaultProps = {
  focus: null,
  handleMonthChange: null,
  locale: 'en',
  maxDate: null,
  minDate: null,
  monthFormat: 'MMMM YYYY',
  monthNavFocus: 'prev',
  nextArialLabel: '',
  previousArialLabel: '',
  Selected: null,
};

export default mapContextToProps(
  DatePickerContext,
  context => context,
  DatePickerCalendar
);
