<template>
  <div class="docs-example docs-example--spacing">
    <md-popover
      isContained
      direction="bottom-center"
      popoverTrigger="Click"
    >
      <md-button ariaLabel="Tall" >Tall</md-button>
      <span slot="content" style="height: 3000px">Popover(height: 3000px)</span>
    </md-popover>
  </div>
</template>

<script>
export default {
  name: 'ExamplePopoverContained',
};
</script>

