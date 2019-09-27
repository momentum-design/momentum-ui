<template>
  <li
    class="md-tab__item"
    :class="{
      active: !disabled && active,
      disabled: disabled
    }"
    :tabindex="!disabled ? -1 : null"
  >
    <a
      ref="tabLink"
      :role="role"
      href="javascript:void(0)"
      @keydown="handleKeydown"
      @click="handleClick"
      :tabindex="!disabled && focus ? 0 : -1"
      :aria-current="!disabled && active"
      >{{ heading }}</a>
  </li>
</template>

<script>
export default {
  name: 'md-tab',

  props: {
    /** @prop Set Tab with an active state | false */
    active: Boolean,
    /** @prop Sets the attribute disabled to the Tab | false */
    disabled: Boolean,
    /** @prop Specifies if Tab should automatically get focus when page loads | false */
    focus: Boolean,
    /** @prop Tab Heading Text */
    heading: {
      type: String,
      required: true
    },
    /** @prop Currently unused prop myKey | 0 */
    myKey: {
      type: Number,
      default: 0
    },
    /** @prop Tab's anchor role type | 'tab' */
    role: {
      type: String,
      default: 'tab'
    },
  },

  watch: {
    focus(val) {
      val && this.$refs.tabLink.focus();
    }
  },

  mounted() {
    this.focus && this.$refs.tabLink.focus();
  },

  methods: {
    handleKeydown(e) {
      this.$emit('keydown', e);
    },

    handleClick(e) {
      this.$emit('click', e);
    }
  },
};
</script>
