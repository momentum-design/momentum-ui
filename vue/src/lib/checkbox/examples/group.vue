<template>
  <md-checkbox-group
    name='CheckboxGroup1'
    :values="['me']"
    @change="onChange"
  >
    <md-checkbox
      value="me"
      label="me"
      htmlId="testCheckbox1"
    />
    <md-checkbox
      value="you"
      label="you"
      htmlId="testCheckbox2"
    />
    <md-checkbox
      value="us"
      label="us"
      htmlId="testCheckbox3"
    />
  </md-checkbox-group>
</template>

<script>
export default {
  name: 'ExampleCheckboxGroup',

  methods: {
    onChange(e) {}
  },
};
</script>

