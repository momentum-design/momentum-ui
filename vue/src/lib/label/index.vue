<script>
export default {
  name: 'md-label',

  render: function (h) {
    const {
      className,
      htmlFor,
      label,
      theme,
      ...props
    } = this.$props;

    return (
      <label
        class={
          `${className ? `${className}` : ''}` +
          `${theme ? ` md-label--${theme}` : ''}`
        }
        for={htmlFor}
        {...props}
      >
        {
          label
          ? <span>{label}</span>
          : this.$slots.default
        }
      </label>
    )
  },

  props: {
    /** @prop HTML class name for associated Input | '' */
    className: {
      type: String,
      default: ''
    },
    /** @prop HTML ID for associated Input | null */
    htmlFor: {
      type: String,
      required: true
    },
    /** @prop Required Label text | null */
    label: String,
    /** @prop Set Label's color theme | '' */
    theme: {
      type: String,
      default: ''
    },
  }
};
</script>
