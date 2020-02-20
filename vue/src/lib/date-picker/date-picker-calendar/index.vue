<script>
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
} from '../../utils/dateUtils.js';
import moment from 'moment';

export default {
  name: 'md-date-picker-calendar',

  data() {
    return {
      date: null,
    }
  },

  inject: {
    getFocus: {
      default: null
    },
    getSelected: {
      default: null
    },
    handleMonthChange: {
      default: null
    },
  },

  render(h) {
    const { date } = this.$data;
    const {
      locale,
      monthFormat,
      nextArialLabel,
      previousArialLabel,
      ...otherProps
    } = this.$props;

    const renderMonthName = () => {
      return (
        <div class='md-datepicker__navigation--current-month'>
          {localizeDate(date, locale).format(monthFormat)}
        </div>
      );
    };

    const renderPreviousMonthButton = () => {
      const { minDate } = this.$props;
      const allPrevDaysDisabled = shouldPrevMonthDisable(date, minDate);
      return (
        <md-icon
          ariaLabel={
            previousArialLabel === '' 
            ? 
            `previous month, ${subtractMonths(date.clone(), 1).format('MMMM')}` : previousArialLabel
          }
          disabled={allPrevDaysDisabled}
          onClick={this.decreaseMonth}
          name='arrow-left_16'
        />
      );
    };

    const renderNextMonthButton = () => {
      const { maxDate } = this.$props;
      const allNextDaysDisabled = shouldNextMonthDisable(date, maxDate);
      return (
        <md-icon
          ariaLabel={
            nextArialLabel === '' 
            ? 
            `next month, ${addMonths(date.clone(), 1).format('MMMM')}` : nextArialLabel
          }
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
            <div key={offset} class='md-datepicker__day--name'>
              {weekDayName}
            </div>
          );
        })
      );
    };

    const renderMonth = () => {
      return (
        <div class='md-datepicker__month-container'>
          <div class='md-datepicker__header'>
            <div class='md-datepicker__navigation'>
              {renderMonthName()}
              <div class='md-datepicker__navigation--buttons'>
                {renderPreviousMonthButton()}
                {renderNextMonthButton()}
              </div>
            </div>
            <div class='md-datepicker__day--names'>
              {header()}
            </div>
          </div>
          <md-date-picker-month
            day={date}
            {...{props: otherProps}}
            {...{attrs: this.$attrs}}
          />
        </div>
      );
    };

    return (
      <div>
        {date && renderMonth()}
      </div>
    );
  },

  props: {
    /** Set the focus on the current date being focused | null */
    focus: Object,
    /** Sets the language for the DatePickerCalendar | 'en' */
    locale: {
      type: String,
      default: 'en'
    },
    /** Sets the last date in which the calendar does not disable | null */
    maxDate: Date,
    /** Sets the first date in which the calendar does not disable | null */
    minDate: Date,
    /** Sets the format in how the Month is displayed | null */
    monthFormat: [String, Array],
    /** Text to display for blindness accessibility features | 'next' */
    nextArialLabel: {
      type: String,
      default: 'next'
    },
    /** Text to display for blindness accessibility features | 'previous' */
    previousArialLabel: {
      type: String,
      default: 'previous'
    },
  },

  mounted() {
    this.setDate(
      this.getFocus && this.getFocus() ||
      this.getSelected && this.getSelected() ||
      now()
    );
  },

  watch: {
    focus(val, oldVal) {
      if (
        oldVal &&
        !isSameDay(val, oldVal)
      ) {
        this.setDate(oldVal);
      }
    }
  },

  methods: {
    setDate(date, cb) {
      this.date = date;
      cb && cb();
    },

    increaseMonth(event) {
      const { date } = this.$data;
      this.setDate(
        addMonths(date.clone(), 1),
        () => this.handleMonthChange && this.handleMonthChange(event, this.$data.date)
      );
    },

    decreaseMonth(event) {
      const { date } = this.$data;
      this.setDate(
        subtractMonths(date.clone(), 1),
        () => this.handleMonthChange && this.handleMonthChange(event, this.$data.date)
      );
    },
  },
};
</script>
