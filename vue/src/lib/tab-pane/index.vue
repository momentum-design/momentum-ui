<template>
  <div
    class="md-tab__pane"
    :class="{ active: active }"
  >
    <div class="md-tab__content"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'md-tab-pane',

  props: {
    /** @prop Determines if TabPane is active | false */
    active: Boolean,
  }
};
</script>
