<template>
  <div class="row">
    <div class="docs-example docs-example--spacing">
      <md-tooltip tooltip="Hello!" tooltipTrigger="Click">
        <md-button ariaLabel="Click">Click</md-button>
      </md-tooltip>
    </div>

    <div class="docs-example docs-example--spacing">
      <md-tooltip tooltip="Hello!" tooltipTrigger="MouseEnter">
        <md-button ariaLabel="MouseEnter">MouseEnter</md-button>
      </md-tooltip>
    </div>

    <div class="docs-example docs-example--spacing">
      <md-tooltip tooltip="Hello!" tooltipTrigger="Focus">
        <md-button ariaLabel="Focus">Focus</md-button>
      </md-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExampleTooltipDefault',
};
</script>
