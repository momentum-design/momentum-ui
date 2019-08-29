<script>
import cloneElement from '../utils/cloneElement';

export default {
  name: 'md-checkbox-group',

  data() {
    return {
      activeValues: this.values
    }
  },

  render: function (h) {
    const { name } = this.$props;

    const addHandlersToChildren = () => {
      return this.$slots.default.map((child, idx) => {
        if (child.componentOptions) {
          const checked = this.activeValues.includes(child.componentOptions.propsData.value);
          return cloneElement(child, h, {
              name: name,
              checked: checked,
              attrs: {
                'aria-checked': checked,
              }
            });
        } else {
          return child;
        }
      });
    };

    return <div class="md-checkbox-group">{addHandlersToChildren()}</div>;
  },

  provide () {
    return {
      change: this.handleToggle,
    }
  },

  props: {
    /** @prop An HTML `<input>` name for each child button | '' */
    name: String,
    /** @prop An array of values, of the active (pressed) buttons | [] */
    values: {
      type: Array,
      default: () => []
    },
  },

  methods: {
    handleToggle(value) {
      let newValues;
      const isActive = this.activeValues.includes(value);

      if (isActive) {
        newValues = this.activeValues.filter(v => v !== value);
      } else {
        newValues = this.activeValues.concat(value);
      }
      this.activeValues = newValues;
      this.$emit('change', newValues);
    }
  },
};
</script>
