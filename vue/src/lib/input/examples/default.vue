<template>
  <div>
      <div class="row">
        <md-input
          name="defaultInput"
          label="Default Input"
          htmlId="defaultInput"
          containerSize="medium-6"
          placeholder="Placeholder Text"
          @change="changeHandler"
          @focus="focusHandler"
          @doneediting="doneEditingHandler"
          @input="inputHandler"
          @keydown="keydownHandler"
          @mousedown="mousedownHandler"
        />
      </div>
      <div class="row">
        <md-input
          name="filledInput"
          label="Filled Input"
          htmlId="filledInput"
          containerSize="medium-6"
          placeholder="Placeholder Text"
          isFilled
        />
      </div>
    </div>
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
