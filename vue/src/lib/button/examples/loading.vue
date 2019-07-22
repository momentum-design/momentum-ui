<template>
  <md-button :ariaLabel="'For the Win'" :loading="true" v-on:click="handleClick">Test Me</md-button>
</template>

<script>
export default {
  name: 'ExampleButtonLoading',

  methods: {
    handleClick(evt) {},
  }
};
</script>

