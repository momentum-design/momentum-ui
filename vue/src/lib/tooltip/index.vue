<template>
  <md-popover
    :className="`md-tooltip ${$attrs.class}`"
    :popoverTrigger="tooltipTrigger"
    v-bind="popoverProps"
    showArrow
  >
    <span
      slot="content"
      class="md-tooltip__text"
      :style="{ width: `${width}px` }"
      v-html="tooltip"
    ></span>
    <slot></slot>
  </md-popover>
</template>

<script>
export default {
  name: 'md-tooltip',

  props: {
    /** @prop Optional object for Popover Component props | {} */
    popoverProps: {
      type: Object,
      default: _ => { return {} }
    },
    /** @prop Tooltip text | '' */
    tooltip: {
      type: String,
      default: ''
    },
    /** @prop Set the action which triggers the Tooltip | 'MouseEnter' */
    tooltipTrigger: {
      type: String,
      default: 'MouseEnter',
      validator: value => ['MouseEnter', 'Click', 'Focus'].indexOf(value) !== -1
    },
    /** @prop Set the Tooltip width | null */
    width: Number
  }
};
</script>
