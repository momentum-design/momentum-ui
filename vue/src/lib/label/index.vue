<script>
export default {
  name: 'md-label',

  render: function (h) {
    const {
      htmlFor,
      label,
      theme,
      ...props
    } = this.$props;

    return (
      <label
        class={`${theme ? ` md-label--${theme}` : ''}`}
        for={htmlFor}
        {...{props: props}}
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
