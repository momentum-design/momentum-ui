<script>
import cloneElement from '../utils/cloneElement';
import createFocusTrap from 'focus-trap';

export default {
  name: 'md-focus-trap',

  data() {
    return {
      focusTrap: null,
      previouslyFocusedElement: null,
    }
  },

  render(h) {
    const child = this.$slots.default[0];
    return cloneElement(child, h);
  },

  props: {
    active: {
      type: Boolean,
      default: true
    },
    paused: Boolean,
    focusTrapOptions: {
      type: Object,
      default: () => {}
    },
  },

  watch: {
    active(val, oldVal) {
      if (oldVal && !val) {
        const { returnFocusOnDeactivate } = this.focusTrapOptions;
        const returnFocus = returnFocusOnDeactivate || false;
        const config = { returnFocus };
        this.focusTrap.deactivate(config);
      } else if (!oldVal && val) {
        this.focusTrap.activate();
      }
    },

    paused(val, oldVal) {
      if (oldVal && !val) {
        this.focusTrap.unpause();
      } else if (!oldVal && val) {
        this.focusTrap.pause();
      }
    },
  },

  beforeCreate() {
    if (typeof document !== 'undefined') {
      this.previouslyFocusedElement = document.activeElement;
    }
  },

  mounted() {
    const specifiedFocusTrapOptions = this.focusTrapOptions;
    const tailoredFocusTrapOptions = {
      returnFocusOnDeactivate: false
    };
    for (const optionName in specifiedFocusTrapOptions) {
      if (!specifiedFocusTrapOptions.hasOwnProperty(optionName)) continue;
      if (optionName === 'returnFocusOnDeactivate') continue;
      tailoredFocusTrapOptions[optionName] = specifiedFocusTrapOptions[optionName];
    }

    const focusTrapElement = this.$el;
    this.focusTrap = createFocusTrap(
      focusTrapElement,
      tailoredFocusTrapOptions
    );
    if (this.active) {
      this.focusTrap.activate();
    }
    if (this.paused) {
      this.focusTrap.pause();
    }
  },

  beforeDestroy() {
    this.focusTrap.deactivate();
    if (
      this.focusTrapOptions.returnFocusOnDeactivate !== false &&
      this.previouslyFocusedElement &&
      this.previouslyFocusedElement.focus
    ) {
      this.previouslyFocusedElement.focus();
    }
  },

};
</script>
