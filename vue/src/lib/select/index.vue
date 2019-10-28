<template>
  <div class="md-input-container md-select">
    <md-button
      :active="isOpen"
      :ariaLabelledBy="`${id}__label`"
      aria-haspopup="listbox"
      :id="id"
      :name="id"
      @click="handleToggle"
      ref="clickTextField"
      v-bind="buttonProps"
    >
      <div class="md-select__label" :id="`${id}__label`">
        {{ currentValue || defaultValue }}
        <md-icon name="arrow-down_16" />
      </div>
    </md-button>
    <md-event-overlay
      v-if="isOpen"
      :allowClickAway="true"
      :anchorNode="anchorNode"
      @close="hidePopover"
      :isDynamic="isDynamic"
      :isOpen="isOpen"
      v-bind="overlayProps"
    >
      <md-list
        :style="{ width: `${anchorWidth}px` }"
        ref="list"
        role="listbox"
        itemRole="option"
        :active="selectedIndex"
        :aria-labelledby="`${id}__label`"
        :aria-multiselectable="isMulti"
        v-bind="listProps"
      >
        <slot></slot>
      </md-list>
    </md-event-overlay>
  </div>
</template>

<script>
import filter from 'lodash/filter';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import uniqueId from 'lodash/uniqueId';

export default {
  name: 'md-select',

  data() {
    return {
      isOpen: false,
      selected: [],
      selectedIndex: [],
      anchorNode: null,
      anchorWidth: null,
    }
  },

  provide () {
    return {
      isMulti: this.isMulti,
      parentSelect: this.handleSelect,
      getParentActive: () => this.selectedIndex,
    }
  },

  props: {
    /** @prop Sets the Button props | null */
    buttonProps: Object,
    /** @prop Set the default selected option | '' */
    defaultValue: {
      type: String,
      default: ''
    },
    /** @prop Set ID for Select Component | null */
    id: String,
    /** @prop Sets the Select EventOverlay to be dynamic | true */
    isDynamic: Boolean,
    /** @prop Optional prop to know if multiple Select children can be active | false */
    isMulti: Boolean,
    /** @prop Sets the List props | null */
    listProps: Object,
    /** @prop Sets the EventOverlay props | null */
    overlayProps: Object,
  },

  computed: {
    currentValue() {
      const { isMulti } = this.$props;
      const { selected } = this.$data;
      if(!isMulti && selected.length) return selected[0].label;

      if(selected.length === 1) {
        return `${selected.length} Item Selected`;
      } else if(selected.length) {
        return `${selected.length} Items Selected`;
      }
    },

    uniqueId() {
      return this.id || uniqueId('md-select-');
    },
  },

  watch: {
    selected(val) {
      this.$emit('select', this.selected);
    }
  },

  methods: {
    hidePopover() {
      this.isOpen = false;
    },

    handleSelect(e, opts) {
      e.preventDefault();
      const { selected, selectedIndex } = this.$data;
      const { isMulti } = this.$props;
      const { value, label, eventKey } = opts;
      const isActive = find(selected, {value, label});

      if (!isMulti) {
        this.isOpen = false;
      }

      if (isActive && !isMulti) return;

      if (isActive && isMulti) {
        this.selected = filter(selected, item =>
          !isEqual(item, {value, label})
        );

        this.selectedIndex = selectedIndex.filter(i => i !== eventKey);
      } else if (!isActive && !isMulti) {
        this.selected = [{value, label}];
        this.selectedIndex = [eventKey];
      } else {
        this.selected = [...selected, {value, label}];
        this.selectedIndex = [...selectedIndex, eventKey];
      }
    },

    choosePosition() {
      const { isOpen, anchorNode } = this.$data;

      isOpen && this.setAnchorWidth(anchorNode);
    },

    handleToggle() {
      this.isOpen = !this.isOpen;
      this.anchorNode = this.$refs.clickTextField.$parent.$vnode.elm;

      this.choosePosition();
    },

    setAnchorWidth(elementAnchor) {
      const anchor = elementAnchor && elementAnchor.getBoundingClientRect();
      this.anchorWidth = anchor.width;
    },
  },
};
</script>
