<template>
  <md-list-item
    :class="
      'md-list-item-header' +
      `${(type && ` md-list-item-header--${type}`) || ''}`
    "
    isReadOnly
    :id="getId"
    :title="getTitle"
    v-bind="$attrs"
  >
    <md-list-item-section key="child-0" position="center">
      <div class="md-list-item__header">
        {{ header }}
      </div>
    </md-list-item-section>
    <md-list-item-section key="child-1" position="right">
      <slot></slot><slot name="customAnchor"></slot>
    </md-list-item-section>
  </md-list-item>
</template>

<script>
import uniqueId from 'lodash/uniqueId';

export default {
  name: 'md-list-item-header',

  props: {
    /** @prop ListItem header text */
    header: {
      type: String,
      required: true
    },
    /** @prop HTML ID for associated input | '' */
    id: {
      type: String,
      default: ''
    },
    /** @prop Determines if ListItemHeader is Clickable | true */
    isReadOnly: {
      type: Boolean,
      default: true
    },
    /** @prop ListItem title | '' */
    title: {
      type: String,
      default: ''
    },
    /** @prop ListItemHeader type variation | '' */
    type: {
      type: String,
      default: '',
      validator: function (value) {
        return ['', 'space'].indexOf(value) !== -1
      }
    },
  },

  computed: {
    getId() {
      return this.id || uniqueId('md-space-list-item__header-');
    },

    getTitle() {
      return !this.title ? this.header : this.title;
    },
  },

};
</script>
