<template>
  <p :class="['md-input__help-text', className]">{{ message }}</p>
</template>

<script>
export default {
  name: 'md-input-helper',

  props: {
    /** @prop Optional css class name | '' */
    className: {
      type: String,
      default: ''
    },
    /** @prop Input help message for parent Input | null */
    message: {
      type: String,
      required: true
    }
  }
};
</script>
