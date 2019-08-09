<template>
  <div
    class="md-list-separator"
    :style="[
      lineColor && {color: lineColor},
      margin && {margin: margin}
    ]"
  >
    <span class="md-list-separator__container">
      <span v-if="$slots.default || text"
        class="md-list-separator__text"
        :style="[
          textColor && {color: textColor},
          textPadding && {padding: textPadding}
        ]"
      >
        <slot></slot>{{ content }}
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'md-list-separator',

  props: {
    /** @prop Color of the ListSeparator line | null */
    lineColor: String,
    /** @prop Margin of the ListSeparator | null */
    margin: String,
    /** @prop Text of the ListSeparator | null */
    text: String,
    /** @prop TextColor of the ListSeparator | null */
    textColor: String,
    /** @prop Padding around text of the ListSeparator | null */
    textPadding: String,
  },

  computed: {
    content() {
      return !this.$slots.default ? this.text : '';
    }
  },
};
</script>
