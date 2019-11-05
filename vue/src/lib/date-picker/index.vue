<script>
import {
  addDays,
  addWeeks,
  isDayDisabled,
  isSameDay,
  subtractDays,
  subtractWeeks,
} from '../utils/dateUtils.js';
import moment from 'moment';
import assign from 'lodash/assign';
import omit from 'lodash/omit';

export default {
  name: 'md-date-picker',

  data() {
    return {
      focus: null,
      isOpen: false,
      selected: null,
    }
  },

  provide () {
    return {
      getFocus: () => this.focus,
      getSelected: () => this.selected,
      handleDayClick: (event, date) => this.handleSelect(event, date),
      handleMonthChange: (event, date) => { this.$emit('monthChange', event, date.toDate()); },
    }
  },

  render(h) {
    const {
      direction,
      isDynamic,
      showArrow,
      ...props
    } = this.$props;

    const { selected, focus, isOpen } = this.$data;

    const trigger = this.$slots.default && this.$slots.default[0];
    const nativeOn = {
      click: this.handleInputClick,
      keydown: this.handleInputKeyDown
    };
    const attrs = {
      ref: 'trigger'
    };
    if (trigger && trigger.data) {
      trigger.data.on = {};
      trigger.data.nativeOn = {};
      assign(trigger.data.attrs, attrs);
      assign(trigger.data.on, nativeOn);
      assign(trigger.data.nativeOn, nativeOn);
    }

    const otherProps = omit({...props}, ['shouldCloseOnSelect']);

    const calendar = (
      <md-date-picker-calendar
        focus={focus}
        selected={selected}
        {...{props: otherProps}}
      />
    );

    const content = (
      <md-event-overlay
        allowClickAway={true}
        isOpen={isOpen}
        anchorNode={trigger.elm}
        onClose={() => this.setOpen(false)}
        direction={direction}
        showArrow={showArrow}
        isDynamic={isDynamic}
      >
        {calendar}
      </md-event-overlay>
    );

    return (
      <div class='md-datepicker-container'>
        {trigger}
        {isOpen && content}
      </div>
    );
  },

  props: {
    /** @prop Set the direction in which the DatePicker opens | 'bottom-center' */
    direction: String,
    /** @prop Function to filter Dates | null */
    filterDate: Function,
    /** @prop Sets the DatePicker md-event-overlay to be dynamic | true */
    isDynamic: {
      type: Boolean,
      default: true
    },
    /** @prop Sets the language of the DatePicker | 'en' */
    locale: {
      type: String,
      default: 'en'
    },
    /** @prop Sets the last date in which the DatePicker does not disable | null */
    maxDate: Date,
    /** @prop Sets the first date in which the DatePicker does not disable | null */
    minDate: Date,
    /** @prop Sets the format of the month | 'MMMM YYYY' */
    monthFormat: {
      type: String,
      default: 'MMMM YYYY'
    },
    /** @prop Text to display for blindness accessibility features | 'next' */
    nextArialLabel: {
      type: String,
      default: 'next'
    },
    /** @prop Text to display for blindness accessibility features | 'previous' */
    previousArialLabel: {
      type: String,
      default: 'previous'
    },
    /** @prop Initial Selected Date for DatePicker | moment().toDate()  */
    selectedDate: {
      type: Date,
      default: () => moment().toDate()
    },
    /** @prop Determines if the DatePicker should close when a date is selected | true */
    shouldCloseOnSelect: {
      type: Boolean,
      default: true
    },
    /** @prop Determines if the DatePicker should show the open/close arrow | false */
    showArrow: Boolean,
  },

  mounted() {
    const selectedDate = moment(this.selectedDate);
    const isValid =
      selectedDate.isValid()
      && !isDayDisabled(selectedDate, this.$props);

    isValid && this.setPreSelection(selectedDate);
    isValid && this.setSelected(selectedDate);
  },

  watch: {
    selectedDate(val, oldVal) {
      const selectedDate = moment(val);
      const prevSelectedDate = moment(oldVal);
      const isValid =
        selectedDate.isValid()
        && !isDayDisabled(selectedDate, this.$props);
      if(
        isValid
        && !isSameDay(prevSelectedDate, selectedDate)
      ) {
        this.setSelected(selectedDate);
        this.setPreSelection(selectedDate);
      }
    }
  },

  methods: {
    setOpen(open) {
      this.isOpen = open;
    },

    handleSelect(event, date){
      const { shouldCloseOnSelect } = this.$props;
      this.setPreSelection(date, event);
      this.setSelected(date, event);
      shouldCloseOnSelect && this.setOpen(false);
    },

    setSelected(date, event) {
      if (!isDayDisabled(date, this.$props)) {
        this.selected = date;
        this.$emit('select', event, date.toDate());
      }
    },

    setPreSelection(date, event) {
      if (!isDayDisabled(date, this.$props)) {
        this.focus = date;
        this.$emit('change', event, date.toDate());
      }
    },

    handleInputClick() {
      this.setOpen(true);
    },

    handleInputKeyDown(event) {
      const { focus, isOpen } = this.$data;

      let flag = false;
      const copy = moment(focus);

      switch (!event.shiftKey && event.which) {
        case 32:
        case 13:
          if(!isOpen) {
            this.handleInputClick();
          } else if (
            moment.isMoment(focus) ||
            moment.isDate(focus)
          ) {
            this.handleSelect(event, copy);
          }
          flag = true;
          break;

        case 38: //up
          this.setPreSelection(subtractWeeks(copy, 1));
          flag = true;
          break;
        case 37:// left
          this.setPreSelection(subtractDays(copy, 1));
          flag = true;
          break;

        case 39: //right
          this.setPreSelection(addDays(copy, 1));
          flag = true;
          break;

        case 40: //bottom
          this.setPreSelection(addWeeks(copy, 1));
          flag = true;
          break;

        default:
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    },
  },
};
</script>
