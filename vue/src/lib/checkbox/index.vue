<template>
  <div
    :class="[
      'md-input-container md-checkbox',
      nestedLevel ? `md-input--nested-${nestedLevel}` : ''
    ]"
  >
    <input
      :aria-checked="checked"
      :class="[
        'md-input md-checkbox__input',
        { indeterminate: indeterminate }
      ]"
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      :id="htmlId"
      :name="name"
      :ref="inputRef"
      :required="required"
      tabindex="0"
      :value="value"
      v-bind="$attrs"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.enter="handleKeydown"
    />
    <md-label
      class="md-checkbox__label"
      :label="label"
      :htmlFor="htmlId"
    />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'md-checkbox',

  props: {
    /** @prop Sets Checkbox status as checked | false */
    checked: Boolean,
    /** @prop Sets the attribute disabled to the Checkbox | false */
    disabled: Boolean,
    /** @prop Unique HTML ID. Used for tying label to HTML input. Handy hook for automated testing */
    htmlId: {
      type: String,
      required: true
    },
    /** @prop Optional indeterminate capabilities of checkbox | false */
    indeterminate: Boolean,
    /** @prop optional ref attribute for Checkbox input element | 'input' */
    inputRef: {
      type: String,
      default: 'input'
    },
    /** @prop Required label string for Checkbox */
    label: {
      type: String,
      required: true
    },
    /** @prop Sets the attribute name to the Checkbox input element | '' */
    name: {
      type: String,
      default: ''
    },
    /** @prop Set the level of nested checkboxes | 0 */
    nestedLevel: {
      type: [Number, String],
      default: 0
    },
    /** @prop Optional required setting for Checkbox input | false */
    required: Boolean,
    /** @prop sets value of the Checkbox input element | '' */
    value: {
      type: String,
      default: ''
    },
  },

  inject: {
    change: {
      default: null
    }
  },

  methods: {
    getInput() {
      return this.$refs[this.inputRef];
    },

    handleChange() {
      const input = this.getInput();
      if (!input) return;
      this.$emit('change', {...this.$props, checked: input.checked});
      this.change && this.change(this.value);
    },

    handleFocus(e) {
      this.$emit('focus', e);
    },

    handleBlur(e) {
      this.$emit('blur', e);
    },

    handleKeydown(e) {
      const input = this.getInput();
      if (!input) return;
      input.checked = !input.checked;
      this.handleChange();
    },
  },
};
</script>
