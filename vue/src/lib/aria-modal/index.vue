<script>
import NoScroll from 'no-scroll';

export default {
  name: 'md-aria-modal',

  render(h) {
    const props = this.$props;

    let style = {};
    if (props.includeDefaultStyles) {
      style = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        'z-index': 1050,
        'overflow-x': 'hidden',
        'overflow-y': 'auto',
        '-webkit-overflow-scrolling': 'touch',
        'text-align': 'center'
      };

      if (props.underlayColor) {
        style.background = props.underlayColor;
      }

      if (props.underlayClickExits) {
        style.cursor = 'pointer';
      }
    }

    if (props.underlayStyle) {
      for (const key in props.underlayStyle) {
        if (!props.underlayStyle.hasOwnProperty(key)) continue;
        style[key] = props.underlayStyle[key];
      }
    }

    const underlayProps = {
      attrs: {},
      class: props.underlayClass,
      style: style
    };

    if (props.underlayClickExits) {
      underlayProps.on = {
        mousedown: this.checkUnderlayClick
      };
    }

    for (const attr in props.underlayAttrs) {
      underlayProps.attrs[attr] = props.underlayAttrs[attr];
    }

    let verticalCenterStyle = {};
    if (props.includeDefaultStyles) {
      verticalCenterStyle = {
        display: 'inline-block',
        height: '100%',
        'vertical-align': 'middle'
      };
    }

    const verticalCenterHelperProps = {
      key: 'a',
      style: verticalCenterStyle
    };

    let dialogStyle = {};
    if (props.includeDefaultStyles) {
      dialogStyle = {
        display: 'inline-block',
        'text-align': 'left',
        top: 0,
        'max-width': '100%',
        cursor: 'default',
        outline: props.focusDialog ? 0 : null
      };

      if (props.verticallyCenter) {
        dialogStyle['vertical-align'] = 'middle';
        dialogStyle.top = 0;
      }
    }

    if (props.dialogStyle) {
      for (const key in props.dialogStyle) {
        if (!props.dialogStyle.hasOwnProperty(key)) continue;
        dialogStyle[key] = props.dialogStyle[key];
      }
    }

    const attrs = {
      role: props.alert ? 'alertdialog' : 'dialog',
      id: props.dialogId,
    };

    if (props.titleId) {
      attrs['aria-labelledby'] = props.titleId;
    } else if (props.titleText) {
      attrs['aria-label'] = props.titleText;
    }
    if (props.focusDialog) {
      attrs.tabindex = '-1';
    }

    // Apply data- and aria- attributes passed as props
    for (let key in props) {
      if (/^(data-|aria-)/.test(key)) {
        attrs[key] = props[key];
      }
    }

    const childrenArray = [
      h('div', {
        key: 'b',
        ref: 'dialog',
        attrs: attrs,
        class: props.dialogClass,
        style: dialogStyle,
      }, this.$slots.default)
    ];

    if (props.verticallyCenter) {
      childrenArray.unshift(
        h('div', verticalCenterHelperProps)
      );
    }

    const focusTrapOptions = props.focusTrapOptions || {};
    if (props.focusDialog || props.initialFocus) {
      focusTrapOptions.initialFocus = props.focusDialog
        ? `#${props.dialogId}`
        : props.initialFocus;
    }

    focusTrapOptions.escapeDeactivates = props.escapeExits;

    return h('md-focus-trap', {
        props: {
          focusTrapOptions,
          paused: props.focusTrapPaused
        }
      },
      [
        h('div', underlayProps, childrenArray)
      ])
  },

  props: {
    alert: Boolean,
    dialogClass: String,
    dialogId: {
      type: String,
      default: 'aria-modal-dialog'
    },
    dialogStyle: {
      type: String,
      default: () => {}
    },
    escapeExits: {
      type: Boolean,
      default: true
    },
    focusDialog: Boolean,
    focusTrapOptions: Object,
    focusTrapPaused: {
      type: Boolean,
      default: false
    },
    getApplicationNode: {
      type: Function,
      required: true
    },
    includeDefaultStyles: {
      type: Boolean,
      default: true
    },
    initialFocus: null,
    scrollDisabled: {
      type: Boolean,
      default: true
    },
    titleId: String,
    titleText: String,
    underlayClass: String,
    underlayClickExits: {
      type: Boolean,
      default: true
    },
    underlayColor: {
      type: String,
      default: 'rgba(0,0,0,0.5)'
    },
    underlayAttrs: {
      type: Object,
      default: () => {}
    },
    underlayStyle: String,
    verticallyCenter: Boolean,
  },

  watch: {
    scrollDisabled(val, oldVal) {
      if (oldVal && !val) {
        NoScroll.off();
      } else if (!oldVal && val) {
        NoScroll.on();
      }
    },

    escapeExits(val, oldVal) {
      if (val && !oldVal) {
        this.addKeyDownListener();
      } else if (!val && oldVal) {
        this.removeKeyDownListener();
      }
    },
  },

  methods: {
    addKeyDownListener() {
      setTimeout(() => {
        document.addEventListener('keydown', this.checkDocumentKeyDown);
      });
    },

    removeKeyDownListener() {
      setTimeout(() => {
        document.removeEventListener('keydown', this.checkDocumentKeyDown);
      });
    },

    checkUnderlayClick(event) {
      if (
        (this.$refs.dialog && this.$refs.dialog.contains(event.target)) ||
        // If the click is on the scrollbar we don't want to close the modal.
        event.pageX > event.target.ownerDocument.documentElement.offsetWidth ||
        event.pageY > event.target.ownerDocument.documentElement.offsetHeight
      )
        return;
      this.exit(event);
    },

    checkDocumentKeyDown(event) {
      if (
        this.$props.escapeExits &&
        (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27)
      ) {
        this.exit(event);
      }
    },

    exit(event) {
      this.$emit('exit', event);
    },
  },

  beforeMount() {
    if (!this.$props.titleText && !this.$props.titleId) {
      throw new Error(
        'aria-modal instances should have a `titleText` or `titleId`'
      );
    }
  },

  mounted() {
    this.$emit('enter');

    // Timeout to ensure this happens *after* focus has moved
    const applicationNode = this.getApplicationNode();
    setTimeout(() => {
      if (applicationNode) {
        applicationNode.setAttribute('aria-hidden', 'true');
      }
    }, 0);

    if (this.$props.escapeExits) {
      this.addKeyDownListener();
    }

    if (this.$props.scrollDisabled) {
      NoScroll.on();
    }
  },

  beforeDestroy() {
    if (this.$props.scrollDisabled) {
      NoScroll.off();
    }
    const applicationNode = this.getApplicationNode();
    if (applicationNode) {
      applicationNode.setAttribute('aria-hidden', 'false');
    }
    this.removeKeyDownListener();
  },

};
</script>
