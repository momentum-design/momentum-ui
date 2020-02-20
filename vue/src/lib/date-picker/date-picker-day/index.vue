<template>
  <md-button
    circle
    :size="28"
    :disabled="disabled"
    class="md-datepicker__day"
    :class="{
      'md-datepicker__day--selected': isSelected,
      'md-datepicker__day--focus': hasFocus,
      'md-datepicker__day--today': isToday,
      'md-datepicker__day--outside-month': isOutsideMonth
    }"
    @click="handleClick"
    :ariaLabel="`${day.format('dddd, MMMM Do YYYY')}`"
    :aria-selected="isSelected"
    tabindex="-1"
  >
    <div :aria-label="day.format('dddd, MMMM Do YYYY')">
      {{ getDate(day) }}
    </div>
  </md-button>
</template>

<script>
import {
  getDate,
  getMonth,
  isDayDisabled,
  isSameDay,
  now,
} from '../../utils/dateUtils.js';
import moment from 'moment';

export default {
  name: 'md-date-picker-day',

  inject: {
    getFocus: {
      default: null
    },
    getSelected: {
      default: null
    },
    handleDayClick: {
      default: null
    },
  },

  props: {
    /** Required day that the DatePickerDay displays */
    day: {
      type: Object,
      required: true
    },
    /** @prop Function to filter Dates | null */
    filterDate: Function,
    /** Required month that the DatePickerDay displays */
    month: {
      type: Number,
      required: true
    },
  },

  computed: {
    isOutsideMonth() {
      return this.month !== getMonth(this.day);
    },
    isSelected() {
      return this.getSelected ? isSameDay(this.day, this.getSelected()) : false;
    },
    isToday() {
      return isSameDay(this.day, now());
    },
    disabled() {
      return isDayDisabled(this.day, this.$props);
    },
    hasFocus() {
      return this.getFocus ? isSameDay(this.day, this.getFocus()) : false;
    },
  },

  methods: {
    handleClick(e) {
      return (
        this.handleDayClick
        && this.handleDayClick(e, this.day)
      );
    },

    getDate(day) {
      return getDate(day);
    }
  },
};
</script>
