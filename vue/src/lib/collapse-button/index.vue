<template>
  <md-button
    :ariaLabel="collapse ? 'expand' : 'collapse'"
    class="md-collapse-button"
    :class="`md-collapse-button--${alignment}`"
    @click="handleClick"
  >
    <md-icon :name="getIconName()"/>
  </md-button>
</template>

<script>
export default {
  name: 'md-collapse-button',

  props: {
    /** @prop Sets the positioning of the CollapseButton | 'left' */
    alignment: {
      type: String,
      default: 'left',
      validator: val => ['left', 'right', 'top', 'bottom'].indexOf(val) !== -1
    },
    /** @prop Sets the collapse css styling | true */
    collapse: {
      type: Boolean,
      default: true
    },
  },

  methods: {
    getIconName() {
      return this.collapse ? 'panel-control-right_12' : 'panel-control-left_12';
    },

    handleClick(e) {
      this.$emit('click', e);
    },
  },
};
</script>
