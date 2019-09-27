<template>
  <div class="docs-example docs-example--spacing">
    <md-tooltip
      tooltip="Hello!"
      tooltipTrigger="MouseEnter"
      :popoverProps="{
        direction: 'right-center'
      }">
      <md-button ariaLabel="Direction">Direction</md-button>
    </md-tooltip>
  </div>
</template>

<script>
export default {
  name: 'ExampleTooltipDirection',
};
</script>
