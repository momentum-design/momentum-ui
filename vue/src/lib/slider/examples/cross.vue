<template>
  <div>
    <h5>Low: {{slider1.low}} High: {{slider1.high}}</h5>
    <md-slider
      canCross
      :min="0"
      :max="500"
      :tick="100"
      :value="slider1"
      :step="1"
      @change="val => slider1 = val"
    />
  </div>
</template>

<script>
export default {
  name: 'ExampleSliderCross',

  data() {
    return {
      slider1: { low: 100, high: 200 },
    };
  },
};
</script>
