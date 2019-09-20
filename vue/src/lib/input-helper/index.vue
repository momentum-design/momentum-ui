<template>
  <div class="md-input__help-text">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'md-input-helper',

  props: {
    /** @prop Input help message for parent Input | null */
    message: {
      type: String,
      required: true
    }
  }
};
</script>
