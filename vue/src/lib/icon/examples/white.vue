<template>
  <div style="background-color: #000; padding: 5px; width: fit-content;">
    <md-icon
      name="clear-active_24"
      ariaLabel="Clear"
      type="white"
      @click="handleClick"
    />
  </div>
</template>

<script>
export default {
  name: 'ExampleIconWhite',

  methods: {
    handleClick(e) {
       alert('Icon 36 - clicked');
    },
  }
};
</script>

