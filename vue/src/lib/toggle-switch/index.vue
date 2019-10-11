<template>
  <div class="md-input-container md-toggle-switch">
    <input
      class="md-input md-toggle-switch__input"
      type="checkbox"
      :disabled="disabled"
      :aria-checked="isToggleOn"
      :checked="isToggleOn"
      :name="name"
      :value="value"
      :id="htmlId"
      @change="handleChange"
      tabindex="0"
      @click="handleClick"
    />
    <label class="md-toggle-switch__label" :for="htmlId">
      <span class="md-toggle-switch__label__container" />
      <span class="md-toggle-switch__label__text">{{ label }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'md-toggle-switch',

  data() {
    return {
      isToggleOn: this.checked
    }
  },

  props: {
    /** @prop Set the toggle switch to checked | false */
    checked: Boolean,
    /** @prop Set the toggle switch to disabled | false */
    disabled: Boolean,
    /** @prop Unique HTML ID used for tying label to HTML input for automated testing */
    htmlId: {
      type: String,
      required: true
    },
    /** @prop Sets the label string for the toggle switch | '' */
    label: {
      type: String,
      required: true
    },
    /** @prop Sets the name of the toggle switch | '' */
    name: {
      type: String,
      default: ''
    },
    /** @prop Sets the value of the toggle switch | '' */
    value: {
      type: String,
      default: ''
    },
  },

  methods: {
    handleClick(event) {
      this.isToggleOn = !this.isToggleOn;
    },

    handleChange(event) {
      this.$emit('change', event);
    }
  },
};
</script>
