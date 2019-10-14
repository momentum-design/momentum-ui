<template>
  <div
    class="md-card-section"
    :class="full && `md-card-section--full`"
  ><slot></slot></div>
</template>

<script>
export default {
  name: 'md-card-section',

  props: {
    /** @prop Set the card section to be the full width | false */
    full: Boolean,
  }
};
</script>
