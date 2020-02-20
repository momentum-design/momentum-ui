<template>
  <div class="md-timepicker-container">
    <md-input
      label=""
      :name="inputId2"
      :id="inputId2"
      @change="() => {}"
      :value="timeString"
      @mousedown="onMouseDown"
      @focus="onFocus"
      ref="clickTextField"
      readOnly
    />
    <md-event-overlay
      v-if="isOpen"
      allowClickAway
      :anchorNode="anchorNode"
      @close="hidePopover"
      :isOpen="isOpen"
    >
      <md-time-picker-dropdown>
        <md-time-selector
          unit="h"
          min="0"
          :value="hourText"
          @wheel="onSelectWheel"
          ref="hour"
          inputRef="input"
          @keydown="onSelectKeyDown"
          @upclick="changeTime('h', 1)"
          @downclick="changeTime('h', -1)"
          :militaryTime="militaryTime"
        />
        :
        <md-time-selector
          unit="m"
          min="0"
          :value="minuteText"
          @wheel="onSelectWheel"
          ref="minute"
          inputRef="input"
          @keydown="onSelectKeyDown"
          @upclick="changeTime('m', minuteInterval)"
          @downclick="changeTime('m', -minuteInterval)"
        />
        <md-time-selector
          v-if="!militaryTime"
          unit="pre"
          :value="postText"
          ref="pre"
          inputRef="input"
          @keydown="onSelectKeyDown"
          @wheel="onSelectWheel"
          @upclick="changeTime('h', 12)"
          @downclick="changeTime('h', -12)"
        />
      </md-time-picker-dropdown>
    </md-event-overlay>
  </div>
</template>

<script>
import moment from 'moment';
import uniqueId from 'lodash/uniqueId';

export default {
  name: 'md-time-picker',

  data() {
    return {
      inputId2: this.inputId || uniqueId('md-timepicker__input-'),
      isOpen: false,
      selectedTime2: moment(this.selectedTime),
      activeIndex: null,
      anchorNode: null
    }
  },

  props: {
    /** @prop Set Input element ID | '' */
    inputId: {
      type: String,
      default: ''
    },
    /** @prop Choose to use military time | false */
    militaryTime: Boolean,
    /** @prop Determine the minute interval | 1 */
    minuteInterval: {
      type: Number,
      default: 1,
      validator: val => [1, 5, 15, 30, 60].indexOf(val) !== -1
    },
    /** @prop Set the initial selected time | null */
    selectedTime: Date,
  },

  computed: {
    selectedMoment() {
      return this.selectedTime2.locale(moment.locale());
    },

    timeString() {
      return this.militaryTime
        ? this.selectedMoment.format('HH:mm')
        : this.selectedMoment.format('LT');
    },

    hourText() {
      return this.selectedMoment.format(this.militaryTime ? 'HH' : 'hh');
    },

    minuteText() {
      return this.selectedMoment.format('mm');
    },

    postText() {
      return this.selectedMoment.format('A');
    },

  },

  watch: {
    isOpen(val) {
      if (val) {
        this.$nextTick(function() {
          this.focusOnNode(this.$refs.hour.$refs.input);
        })
      }
    }
  },

  methods: {
    // Jest does not handle DOM.focus(), this allows Jest to mock this function
    focusOnNode(node) {
      node.focus();
    },

    hidePopover() {
      this.isOpen = false;
    },

    onFocus() {
      this.isOpen = true;
      this.anchorNode = this.$refs.clickTextField.$vnode.elm;
    },

    onMouseDown() {
      this.isOpen = !this.isOpen,
      this.anchorNode = this.$refs.clickTextField.$vnode.elm;
    },

    triggerOnChange(dayChange) {
      this.$emit('change',
        this.selectedTime2.hour(),
        this.selectedTime2.minute(),
        dayChange
      );
    },

    changeTime(unit, change) {
      const newTime = moment(this.selectedTime2).add(change, unit);
      let dayChange = 0;

      if (change >= 0) {
        if (
          newTime
            .clone()
            .startOf('day')
            .isAfter(moment().startOf('day'))
        ) {
          newTime.add(-1, 'day');
          dayChange = 1;
        }
      } else {
        if (
          newTime
            .clone()
            .startOf('day')
            .isBefore(moment().startOf('day'))
        ) {
          newTime.add(1, 'day');
          dayChange = -1;
        }
      }

      this.selectedTime2 = newTime;
      this.triggerOnChange(dayChange);
    },

    setTime(hour, minute, pre) {
      const meridianHour =
        pre === 'PM' && parseInt(hour) < 12
          ? parseInt(hour) + 12
          : pre === 'AM' && parseInt(hour) === 12 ? 0 : hour;

      this.selectedTime2 = this.selectedTime2
          .clone()
          .hour(meridianHour)
          .minute(minute);
      this.triggerOnChange(0);
    },

    onSelectKeyDown(unit, e) {
      e.preventDefault();

      const { minuteInterval, militaryTime } = this.$props;
      const hour =
        !this.$refs.hour.currentValue && unit === 'h'
          ? militaryTime ? 0 : 1
          : this.$refs.hour.currentValue;
      const minute = !this.$refs.minute.currentValue && unit === 'm' ? 0 : this.$refs.minute.currentValue;
      const pre = !militaryTime && this.$refs.pre.currentValue;

      if ((e.keyCode === 65 || e.charCode === 65) && unit === 'pre') {
        if (this.$refs.pre.currentValue.includes('A')) return;

        return this.changeTime('h', 12);
      } else if ((e.keyCode === 80 || e.charCode === 80) && unit === 'pre') {
        if (this.$refs.pre.currentValue.includes('P')) return;

        return this.changeTime('h', 12);
      } else if (e.keyCode === 38 || e.charCode === 38) {
        if (unit === 'pre') return this.changeTime('h', 12);
        if (unit === 'h') return this.changeTime('h', 1);

        return this.changeTime(unit, minuteInterval);
      } else if (e.keyCode === 40 || e.charCode === 40) {
        if (unit === 'pre') return this.changeTime('h', -12);
        if (unit === 'h') return this.changeTime('h', -1);

        return this.changeTime(unit, -minuteInterval);
      } else {
        this.setTime(hour, minute, pre);
      }
    },

    onSelectWheel(unit, e) {
      if (e.deltaY < 0) {
        this.changeTime(unit, 1);
      } else if (e.deltaY > 0) {
        this.changeTime(unit, -1);
      }
      e.preventDefault();
    },

  },
};
</script>
