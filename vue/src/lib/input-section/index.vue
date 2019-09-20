<template>
  <span :class="`md-input__${position}`">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'md-input-section',

  props: {
    /** @prop Determine the InputSection's position | 'before' */
    position: {
      type: String,
      default: 'before',
      validator: value => ['before', 'after'].indexOf(value) !== -1
    },
  }
};
</script>
