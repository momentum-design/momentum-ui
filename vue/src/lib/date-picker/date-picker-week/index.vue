<script>
import { addDays, getStartOfWeek } from '../../utils/dateUtils.js';
import moment from 'moment';

export default {
  name: 'md-date-picker-week',

  render(h) {
    const { day, month, ...otherProps } = this.$props;

    const renderDays = () => {
      const startOfWeek = getStartOfWeek(day.clone());

      const days = [0, 1, 2, 3, 4, 5, 6].map(offset => {
        const day = addDays(startOfWeek.clone(), offset);
        return (
          <md-date-picker-day
            key={offset}
            day={day}
            month={month}
            {...{props: otherProps}}
            {...{attrs: this.$attrs}}
          />
        );
      });

      return days;
    };

    return (
      <div class="md-datepicker__week">
        {renderDays()}
      </div>
    );
  },

  props: {
    /** Required day for the DatePickerWeek */
    day: {
      type: Object,
      required: true
    },
    /** Required month that the DatePickerDay displays */
    month: {
      type: Number,
      required: true
    },
  },
};
</script>
