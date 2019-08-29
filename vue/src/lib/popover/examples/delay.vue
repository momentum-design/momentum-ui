<template>
  <div class="docs-example docs-example--spacing">
    <md-popover
      delay="500"
    >
      <md-button ariaLabel="Hover with Delay" >Hover with Delay</md-button>
      <span slot="content" style="padding: 10px">Delayed</span>
    </md-popover>
  </div>
</template>

<script>
export default {
  name: 'ExamplePopoverDelay',
};
</script>

