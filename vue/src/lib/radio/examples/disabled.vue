<template>
  <md-radio
    value="disabledRadio"
    label="Disabled Radio"
    htmlId="disabledRadio"
    disabled
    @change="onChange"
  />
</template>

<script>
export default {
  name: 'ExampleRadioDisabled',

  methods: {
    onChange(e) {}
  },
};
</script>

