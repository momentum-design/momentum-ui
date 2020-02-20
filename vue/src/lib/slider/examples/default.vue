<template>
  <div>
    <h5>Value: {{ value }}</h5>
    <md-slider
      :min="0"
      :max="500"
      :tick="100"
      :value="200"
      :step="1"
      @change="val => value = val"
    />
  </div>
</template>

<script>
export default {
  name: 'ExampleSliderDefault',

  data() {
    return {
      value: 200
    }
  },
};
</script>

