<template>
  <md-button-group :justified="false" :highlightSelected="false">
    <md-button :ariaLabel="1" >one</md-button>
    <md-button :ariaLabel="2" :disabled="true">two</md-button>
    <md-button :ariaLabel="3">three</md-button>
  </md-button-group>
</template>

<script>
export default {
  name: 'ExampleButtonGroupJustifiedFalse',
};
</script>

