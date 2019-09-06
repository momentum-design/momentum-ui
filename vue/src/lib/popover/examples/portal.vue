<template>
  <div class="docs-example docs-example--spacing">
    <md-popover
      portalTargetName="my-portal"
    >
      <a href="#">Protal</a>
      <span slot="content" style="padding: 10px">Protal</span>
    </md-popover>

    <div class="test-portal">
      <portal-target name="my-portal" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExamplePopoverPortal',
};
</script>
