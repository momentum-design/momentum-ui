<template>
  <div
    class="md-list"
    :class="[
      tabType ? `md-list--${tabType}` : '',
      {
        'md-list--wrap': wrap
      }
    ]"
    :role="role"
    :aria-activedescendant="getActiveId"
  >
    <slot></slot>
  </div>
</template>

<script>
import qsa from 'dom-helpers/query/querySelectorAll';

export default {
  name: 'md-list',

  data() {
    return {
      activeEventKey: this.active,
      focusEventKey: (this.shouldFocusActive && this.active) || this.focus,
      needsRefocus: false,
    }
  },

  provide () {
    return {
      itemRole: this.itemRole,
      itemType: this.type,
      list: this,
      parentKeyDown: this.handleKeyDown,
      parentOnSelect: this.handleSelect,
    }
  },

  props: {
    /** @prop Optional active prop to pass active prop to children | null */
    active: [String, Array, Number],
    /** @prop Optional focus prop to pass focus prop to children | null */
    focus: String,
    /** @prop Sets first List item to have focus | true */
    focusFirst: {
      type: Boolean,
      default: true
    },
    /** @prop Queries children to find matching item to have focus | '' */
    focusFirstQuery: {
      type: String,
      default: ''
    },
    /** @prop Additional elements that can be focused by selector | '' */
    focusQuery: {
      type: String,
      default: ''
    },
    /** @prop Optional tabType prop type to manually set child role | 'listitem' */
    itemRole: {
      type: String,
      default: 'listitem'
    },
    /** @prop Sets the ARIA role for the Nav, in the context of a TabContainer | 'list' */
    role: {
      type: String,
      default: 'list'
    },
    /** @prop Determines if focus should revert to active on list exit | false */
    shouldFocusActive: Boolean,
    /** @prop Determines if keyboard navigation should loop through list | true */
    shouldLoop: {
      type: Boolean,
      default: true
    },
    /** @prop Sets the orientation of the List | 'vertical' */
    tabType: {
      type: String,
      default: 'vertical',
      validator: function (value) {
        return ['vertical', 'horizontal'].indexOf(value) !== -1
      }
    },
    /** @prop Determines if List wrapper should track active | true */
    trackActive: {
      type: Boolean,
      default: true
    },
    /** @prop Sets List size | null */
    type: {
      type: String,
      validator: function (value) {
        return ['small', 'large', 'space', 'xlarge'].indexOf(value) !== -1
      }
    },
    /** @prop Optional wrap prop type to wrap items to next row */
    wrap: Boolean,
  },

  computed: {
    getActiveId() {
      const activeNode = this.active
        && this.active.length
        && this.$el
        && this.$el.querySelector(`[data-md-event-key="${this.active[0]}"]`);

      return (
        activeNode && activeNode.id
      );
    },
  },

  watch: {
    focusEventKey(val) {
      if (this.needsRefocus) {
        this.$el.querySelector(`[data-md-event-key="${val}"]`).focus();
      }
    },
  },

  methods: {
    determineInitialFocus() {
      const items = qsa(this.$el, this.focusFirstQuery || `.md-list-item:not(.disabled):not(:disabled):not(.md-list-item--read-only)`);

      if (items.length) {
        if (!this.focusEventKey) {
          this.focusEventKey = this.getNextFocusedChild(items, items[0], 0);
        }
        if (this.focusEventKey) {
          this.$el.querySelector(`[data-md-event-key="${this.focusEventKey}"]`).focus();
        }
      }
    },

    getIncludesFirstCharacter(str, char) {
      return str
        .charAt(0)
        .toLowerCase()
        .includes(char);
    },

    getNextFocusedChild(items, current, offset) {
      if (!this.$el) return null;

      const possibleIndex = items.indexOf(current) + offset;

      const getIndex = () => {
        if (possibleIndex < 0) {
          return this.shouldLoop
            ? items.length - 1
            : 0;
        } else if (possibleIndex > items.length - 1) {
          return this.shouldLoop
            ? 0
            : items.length - 1;
        } else return possibleIndex;
      };

      const val = this.getValue(items, getIndex(), 'event');
      if (this.focusEventKey !== val) {
        this.focusEventKey = val;
      }

      return val;
    },

    getValue(arr, index, attribute) {
      return arr[index]
        && arr[index].attributes[`data-md-${attribute}-key`]
        && arr[index].attributes[`data-md-${attribute}-key`].value;
    },

    getFocusableItems() {
      if (!this.$el) return null;

      const defaultItems = qsa(this.$el, `.md-list-item:not(.disabled):not(:disabled):not(.md-list-item--read-only)`);
      const customItems = this.focusQuery && qsa(this.$el, this.focusQuery) || [];

      return customItems.length
        ? customItems.filter(item => customItems.indexOf(item) >= 0)
        : defaultItems;
    },

    handleKeyDown(e) {
      let clickEvent;
      const tgt = e.currentTarget;
      const char = e.key;
      const items = this.getFocusableItems();
      const length = items.length && items.length - 1 || 0;
      const focusIdx = this.focusEventKey && items.indexOf(this.$el.querySelector(`[data-md-event-key="${this.focusEventKey}"]`)) || 0;
      let flag = false;

      const isPrintableCharacter = str => {
        return str.length === 1 && str.match(/\S/);
      };

      switch (e.key) {
        case 'Tab':
          if(this.shouldFocusActive) {
            this.needsRefocus = false;
            this.setFocusToActive();
          }
          break;
        case 'Space':
        case 'Enter':
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

        case 'ArrowUp':
        case 'ArrowLeft':
          this.getNextFocusedChild(items, tgt, -1);
          this.needsRefocus = true;
          flag = true;
          break;

        case 'ArrowRight':
        case 'ArrowDown':
          this.getNextFocusedChild(items, tgt, 1);
          this.needsRefocus = true;
          flag = true;
          break;

        case 'PageUp':
        case 'Home':
          this.setFocusToLimit('start', items, length);
          this.needsRefocus = true;
          flag = true;
          break;

        case 'PageDown':
        case 'End':
          this.setFocusToLimit('end', items, length);
          this.needsRefocus = true;
          flag = true;
          break;
        default:
          if (isPrintableCharacter(char)) {
            this.setFocusByFirstCharacter(char, focusIdx, items, length);
            this.needsRefocus = true;
            flag = true;
          }
          break;
      }

      if (flag) {
        e.stopPropagation();
        e.preventDefault();
      }
    },

    handleSelect(e, opts) {
      const { eventKey, label, value } = opts;

      const items = this.getFocusableItems();
      const index = items.indexOf(this.$el.querySelector(`[data-md-event-key="${eventKey}"]`));

      this.setFocus(items, index);
      this.$emit('select', e, {
          eventKey: this.getValue(items, index, 'event'),
          label,
          value,
        }
      );
      // Don't do anything if index is the same or outside of the bounds
      if (
        eventKey === this.activeEventKey ||
        index < 0 ||
        index > items.length - 1
      )
      return;

      // Call change event handler
      if (this.trackActive) {
        this.activeEventKey = this.getValue(items, index, 'event');
      }

      this.$emit('activeChange', {
        active: this.activeEventKey,
        focus: this.focusEventKey,
      });

    },

    setFocus(items, index) {
      this.focusEventKey = this.getValue(items, index, 'event');
    },

    setActiveAndFocus(active, focus) {
      this.needsRefocus = false;
      this.activeEventKey = active;
      this.focusEventKey = (this.shouldFocusActive && active) || focus;
    },

    setFocusByFirstCharacter(char, focusIdx, items, length) {
      const newIndex = items
        .reduce((agg, item, idx, arr) => {
          const index = focusIdx + idx + 1 > length
            ? Math.abs(focusIdx + idx - length)
            : focusIdx + idx + 1;

            return (
              !agg.length
                && this.getValue(arr, index, 'keyboard')
                && this.getIncludesFirstCharacter(this.getValue(arr, index, 'keyboard'), char)
            )
              ? agg.concat(this.getValue(arr, index, 'event'))
              : agg;
        },
        []
      );

      if (typeof newIndex[0] === 'string' && this.focusEventKey !== newIndex[0]) {
        this.focusEventKey = newIndex[0];
      }
    },

    setFocusToActive() {
      let focus = this.activeEventKey;
      if (!focus) {
        const items = this.getFocusableItems();
        focus =  this.getValue(items, 0, 'event');
      }
      this.focusEventKey = focus;
    },

    setFocusToLimit(target, items, length) {
      const index = target === 'start' ? 0 : length;
      const newFocusKey = this.getValue(items, index, 'event');

      if (newFocusKey !== this.focusEventKey) {
        this.focusEventKey = newFocusKey;
      }
    },

  },

  mounted() {
    if (this.focusFirst) {
      this.determineInitialFocus();
    }
  },

};
</script>
