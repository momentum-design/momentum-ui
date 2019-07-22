<template>
  <div
    class="md-badge"
    :class="[
      'md-badge--' + color,
      {'md-badge--round': rounded}
    ]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'md-badge',
  props: {
    rounded: {
      type: Boolean,
      default: false
    },
    color: String
  }
};
</script>
