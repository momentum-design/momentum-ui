<script>
import cloneElement from '../utils/cloneElement';

export default {
  name: 'md-tabs',

  data() {
    return {
      activeIndex: 0,
      focusIndex: this.focus
    }
  },

  render(h) {
    const { tabType, justified } = this.$props;

    const cloneChildren = this.$slots.default.map(child => {
      if (child.componentOptions && child.componentOptions.tag === 'md-tab-content') {
        return cloneElement(child, h, {
          props: {
            activeIndex: this.activeIndex,
          }
        });
      } else if (child.componentOptions && child.componentOptions.tag === 'md-tab-list') {
        return cloneElement(child, h, {
          props: {
            role: 'tab'
          }
        });
      } else {
        return child;
      }
    });

    return (
      <div
        class={
        'md-tab' +
        `${(tabType && ` md-tab--${tabType}`) || ''}` +
        `${(justified && ` md-tab--justified`) || ''}`}
        type={tabType}
        >
        {cloneChildren}
      </div>
    );
  },

  provide () {
    return {
      getActiveIndex: this.getActiveIndex,
      getFocusIndex: this.getFocusIndex,
      onActivate: index => this.setSelected(index),
      onFocus: index => this.focusIndex = index,
    }
  },

  props: {
    /** @prop Determines if Tab is active | false */
    active: Boolean,
    /** @prop Set the index of the focused Tab | 0 */
    focus: {
      type: Number,
      default: 0
    },
    /** @prop Determines if the Tabs are in a justified layout | false */
    justified: Boolean,
    /** @prop Type of Tabs | 'pills' */
    tabType: {
      type: String,
      default: 'pills',
      validator: value => ['pills', 'list', 'tabs'].indexOf(value) !== -1
    },
  },

  beforeMount() {
    const tabsCount = this.getChildrenElements('md-tab-list');
    const panelsCount = this.getChildrenElements('md-tab-content');

    if (tabsCount !== panelsCount) {
      throw new Error(`There should be an equal number of Tabs and TabPanels.
      Received ${tabsCount} Tabs and ${panelsCount} TabPanels.`);
    }
  },

  methods: {
    getMobileListItems() {
      return this.$slots.default.map(child => {
        if (child.componentOptions && child.componentOptions.tag === 'md-topbar-nav') {
          return child.componentOptions.children;
        }
      });
    },

    getChildrenElements(name) {
      let elementCount = 0;

      this.$slots.default.forEach(child => {
        if (child.componentOptions && child.componentOptions.tag === name) {
          return child.componentOptions.children.length
            ? (elementCount += child.componentOptions.children.length)
            : elementCount++;
        }
      });

      return elementCount;
    },

    getActiveIndex() {
      return this.activeIndex;
    },

    getFocusIndex() {
      return this.focusIndex;
    },

    setSelected(index) {
      // Don't do anything if index is the same or outside of the bounds
      if (
        index === this.activeIndex ||
        index < 0 ||
        index >= this.getChildrenElements('md-tab-list')
      )
        return;

      // Keep reference to last index for event handler
      const last = this.activeIndex;
      this.activeIndex = index;
      this.$emit('select', index, last);
    },
  },
};
</script>
