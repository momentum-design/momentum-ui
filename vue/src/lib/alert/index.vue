<template>
  <div
    v-if="show"
    class="md-alert"
    :class="[`md-alert--${type}`]"
  >
    <div class="md-alert__icon" />
    <div class="md-alert__content">
      <div class="md-alert__title">
        {{ title }}
      </div>
      <div class="md-alert__message">
        {{ message }}
      </div>
    </div>
    <div v-if="closable" class="md-alert__button">
      <md-button
        circle
        size="44"
        v-on="dismissBtnEvents"
        v-bind="dismissBtnProps"
      >
        <md-icon name="cancel_16" />
      </md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'md-alert',

  props: {
    /** @prop To show/hide Close button of the Alert | true */
    closable: {
      type: Boolean,
      default: true
    },
    /** @prop Events to be passed to dismiss button | null */
    dismissBtnEvents: Object,
    /** @prop Props to be passed to dismiss button | null */
    dismissBtnProps: Object,
    /** @prop Optional Alert message | '' */
    message: {
      type: String,
      default: ''
    },
    /** @prop Set Alert visibility */
    show: {
      type: Boolean,
      required: true
    },
    /** @prop Optional Alert title | '' */
    title: {
      type: String,
      default: ''
    },
    /** @prop Sets the type of the Alert | 'info' */
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['info', 'success', 'warning', 'error'].indexOf(value) !== -1
    },
  },
};
</script>
