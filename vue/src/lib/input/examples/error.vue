<template>
  <md-input
    name="inputError"
    label="Error (Error) Input"
    htmlId="inputError"
    inputSize="small-5"
    :errorArr="[
      { error: 'This is where the error message would be.', type: 'error' },
    ]"
  />
</template>

<script>
export default {
  name: 'ExampleInputError',
};
</script>
