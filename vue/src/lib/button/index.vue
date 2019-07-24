<script>
export default {
  name: 'md-button',

  render: function (h) {
    const isButtonGroupIcon = () => (
      this.isButtonGroup
        && this.$slots.default
        && this.$slots.default.reduce((prev, child) =>
          prev
            ? prev
            : child.componentOptions && child.componentOptions.tag === 'md-icon'
        , false)
    );

    const getChildren = () => {
      return (
        [
          this.loading &&
          <div key='child-0'>
            <md-loading></md-loading>
          </div>,
          <span
            class='md-button__children'
            style={{ opacity: `${this.loading ? 0 : 1}` }}
            key='child-1'
          >
            {this.$slots.default}
          </span>
        ]
      );
    };

    const getColor = () => {
      if (this.removeStyle) return false;

      return this.color === 'none' ? 'color-none' : this.color;
    };

    const getSize = () => {
      if (this.removeStyle) return false;

      const validButtonSize = checkButtonSize();

      if (!this.circle && !validButtonSize) {
        console.warn('[@momentum-ui/vue] Button: selected size is not supported for non-circular button. Size will default to 36');
        return '36';
      } else {
        return this.size === 'none' ? 'size-none' : this.size;
      }
    };

    const checkButtonSize = () => (
      ['none', '28', '36', '40', '52', 28, 36, 40, 52].includes(this.size)
    );

    const button = h(
      this.tag,
      {
        ref: 'button',
        class:
          'md-button' +
          `${(this.circle && ` md-button--circle`) || ''}` +
          `${(isButtonGroupIcon() && ` md-button--icon-group`) || ''}` +
          `${(getSize() && ` md-button--${getSize()}`) || ''}` +
          `${(this.expand && ` md-button--expand`) || ''}` +
          `${(this.color && ` md-button--${getColor()}`) || ''}` +
          `${(this.removeStyle && ' md-button--none') || ''}` +
          `${(this.active && !this.disabled && ` active`) || ''}` +
          `${(this.className && ` ${this.className}`) || ''}`,
        on: {
          click: this.handleClick,
          keydown: this.handleKeyDown,
        },
        style: this.cssStyle,
        attrs: {
          'aria-label': this.ariaLabel ? this.ariaLabel : undefined,
          'aria-labelledby': !this.ariaLabel ? this.ariaLabelledBy : undefined,
          disabled: this.disabled || this.loading,
          alt: this.ariaLabel || this.label,
          href: (this.tag === 'a' && this.href) || undefined,
          type: this.tag !== 'a' && this.type || '',
          tabindex: (typeof this.index !== 'number' || this.index === this.group.focusIndex) ? 0 : -1,
          role: 'button',
        },
      },
      getChildren()
    );

    return (
      this.label
      ?
      <div
        class={`md-button__container${this.containerLarge ? '' : '--small'}`}
      >
        {button}
        <div class='md-button__label'>
          {this.label}
        </div>
      </div>
      :
      button
    )
  },

  inject: {
    group: {
      default: {}
    },
    click: {
      default: null
    },
    keydown: {
      default: null
    }
  },

  props: {
    /** @prop Sets active css styling | false */
    active: Boolean,
    /** @prop Text to display for blindness accessibility features | '' */
    ariaLabel: {
      type: String,
      default: ''
    },
    /** @prop ID to reference for blindness accessibility feature | '' */
    ariaLabelledBy: {
      type: String,
      default: ''
    },
    /** @prop Sets circle css styling | false */
    circle: Boolean,
    /** @prop Optional css class string | '' */
    className: {
      type: String,
      default: ''
    },
    /** @prop Sets optional Button color | '' */
    color: {
      type: String,
      default: ''
    },
    /** @prop Sets containerLarge css styling | false */
    containerLarge: Boolean,
    /** @prop Sets the attribute disabled to Button | false */
    disabled: Boolean,
    /** @prop Sets expand css styling to widen the Button | false */
    expand: Boolean,
    /** @prop Href prop changes element to anchor element | '' */
    href: {
      type: String,
      default: ''
    },
    /** @prop This index is used to control focus of Button within a ButtonGroup | null */
    index: Number,
    /** @prop Determines whether class should be applied to ButtonGroups with Icons as descendants | false */
    isButtonGroup: Boolean,
    /** @prop Text to display inside the button | '' */
    label: {
      type: String,
      default: ''
    },
    /** @prop Activates the loading animation and sets the button to disabled | false */
    loading: Boolean,
    /** @prop Optional prop to remove Button's default style | false */
    removeStyle: Boolean,
    /** @prop Optional string or number size prop | 36 */
    size: {
      type: [String, Number],
      default: 36
    },
    /** @prop Additional css styling applied to the button | {} */
    cssStyle: {
      type: Object,
      default: function () {
        return {}
      }
    },
    /** @prop Optional tag to define type of element | 'button' */
    tag: {
      type: String,
      default: 'button',
      validator: function (value) {
        return ['button', 'input', 'a'].indexOf(value) !== -1
      }
    },
    /** @prop Optional html type | 'button' */
    type: {
      type: String,
      default: 'button',
      validator: function (value) {
        return ['button', 'reset', 'submit'].indexOf(value) !== -1
      }
    },
  },

  mounted() {
    (!this.ariaLabel && !this.ariaLabelledBy)
      &&
      console.warn('[@momentum-ui/vue] Button: Accessibility could be improved with ariaLabel');

    this.group.focusOnLoad
      && this.group.focusIndex === this.index
      && this.$refs.button.focus();
  },

  updated() {
    typeof this.index === 'number'
      && this.index === this.group.focusIndex
      && this.$refs.button.focus();
  },

  methods: {
    handleClick(e) {
      this.$emit('click', e);
      this.click && this.click(e, this.index);
    },

    handleKeyDown(e) {
      if (e.which === 32 || e.which === 13 ||
          e.keyCode === 32 || e.keyCode === 13) {
        this.click && this.click(e, this.index);
        this.$emit('click', e);
        e.preventDefault();
      } else {
        this.keydown && this.keydown(e, this.index);
      }
    },
  }

};
</script>
