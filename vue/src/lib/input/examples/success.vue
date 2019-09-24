<template>
  <md-input
    name="inputSuccess"
    label="Success Input"
    htmlId="inputSuccess"
    containerSize="medium-6"
    :messageArr="[
      { message: 'This is where the success message would be.', type: 'success' },
    ]"
    value="Success Text"
  />
</template>

<script>
export default {
  name: 'ExampleInputSuccess',
};
</script>
