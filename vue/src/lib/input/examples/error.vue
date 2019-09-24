<template>
  <md-input
    name="inputError"
    label="Error Input"
    htmlId="inputError"
    containerSize="medium-6"
    :messageArr="[
      { message: 'This is where the error message would be.', type: 'error' },
    ]"
    value="Error Text"
  />
</template>

<script>
export default {
  name: 'ExampleInputError',
};
</script>
