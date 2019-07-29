<template>
  <md-input
    name="inputSuccess"
    label="Error (Success) Input"
    htmlId="inputSuccess"
    inputSize="small-5"
    :errorArr="[
      {
        error: 'This is where the success message would be.',
        type: 'success',
      },
    ]"
  />
</template>

<script>
export default {
  name: 'ExampleInputSuccess',
};
</script>
