<template>
  <div class="docs-example docs-example--spacing">
    <md-tooltip
      tooltip="Delayed!"
      tooltipTrigger="MouseEnter"
      :popoverProps="{
        delay: 500
      }">
      <md-button ariaLabel="Delay">Delay</md-button>
    </md-tooltip>
  </div>
</template>

<script>
export default {
  name: 'ExampleTooltipDelay',
};
</script>
