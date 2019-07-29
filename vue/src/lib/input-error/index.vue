<template>
  <div class="md-input__messages" role="alert">
    <div class="message">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'md-input-error',

  props: {
    /** @prop Error message for InputError component */
    error: {
      type: String,
      required: true
    }
  }
};
</script>
