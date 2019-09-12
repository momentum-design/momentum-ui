<template>
  <div
    class="docs-example docs-example--spacing"
    style="
      border: 2px solid #666666;
      width: 100%;
      height: 500px;
      overflow: scroll;
      padding: 125px;
    "
  >
    <md-popover
      :isContained="true"
      checkOverflow
      direction="bottom-center"
      popoverTrigger="Click"
    >
      <md-button ariaLabel="Overflow" >Overflow</md-button>
      <span slot="content" style="height: 3000px">Popover(height: 3000px)</span>
    </md-popover>
  </div>
</template>

<script>
export default {
  name: 'ExamplePopoverOverflow',
};
</script>
