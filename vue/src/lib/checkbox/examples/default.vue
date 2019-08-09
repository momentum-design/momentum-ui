<template>
  <md-checkbox
    value="test"
    label="test"
    htmlId="testCheckbox"
    @change="onChange"
  />
</template>

<script>
export default {
  name: 'ExampleCheckboxDefault',

  methods: {
    onChange(e) {}
  },
};
</script>

