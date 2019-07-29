<template>
  <md-input
    name="clearInput"
    label="Input with clear"
    htmlId="clearInput"
    inputSize="small-5"
    placeholder="Placeholder Text"
    :value="value"
    @change="handleChange"
    :clear="true"
  />
</template>

<script>
export default {
  name: 'ExampleInputClear',

  data() {
    return {
      value: 'Press or click the clear icon to clear this input'
    }
  },

  methods: {
    handleChange(e){
      this.value = e.target.value;
    },
  },
};
</script>
