<template>
  <div style="background-color: #000; padding: 5px; width: fit-content;">
    <md-icon name="clear-active_12" type="white" ariaLabel="Clear" @click="handleClick" />
    <md-icon name="clear-active_16" type="white" ariaLabel="Clear" @click="handleClick" />
    <md-icon name="clear-active_20" type="white" ariaLabel="Clear" @click="handleClick" />
    <md-icon name="clear-active_32" type="white" ariaLabel="Clear" @click="handleClick" />
  </div>
</template>

<script>
export default {
  name: 'ExampleIconWhite',

  methods: {
    handleClick(e) {
       alert('Icon - clicked');
    },
  }
};
</script>

