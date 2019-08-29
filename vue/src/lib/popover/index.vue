<script>
import cloneElement from '../utils/cloneElement';
import assign from 'lodash/assign';
import omit from 'lodash/omit';
import { Fragment } from 'vue-fragment'

export default {
  name: 'md-popover',

  components: { Fragment },

  data() {
    return {
      isOpen: false,
      isHovering: false,
      nativeOn: null,
    }
  },

  render(h) {
    const isOpen = this.isOpen;
    const {
      className,
      overflowType,
      popoverTrigger,
      showArrow,
      ...props
    } = this.$props;

    const otherProps = omit({...props}, [
      'delay',
      'doesAnchorToggle',
      'hideDelay',
      'hoverDelay',
      'showDelay',
      'startOpen',
    ]);

    const getTriggers = () => {
      const triggerProps = {
        attrs: {
          ref: 'anchorRef',
          key: 'child-1',
        },
        nativeOn: {},
      };

      switch (popoverTrigger) {
        case 'MouseEnter':
          triggerProps.nativeOn.mouseenter = this.handleMouseEnter;
          triggerProps.nativeOn.mouseleave = this.handleMouseLeave;

          triggerProps.nativeOn.focus = this.handleFocus;
          triggerProps.nativeOn.blur = this.handleBlur;
          break;

        case 'Click':
          triggerProps.nativeOn.click = this.handleClick;
          break;

        case 'Focus':
          triggerProps.nativeOn.focus = this.handleFocus;
          triggerProps.nativeOn.blur = this.handleBlur;
          break;
      }

      return triggerProps;
    };

    const node = this.$slots.default && this.$slots.default[0];

    if (!this.nativeOn) {
      this.nativeOn = {};
      node.data && node.data.nativeOn && assign(this.nativeOn, node.data.nativeOn);
    }

    const data = getTriggers();
    if (node && node.data) {
      node.data.on = {};
      node.data.nativeOn = {};
      assign(node.data.attrs, data.attrs);
      assign(node.data.on, data.nativeOn);
      assign(node.data.nativeOn, data.nativeOn);
    }

    const getComponentData = () => ({
      class: className,
      attrs: {
        ref: 'overlay',
        ...this.$attrs,
      },
      props: {
        anchorNode: node.elm,
        isOpen: isOpen,
        showArrow: showArrow,
        contentStyle: { overflow: overflowType },
        ...popoverTrigger === 'Focus' && { allowClickAway: false },
        ...otherProps,
        ...this.$attrs,
      },
      on: {
        close: this.handleClose,
      },
      nativeOn: {
        ...popoverTrigger === 'MouseEnter' && {
          mouseenter: e => {
              this.isHovering = true;
              this.isOpen = true;
            },
          mouseleave: e => {
              this.isHovering = false;
              this.delayedHide(e);
            },
        },
      },
    });

    return (
      h(this.fragment ? 'fragment' : 'span',
        {},
        [node, isOpen &&
          h('md-event-overlay', getComponentData(), this.$slots.content)]
      )
    );
  },

  props: {
    /** @prop Optional CSS class names which goes over popover container | '' */
    className: String,
    /** @prop The delay for popover on hover, click, focus (hide/show) | 0 */
    delay: {
      type: Number,
      default: 0
    },
    /** @prop Boolean for whether the Anchor Toggles the Popover | true */
    doesAnchorToggle: {
      type: Boolean,
      default: true
    },
    /** @prop Use fragment tag | true */
    fragment: {
      type: Boolean,
      default: true
    },
    /** @prop The hide delay for popover on hover, click, focus | 0 */
    hideDelay: {
      type: Number,
      default: 0
    },
    /** @prop The hover delay for checking whether we are still hovering before closing | 500 */
    hoverDelay: {
      type: Number,
      default: 500
    },
    /** @prop Optional prop that controls overflow css style of EventOverlay | 'auto' */
    overflowType: {
      type: String,
      default: 'auto'
    },
    /** @prop Event that will trigger popover appearance | 'MouseEnter' */
    popoverTrigger: {
      type: String,
      default: 'MouseEnter',
      validator: (value) => ['MouseEnter', 'Click', 'Focus', 'None'].indexOf(value) !== -1
    },
    /** @prop Boolean for whether the Arrow should show | true */
    showArrow: {
      type: Boolean,
      default: true
    },
    /** @prop The show delay for popover on hover, click, focus | 0 */
    showDelay: {
      type: Number,
      default: 0
    },
    /** @prop Should Popover start open | false */
    startOpen: Boolean,
  },

  methods: {
    delayedHide(e) {
      const { delay, hideDelay } = this.$props;
      if ( this.isHovering ) return;

      if (this.showTimerId) {
        clearTimeout(this.showTimerId);
        this.showTimerId = null;
      }

      const popoverHideTime = hideDelay
        ? hideDelay
        : delay;

      this.hideTimerId = setTimeout(() => {
        this.hideTimerId = null;
        this.isOpen = false;
        this.isHovering = false;
        this.$emit('close', e);
      }, popoverHideTime);

      e && e.stopPropagation();
    },

    delayedShow(e) {
      const { delay, showDelay } = this.$props;

      if (this.hideTimerId) {
        clearTimeout(this.hideTimerId);
        this.hideTimerId = null;
      }

      const popoverShowTime = showDelay
        ? showDelay
        : delay;

      this.showTimerId = setTimeout(() => {
        this.showTimerId = null;
        this.isOpen = true;
        this.isHovering = true;
      }, popoverShowTime);

      e && e.stopPropagation();
    },

    handleClose(e) {
      this.isOpen = false;
      this.$emit('close', e);
    },

    handleMouseEnter(e) {
      this.nativeOn && this.nativeOn.mouseenter && this.nativeOn.mouseenter(e);
      return !this.showTimerId && !this.isOpen && this.delayedShow(e);
    },

    delayCheckHover(e) {
      const { hoverDelay } = this.$props;
      this.isHovering = false;
      setTimeout(() => this.delayedHide(e), hoverDelay);
    },

    handleMouseLeave(e) {
      if (this.hasFocus) {
        return false;
      }

      if (this.showTimerId) {
        clearTimeout(this.showTimerId);
        this.showTimerId = null;
      }

      this.nativeOn && this.nativeOn.mouseleave && this.nativeOn.mouseleave(e);
      return !this.hideTimerId && this.isOpen && this.delayCheckHover(e);
    },

    handleBlur(e) {
      this.hasFocus = false;

      this.nativeOn && this.nativeOn.blur && this.nativeOn.blur(e);
      this.handleMouseLeave(e);
    },

    handleClick(e) {
      const { doesAnchorToggle } = this.$props;

      this.hasFocus = true;

      this.nativeOn && this.nativeOn.click && this.nativeOn.click(e);
      if(!this.showTimerId) {
        return !this.isOpen
          ? this.delayedShow(e)
          : doesAnchorToggle && this.handleBlur(e);
      }
    },

    handleFocus(e) {
      this.hasFocus = true;

      this.nativeOn && this.nativeOn.focus && this.nativeOn.focus(e);
      if(!this.showTimerId) {
        return !this.isOpen
          ? this.delayedShow(e)
          : this.handleBlur(e);
      }
    },
  },

  mounted() {
    this.startOpen &&
    this.delayedShow();
  },

  beforeDestroy() {
    this.hideTimerId && clearTimeout(this.hideTimerId);
    this.showTimerId && clearTimeout(this.showTimerId);
  },
};
</script>
