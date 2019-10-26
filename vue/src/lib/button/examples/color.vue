<template>
  <div>
    <md-button ariaLabel="For the Win" :color="'blue'" v-on:click="handleClick">Test Me</md-button>
    <md-button ariaLabel="For the Win" :color="'red'" v-on:click="handleClick">Test Me</md-button>
    <md-button ariaLabel="For the Win" :color="'green'" v-on:click="handleClick">Test Me</md-button>
    <md-button ariaLabel="For the Win" :color="'yellow'" v-on:click="handleClick">Test Me</md-button>
    <md-button ariaLabel="For the Win" :color="'purple'" v-on:click="handleClick">Test Me</md-button>
    <md-button ariaLabel="For the Win" :color="'cyan'" v-on:click="handleClick">Test Me</md-button>
    <md-button ariaLabel="For the Win" :color="'orange'" v-on:click="handleClick">Test Me</md-button>
  </div>
</template>

<script>
export default {
  name: 'ExampleButtonColor',

  methods: {
    handleClick(evt) {},
  }
};
</script>

