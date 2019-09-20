<template>
  <fragment>
    <div
      v-if="percentageIsNumber"
      class="md-spinner-progress"
      :class="[
        `md-spinner-progress__percentage-${percentageRound}`,
        size && `md-spinner-progress--${size}` || '',
        color && `md-spinner-progress--${color}` || ''
      ]"
    >
      <div class="md-spinner-progress__circle">
        <div class="md-spinner-progress__mask md-spinner-progress__full">
          <div class="md-spinner-progress__fill"/>
        </div>
        <div class="md-spinner-progress__mask md-spinner-progress__half">
          <div class="md-spinner-progress__fill"/>
          <div class="md-spinner-progress__fill md-spinner-progress__fix"/>
        </div>
        <div
          class="md-spinner-progress__inset-circle"
          :class="showCheck && percentage === 100 && 'md-spinner-progress__inset-circle--check' || ''"
        >
          <div v-if="size === 36 && showPercentage && !showCheck" class="md-spinner-progress__percentage">
            {{ percentageRound }}
          </div>
        </div>
      </div>
    </div>
    <i
      v-if="!percentageIsNumber"
      class="md-spinner"
      :class="[
        size && `md-spinner--${size}` || '',
        color && `md-spinner--${color}` || ''
      ]"
    />
  </fragment>
</template>

<script>
import isNumber from 'lodash/isNumber';
import round from 'lodash/round';
import { Fragment } from 'vue-fragment'

export default {
  name: 'md-spinner',

  components: { Fragment },

  props: {
    /** @prop Set Spinner color | 'black' */
    color: {
      type: String,
      default: 'black'
    },
    /** @prop Show percentage value for progress on Spinner | null */
    percentage: Number,
    /** @prop Show the check mark if percentage 100 | false */
    showCheck: Boolean,
    /** @prop Show the number value for progress on Spinner | false */
    showPercentage: Boolean,
    /** @prop Spinner size | 36 */
    size: {
      type: Number,
      default: 36,
      validator: value => [16, 20, 28, 36].indexOf(value) !== -1
    },
  },

  computed: {
    percentageIsNumber() {
      return isNumber(this.percentage);
    },
    percentageRound() {
      return round(this.percentage);
    },
  },

  mounted() {
    if (this.size !== 36 && this.percentageIsNumber) {
      /* eslint-disable no-console */
      console.warn('[@momentum-ui/vue] Spinner: Percentage will not be shown for sizes smaller than 36');
      /* eslint-enable no-console */
    }
  },
};
</script>
