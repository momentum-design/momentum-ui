<template>
  <div
    class="md-composite-avatar"
    :class="size && `md-composite-avatar--${size}`"
  ><slot></slot></div>
</template>

<script>
export default {
  name: 'md-composite-avatar',

  props: {
    /** @prop Sets the size of the CompositeAvatar | 'medium' */
    size: {
      type: [Number, String],
      default: 'medium',
      validator: val => ['small', 'medium', 'large', 28, 40, 84, 135].indexOf(val) !== -1
    },

  }
};
</script>
