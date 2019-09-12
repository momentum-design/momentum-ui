<template>
  <div class="docs-example docs-example--spacing">
    <md-popover
      direction="right-center"
      showArrow
    >
      <md-button ariaLabel="showArrow" >showArrow</md-button>
      <span slot="content" style="padding: 10px">Arrow</span>
    </md-popover>
  </div>
</template>

<script>
export default {
  name: 'ExamplePopoverArrow',
};
</script>

