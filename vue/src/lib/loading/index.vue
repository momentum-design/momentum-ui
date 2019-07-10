<template>
  <div
    class="md-loading"
    :class="{'md-loading--small': small}">
    <span class="md-loading__icon"/>
    <span class="md-loading__icon"/>
    <span class="md-loading__icon"/>
  </div>
</template>

<script>
export default {
  name: 'md-loading',
  props: {
    /** @prop Prop to make the Loading animation small | false */
    small: {
      type: Boolean,
      default: false
    }
  }
};
</script>
