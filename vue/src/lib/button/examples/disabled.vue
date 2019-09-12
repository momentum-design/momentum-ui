<template>
  <md-button ariaLabel="For the Win" :disabled="true" v-on:click="handleClick">Test Me</md-button>
</template>

<script>
export default {
  name: 'ExampleButtonDisabled',

  methods: {
    handleClick(evt) {},
  }
};
</script>

