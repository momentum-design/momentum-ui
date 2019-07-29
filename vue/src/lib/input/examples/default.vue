<template>
  <md-input
    name="defaultInput"
    label="Default Input"
    htmlId="defaultInput"
    inputSize="small-5"
    ariaLabel="input1"
    placeholder="Placeholder Text"
    @change="changeHandler"
    @focus="focusHandler"
    @doneediting="doneEditingHandler"
    @input="inputHandler"
    @keydown="keydownHandler"
    @mousedown="mousedownHandler"
  />
</template>

<script>
export default {
  name: 'ExampleInputDefault',

  methods: {
    changeHandler(e){},
    focusHandler(e){},
    doneEditingHandler(e){},
    inputHandler(e){},
    keydownHandler(e){},
    mousedownHandler(e){},
  },
};
</script>
