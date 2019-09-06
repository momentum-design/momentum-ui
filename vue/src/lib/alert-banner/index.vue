<template>
  <div
    v-if="show"
    class="md-alert-banner"
    :class="[`md-alert-banner--${type}`]"
  >
    <div class="md-alert-banner__text">
      <slot></slot>
    </div>
    <div
      v-if="closable"
      class="md-alert-banner__close"
      @click="handleClick"
      @keydown="handleKeydown"
      v-bind="closeBtnProps"
      :role="$listeners.hide || $listeners.keydown ? 'button' : null"
      :tabindex="$listeners.hide || $listeners.keydown ? 0 : -1"
    >
      <md-icon name="cancel_16"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'md-alert-banner',

  props: {
    /** @prop Sets the visibility of AlertBanner's close button | false */
    closable: Boolean,
    /** @prop Props to be passed to close button | null */
    closeBtnProps: Object,
    /** @prop Set AlertBanner visibility */
    show: {
      type: Boolean,
      required: true
    },
    /** @prop Sets the AlertBanner type | 'info' */
    type: {
      type: String,
      default: 'info',
      validator: (value) => {
        return ['info', 'warning', 'error'].indexOf(value) !== -1
      }
    },
  },

  methods: {
    handleClick(e) {
      this.$emit('hide', e);
    },

    handleKeydown(e) {
      if (
        e.which === 32
        || e.keyCode === 32
        || e.which === 13
        || e.keyCode === 13
        ) {
        this.$emit('hide', e);
        e.preventDefault();
      }

      this.$emit('keydown', e);
    },
  },
};
</script>
