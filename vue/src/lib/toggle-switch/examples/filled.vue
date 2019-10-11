<template>
  <md-toggle-switch
    :checked="true"
    label="Toggle Switch"
    htmlId="testToggleSwitch2"
    @change="handleChange"
  />
</template>

<script>
export default {
  name: 'ExampleToggleSwitchFilled',

  methods: {
    handleChange(e) {}
  },
};
</script>
