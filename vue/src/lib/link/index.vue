<script>
export default {
  name: 'md-link',

  render(h) {
    return h(
      this.tag,
      {
        class: 'md-link' +
          `${(this.color && ` md-link--${this.color}`) || ''}` +
          `${(this.theme && ` md-link--${this.theme}`) || ''}`,
        attrs: {
          disabled: this.disabled,
          tabindex: !this.disabled ? 0 : null,
        }
      },
      this.$slots.default
    );
  },

  props: {
    /** @prop Optional color css styling | 'blue' */
    color: {
      type: String,
      default: 'blue'
    },
    /** @prop Sets the attribute disabled to the Link | false */
    disabled: Boolean,
    /** @prop Set HTML tag type | 'a' */
    tag: {
      type: String,
      default: 'a',
      validator: val => ['a', 'div', 'span'].indexOf(val) !== -1
    },
    /** @prop Set Link theme | ''  */
    theme: {
      type: String,
      default: ''
    },
  }
};
</script>
