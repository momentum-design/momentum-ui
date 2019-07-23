<template>
  <md-button-group :justified="false" :highlightSelected="false">
    <md-button :ariaLabel="'Left'" ><md-icon :name="'icon-arrow-left_12'" /></md-button>
    <md-button :ariaLabel="'Today'" :disabled="true">Today</md-button>
    <md-button :ariaLabel="'Right'"><md-icon name="'icon-arrow-right_12'" /></md-button>
  </md-button-group>
</template>

<script>
export default {
  name: 'ExampleButtonGroupHighlightFalse',
};
</script>

