<script>
import cloneElement from '../../utils/cloneElement';

export default {
  name: 'md-accordion-group',

  render(h) {
    const { isExpanded, disabled, focus, showSeparator } = this.$props;

    const setGroupContent = this.$slots.default.map(child => {
      return cloneElement(child, h, {
        props: {
          disabled,
          focus,
          showSeparator
        }
      });
    });

    return (
      <div
        aria-expanded={isExpanded}
        class={
          `md-accordion__group` +
          `${(disabled && ' md-accordion__group--disabled') || ''}` +
          `${(isExpanded && ` md-accordion__group--active`) || ''}`
        }
      >
        {setGroupContent}
      </div>
    );
  },

  provide () {
    return {
      onClick: this.handleClick,
      onKeydown: this.handleKeydown,
    }
  },

  props: {
    /** @prop Set accordionGroup to be expanded | false  */
    isExpanded: Boolean,
    /** @prop Set the attribute disabled to the accordionGroup | false */
    disabled: Boolean,
    /** @prop Specifies if AccordionGroup show automatically get focus when page loads | false  */
    focus: Boolean,
    /** @prop Optional underline under Accordion menu item | false */
    showSeparator: Boolean,
  },

  mounted() {
    if(!this.verifyChildren()) {
      throw new Error('AccordionGroup should contain 2 children ' +
        'AccordionHeader and AccordionContent respectively.');
    }
  },

  methods: {
    verifyChildren() {
      const childrenArr = this.$slots.default;
      return (
        childrenArr &&
        childrenArr.length === 2 &&
        childrenArr[0].componentOptions &&
        childrenArr[0].componentOptions.tag === 'md-accordion-header' &&
        childrenArr[1].componentOptions &&
        childrenArr[1].componentOptions.tag === 'md-accordion-content'
      );
    },

    handleClick(e) {
      this.$emit('click', e);
    },

    handleKeydown(e) {
      this.$emit('keydown', e);
    }
  },
};
</script>
