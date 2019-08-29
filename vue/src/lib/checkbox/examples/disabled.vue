<template>
  <md-checkbox
    value="disabledChecked"
    label="Disabled Checkbox"
    htmlId="disabledCheckbox"
    @change="onChange"
    disabled
  />
</template>

<script>
export default {
  name: 'ExampleCheckboxDisabled',

  methods: {
    onChange(e) {}
  },
};
</script>

