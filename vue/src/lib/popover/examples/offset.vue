<template>
  <div class="docs-example docs-example--spacing">
    <md-popover
      direction="top-center"
      :isContained="true"
      :targetOffset="{ vertical: 20 }"
    >
      <md-button ariaLabel="offset" >offset</md-button>
      <span slot="content" style="padding: 10px">Offset</span>
    </md-popover>
  </div>
</template>

<script>
export default {
  name: 'ExamplePopoverOffset',
};
</script>
