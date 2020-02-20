<template>
  <div
    role="button"
    ref="headerRef"
    @click="handleClick"
    @keydown="handleKeydown"
    :tabindex="!disabled ? 0 : -1"
    class="md-accordion__header"
    :class="
      `${(showSeparator && ` md-accordion__header--separator`) || ''}` +
      `${(height && ` md-accordion__header--${height}`) || ''}`
    "
  >
      <slot></slot>
      <span class="md-accordion__header-icon"></span>
  </div>
</template>

<script>
export default {
  name: 'md-accordion-header',

  props: {
    /** @prop Set the attribute disabled to the AccordionHeader | false */
    disabled: Boolean,
    /** @prop Specifies if AccordionHeader automatically gets focus when page loads | false  */
    focus: Boolean,
    /** @prop Optional underline under Accordion menu item | false */
    showSeparator: Boolean,
    /** @prop Set the height of the AccordionHeader to either the default or 56px | '' */
    height: {
      type: [Number, String],
      default: '',
      validator: value => ['', 56].indexOf(value) !== -1
    },
  },

  inject: {
    onClick: {
      default: null
    },
    onKeydown: {
      default: null
    }
  },

  watch: {
    focus(val) {
      val && this.$refs.headerRef.focus();
    }
  },

  methods: {
    handleClick(e) {
      this.onClick && this.onClick(e);
    },
    handleKeydown(e) {
      this.onKeydown && this.onKeydown(e);
    }
  },

};
</script>
