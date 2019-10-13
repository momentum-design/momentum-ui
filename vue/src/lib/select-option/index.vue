<template>
  <md-list-item
    :id="uniqueId"
    :label="label"
    :title="title || label"
    :value="value"
    @click="handleClick"
    v-bind="$attrs"
  >
    <md-checkbox
      v-if="isMulti && !$slots.customAnchor"
      :htmlId="`${uniqueId}__checkbox`"
      :label="label"
      :checked="cxtActive || false"
      ref="checkbox"
    />
    <md-list-item-section v-if="!isMulti && !$slots.customAnchor" key="child-0" position="center">
      {{ label }}<slot v-if="!label"></slot>
    </md-list-item-section>
    <md-list-item-section v-if="!isMulti && !$slots.customAnchor" key="child-1" position="right">
      <md-icon v-if="cxtActive" color="blue-50" name="check_20" />
    </md-list-item-section>
    <slot name="customAnchor"></slot>
  </md-list-item>
</template>

<script>
import uniqueId from 'lodash/uniqueId';

export default {
  name: 'md-select-option',

  data() {
    return {
      cxtActive: null,
      uniqueId: this.id || uniqueId('md-select-option-'),
    }
  },

  inject: {
    isMulti: {
      default: null
    },
    parentSelect: {
      default: null
    },
    getParentActive: {
      default: null
    },
  },

  props: {
    /** @prop SelectOption Boolean that describes active state | false */
    active: Boolean,
    /** @prop SelectOption ID | '' */
    id: {
      type: String,
      default: ''
    },
    /** @prop SelectOption label text | '' */
    label: {
      type: String,
      default: ''
    },
    /** @prop ListItem Title | '' */
    title: {
      type: String,
      default: ''
    },
    /** @prop SelectOption value | '' */
    value: {
      type: String,
      default: ''
    },
  },

  mounted() {
    this.cxtActive = this.getActive();
  },

  methods: {
    handleClick(e, opts) {
      if (this.parentSelect) {
        this.parentSelect(e, opts);
        this.cxtActive = this.getActive();
      }
      this.$emit('click', e);
    },

    getActive() {
      let parentActive;
      if (this.getParentActive) {
        parentActive = this.getParentActive();
      }
      return this.active
        || parentActive
        && this.$el
        && this.$el.attributes['data-md-event-key']
        && this.$el.attributes['data-md-event-key'].value
        && parentActive.includes(
          this.$el.attributes['data-md-event-key'].value
        );
    }
  },
};
</script>
