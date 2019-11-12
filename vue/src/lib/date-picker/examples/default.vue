<template>
  <span>
    <h4 class="columns">Selected Date: {{ date && date.toDateString() }}</h4>
    <md-date-picker @select="handleSelect">
      <md-button ariaLabel='DatePicker'>Pick a Date</md-button>
    </md-date-picker>
  </span>
</template>

<script>
export default {
  name: 'ExampleDatePickerDefault',

  data() {
    return {
      date: null
    }
  },

  methods: {
    handleSelect(e, date) {
      this.date = date;
    }
  },
};
</script>

