<template>
  <md-button :ariaLabel="'For the Win'" :color="'blue'" v-on:click="handleClick">Test Me</md-button>
</template>

<script>
export default {
  name: 'ExampleButtonColor',

  methods: {
    handleClick(evt) {},
  }
};
</script>

