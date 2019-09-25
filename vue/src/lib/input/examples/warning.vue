<template>
  <md-input
    name="inputWarning"
    label="Warning Input"
    htmlId="inputWarning"
    containerSize="medium-6"
    :messageArr="[
      { message: 'This is where the warning message would be.', type: 'warning' },
    ]"
    value="Warning Text"
  />
</template>

<script>
export default {
  name: 'ExampleInputWarning',
};
</script>
