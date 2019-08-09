<template>
  <md-radio-group name="RadioGroup1" value="you" @change="onChange">
    <md-radio
      value="me"
      label="me"
      htmlId="testRadio1"
    />
    <md-radio
      value="you"
      label="you"
      htmlId="testRadio2"
    />
    <md-radio
      value="us"
      label="us"
      htmlId="testRadio3"
    />
  </md-radio-group>
</template>

<script>
export default {
  name: 'ExampleRadioDefault',

  methods: {
    onChange(e) {}
  },
};
</script>

