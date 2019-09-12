<template>
  <div
    class="md-alert__container"
    :class="[`md-alert__container--${position}`]"
    role="alert"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'md-alert-container',

  props: {
    /** @prop Define alert's position with css class name | 'bottom-right' */
    position: {
      type: String,
      default: 'bottom-right',
      validator: (value) => [
          'top-left',
          'top-center',
          'top-right',
          'bottom-left',
          'bottom-center',
          'bottom-right',
        ].indexOf(value) !== -1
    }
  }
};
</script>
