<template>
  <div
    class="md-sidebar-nav"
    :class="[{
      'md-sidebar-nav--header' : title,
    }, className]"
  >
    <div v-if="title" class='md-sidebar-nav__header'>{{ title }}</div>
    <slot v-if="!title" name="header"></slot>
    <md-list
      class="md-sidebar-nav__group md-sidebar-nav__group--primary"
      :class="[className]"
      :focusQuery="`
        .md-sidebar-nav__group--primary > .md-list-item:not(.disabled):not(:disabled):not(.md-list-item--read-only),
        .md-sidebar-nav__group--secondary.md-sidebar-nav__group--expanded > .md-list-item:not(.disabled):not(:disabled):not(.md-list-item--read-only),
        .md-sidebar-nav__group--secondary.md-sidebar-nav__group--expanded > .md-sidebar-nav__group--expanded > .md-list-item:not(.disabled):not(:disabled):not(.md-list-item--read-only)
        ${focusQuery ? `, ${focusQuery}` : ''}
      `"
      v-bind="$attrs"
    >
      <slot></slot>
    </md-list>
  </div>
</template>

<script>
export default {
  name: 'md-sidebar-nav',

  props: {
    /** @prop Optional css class string | ''  */
    className: {
      type: String,
      default: ''
    },
    /** @prop Additional elements that can be focused by selector | '' */
    focusQuery: {
      type: String,
      default: ''
    },
    /** @prop Optional string to be used for Section Title | ''  */
    title: {
      type: String,
      default: ''
    }
  },

};
</script>
