<template>
  <md-button :ariaLabel="'For the Win'" :tag="'a'" v-on:click="handleClick">Link</md-button>
</template>

<script>
export default {
  name: 'ExampleButtonTag',

  methods: {
    handleClick(evt) {},
  }
};
</script>

