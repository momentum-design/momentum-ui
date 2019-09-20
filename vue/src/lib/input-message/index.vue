<template>
  <div class="md-input__message" role="alert">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'md-input-message',

  props: {
    /** @prop message message for InputMessage component */
    message: {
      type: String,
      required: true
    }
  }
};
</script>
