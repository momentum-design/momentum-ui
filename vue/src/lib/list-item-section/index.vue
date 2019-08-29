<template>
  <div
    :class="[
      `md-list-item__${position}`
    ]"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'md-list-item-section',

  props: {
    /** @prop Determine the ListItemSection's position | 'center' */
    position: {
      type: String,
      default: 'center',
      validator: function (value) {
        return ['left', 'center', 'right', 'center-align'].indexOf(value) !== -1
      }
    },
  },

};
</script>
