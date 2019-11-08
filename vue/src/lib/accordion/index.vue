<script>
import cloneElement from '../utils/cloneElement';

export default {
  name: 'md-accordion',

  data() {
    return {
      activeIndices: this.initialActive || [],
      focus: false,
    }
  },

  render(h) {
    const { showSeparator } = this.$props;
    const { activeIndices } = this.$data;

    const setAccordionGroups = this.$slots.default.map((child, idx) => {
      return cloneElement(child, h, {
        props: {
          isExpanded: !child.componentOptions.propsData.disabled && activeIndices.includes(idx),
          focus: this.focus === idx,
          showSeparator: showSeparator,
        },
        listeners: {
          click: () => this.handleClick(idx),
          keydown: e => this.handleKeyPress(e, idx, this.$slots.default.length - 1 , child.componentOptions.propsData.disabled),
        }
      });
    });

    return (
      <div class='md-accordion'>
        {setAccordionGroups}
      </div>
    );
  },

  props: {
    /** @prop Set to allow expansion of multiple AccordionGroups | false */
    multipleVisible: Boolean,
    /** @prop An array of indexes that are preselected | [] */
    initialActive: {
      type: Array,
      default: _ => []
    },
    /** @prop Optional underline under Accordion menu item | false  */
    showSeparator: Boolean,
  },

  mounted() {
    if(!this.verifyChildren()) {
      throw new Error('Accordion should contain one or more AccordionGroup as children.');
    }

    this.determineInitialFocus();
  },

  methods: {
    verifyChildren() {
      const childrenArr = this.$slots.default;

      const status = childrenArr.reduce((status, child) => {
        return status &&
          child.componentOptions &&
          child.componentOptions.tag === 'md-accordion-group';
      }, true);

      return childrenArr && childrenArr.length && status;
    },

    determineInitialFocus() {
      const childrenArr = this.$slots.default;
      const nonDisabledIndex = childrenArr.reduceRight((agg, child, idx) => {
        return !child.componentOptions.propsData.disabled
          ? idx
          : agg;
      }, null);

      this.setFocus(nonDisabledIndex);
    },

    handleClick(index) {
      return this.multipleVisible
        ? this.setMultiple(index)
        : this.setSelected(index);
    },

    setMultiple(index) {
      let newValues;
      const { activeIndices } = this.$data;
      const isActive = activeIndices.includes(index);

      if (isActive) {
        newValues = activeIndices.filter(v => v !== index);
      } else {
        newValues = activeIndices.concat(index);
      }

      this.setFocus(index);
      this.activeIndices = newValues;
      this.$emit('select', newValues);
    },

    setSelected(index) {
      const { activeIndices } = this.$data;
      // Don't do anything if index is the same or outside of the bounds
      if (activeIndices.includes(index) || index < 0 || index >= this.$slots.default.length)
        return;

      // Keep reference to last index for event handler
      const last = activeIndices[0];

      // Update state with selected index
      this.activeIndices = [index];
      this.setFocus(index);

      this.$emit('select', index, last);
    },

    handleKeyPress(e, idx, length, disabled) {
      if(disabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      let newIndex, clickEvent;
      const tgt = e.currentTarget;
      let flag = false;

      const getNewIndex = (currentIndex, change) => {
        const getPossibleIndex = () => {
          if (currentIndex + change < 0) {
            return length;
          } else if (currentIndex + change > length) {
            return 0;
          }

          return currentIndex + change;
        };
        const possibleIndex = getPossibleIndex();
        return this.$slots.default[possibleIndex].componentOptions.propsData.disabled
          ? getNewIndex(possibleIndex, change)
          : possibleIndex;
      };

      switch (e.which) {
        case 32:
        case 13:
          try {
            clickEvent = new MouseEvent('click', {
              view: window,
              bubbles: true,
              cancelable: true,
            });
          } catch (err) {
            if (document.createEvent) {
              // DOM Level 3 for IE 9+
              clickEvent = document.createEvent('MouseEvents');
              clickEvent.initEvent('click', true, true);
            }
          }
          tgt.dispatchEvent(clickEvent);

          flag = true;
          break;

        case 38:
        case 37:
          newIndex = getNewIndex(idx, -1);
          this.setFocus(newIndex);
          flag = true;
          break;

        case 39:
        case 40:
          newIndex = getNewIndex(idx, 1);
          this.setFocus(newIndex);
          flag = true;
          break;

        case 33:
        case 36:
          this.setFocus(0);
          flag = true;
          break;

        case 34:
        case 35:
          this.setFocus(length);
          flag = true;
          break;
        default:
          break;
      }

      if (flag) {
        e.stopPropagation();
        e.preventDefault();
      }
    },

    setFocus(index) {
      this.focus = index;
    },
  },
  

};
</script>
