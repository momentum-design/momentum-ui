<script>
import {
  addWeeks,
  getMonth,
  getStartOfMonth,
  getStartOfWeek,
  isSameMonth,
} from '../../utils/dateUtils.js';
import moment from 'moment';

export default {
  name: 'md-date-picker-month',

  render(h) {
    const renderWeeks = () => {
      const { day, ...otherProps } = this.$props;

      let i = 0;
      let currentWeekStart = getStartOfWeek(
        getStartOfMonth(day.clone())
      );

      const weeks = [];
      const month = getMonth(day);

      do {
        weeks.push(
          <md-date-picker-week
            key={i++}
            day={currentWeekStart}
            month={month}
            {...{props: otherProps}}
            {...{attrs: this.$attrs}}
          />
        );
        currentWeekStart = addWeeks(currentWeekStart.clone(), 1);

      } while(isSameMonth(currentWeekStart, day));

      return weeks;
    };

    return (
      <div class="md-datepicker__month">
        {renderWeeks()}
      </div>
    );
  },

  props: {
    /** Required day for the DatePickerMonth */
    day: {
      type: Object,
      required: true
    },
  },

};
</script>
