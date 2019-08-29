<template>
  <md-checkbox
    value="indeterminate"
    label="Indeterminate Checkbox"
    htmlId="indeterminateCheckbox"
    @change="onChange"
    indeterminate
  />
</template>

<script>
export default {
  name: 'ExampleCheckboxIndeterminate',

  methods: {
    onChange(e) {}
  },
};
</script>

