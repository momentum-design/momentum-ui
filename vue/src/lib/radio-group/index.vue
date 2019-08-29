<script>
import cloneElement from '../utils/cloneElement';

export default {
  name: 'md-radio-group',

  data() {
    return {
      activeValue: this.value
    }
  },

  render: function (h) {
    const { name } = this.$props;

    const addHandlersToChildren = () => {
      return this.$slots.default.map((child, idx) => {
        if (child.componentOptions) {
          const checked = this.activeValue === child.componentOptions.propsData.value;
          return cloneElement(child, h, {
              props: {
                name: name,
                checked: checked
              }
            });
        } else {
          return child;
        }
      });
    };

    return <div class="md-radio-group">{addHandlersToChildren()}</div>;
  },

  provide () {
    return {
      change: this.handleToggle,
    }
  },

  props: {
    /** @prop An HTML `<input>` name for each child button | '' */
    name: String,
    /** @prop Value of the active (pressed) button | [] */
    value: [String, Number],
  },

  methods: {
    handleToggle(value) {
      this.activeValue = value;
      this.$emit('change', value);
    }
  },
};
</script>
