<template>
  <div
    class="md-sidebar__wrapper"
    :class="[{
      'md-sidebar__wrapper--fixed': isFixed,
    }, wrapperClass]"
  >
    <div
      class="md-sidebar"
      :class="
        `${theme && ` md-sidebar--${theme}` || ''}` +
        `${isFixed && ` md-sidebar--fixed` || ''}` +
        `${!isPageLevel && ` md-sidebar--global` || ''}` +
        `${withTopbar && ` md-sidebar--topbar` || ''}` +
        `${withIcons && !isPageLevel && ` md-sidebar--indented` || '' }` +
        `${hasTiers() && ` md-sidebar--nested` || ''}` +
        `${getCollapseClass('md-sidebar')}` +
        `${className && ` ${className}` || ''}`
      "
      v-bind="$attrs"
    >
      <slot></slot>
    </div>
    <div
      v-if="withToggle"
      class="md-sidebar__toggle"
      :class="getCollapseClass('md-sidebar__toggle')"
    >
      <md-collapse-button 
        :collapse="!expanded2"
        @click="handleNavToggle"
        v-bind="buttonProps"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'md-sidebar',

  data() {
    return {
      expanded2: this.expanded,
      sidebarLevels: {
        primary: true,
        secondary: false,
        tertiary: false,
      }
    }
  },

  provide() {
    return {
      sidebar: this,
      primary: this.sidebarLevels.primary,
      secondary: this.sidebarLevels.secondary,
      tertiary: this.sidebarLevels.tertiary,
    }
  },

  props: {
    /**  @prop Optional CSS class for the toggle button | {} */
    buttonProps: {
      type: Object,
      default: _ => {}
    },
    /** @prop Optional CSS class string | '' */
    className: {
      type: String,
      default: ''
    },
    /** @prop Set to make the navigation collapsable | false */
    collapsable: Boolean,
    /** @prop Set navigation expanded or collapsed | true */
    expanded: {
      type: Boolean,
      default: true
    },
    /** @prop Sets Sidebar to position fixed | false */
    isFixed: Boolean,
    /** @prop Sets Sidebar styling for page level | false */
    isPageLevel: Boolean,
    /** @prop Optional color theme | '' */
    theme: {
      type: String,
      default: ''
    },
    /** @prop Changes padding based on Icon nav | true */
    withIcons: {
      type: Boolean,
      default: true
    },
    /** @prop Optional toggle button to expand/collapse sidebar | false */
    withToggle: Boolean,
    /** @prop Sets padding for Topbar | false */
    withTopbar: Boolean,
    /** @prop Optional CSS class string for sidebar wrapper | '' */
    wrapperClass: {
      type: String,
      default: ''
    },
  },

  watch: {
    expanded(val) {
      if (this.expanded2 !== val) {
        this.setExpanded();
      }
    },
  },

  methods: {
    getCollapseClass(prefix) {
      if ((this.collapsable || this.withToggle) && !this.expanded2 && !this.withIcons) {
        return ` ${prefix}--collapsed`;
      } else if ((this.collapsable || this.withToggle) && !this.expanded2 && this.withIcons) {
        return ` ${prefix}--minimized`;
      } else return '';
    },

    hasTiers() {
      if(
        this.sidebarLevels.secondary
        ||
        this.sidebarLevels.tertiary
      ) {
        return true;
      } else {
        return false;
      }
    },

    handleNavToggle() {
      this.expanded2 = !this.expanded2;
    },

    setExpanded() {
      this.expanded2 = this.expanded;
    },

    setSidebarLevel(property) {
      this.sidebarLevels[property] = true;
    },
  },
};
</script>
