<template>
  <div
    :class="[
      'md-input-group md-radio',
      nestedLevel ? `md-input--nested-${nestedLevel}` : ''
    ]"
  >
    <input
      :aria-checked="checked"
      class="md-input md-radio__input"
      type="radio"
      :checked="checked"
      :disabled="disabled"
      :id="htmlId"
      :name="name"
      :ref="inputRef"
      :required="required"
      :tabindex="tabIndex"
      :value="value"
      v-bind="$attrs"
      @change="handleChange"
      @keydown.enter="handleKeydown"
    />
    <md-label
      class="md-radio__label"
      :label="label"
      :htmlFor="htmlId"
    />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'md-radio',

  props: {
    /** @prop Sets Radio button status as checked | false */
    checked: Boolean,
    /** @prop Sets the attribute disabled to the Radio button | false */
    disabled: Boolean,
    /** @prop Unique HTML ID. Used for tying label to HTML input. Handy hook for automated testing */
    htmlId: {
      type: String,
      required: true
    },
    /** @prop optional ref attribute for Radio button input element | 'input' */
    inputRef: {
      type: String,
      default: 'input'
    },
    /** @prop Radio label text | '' */
    label: {
      type: String,
      default: ''
    },
    /** @prop Sets the attribute name to the Radio button input element | '' */
    name: {
      type: String,
      default: ''
    },
    /** @prop Set the level of nested radioes | 0 */
    nestedLevel: {
      type: Number,
      default: 0
    },
    /** @prop Optional required setting for Radio button input | false */
    required: Boolean,
    /** @prop Set the tabIndex of radio | 0 */
    tabIndex: {
      type: Number,
      default: 0
    },
    /** @prop sets value of the Radio button input element | '' */
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

    handleKeydown(e) {
      const input = this.getInput();
      if (!input) return;
      input.checked = true;
      this.handleChange();
    },
  },
};
</script>
