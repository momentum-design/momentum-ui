<template>
  <md-input
    name="inputWarning"
    label="Error (Warning) Input"
    htmlId="inputWarning"
    inputSize="small-5"
    :errorArr="[
      {
        error: 'This is where the warning message would be.',
        type: 'warning',
      },
    ]"
  />
</template>

<script>
export default {
  name: 'ExampleInputWarning',
};
</script>
