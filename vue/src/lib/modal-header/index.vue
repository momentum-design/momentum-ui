<template>
  <div class="md-modal__header">
    <slot></slot>
    <span v-if="!$slots.default" class="md-modal__title">{{ headerLabel }}</span>
    <span v-if="!$slots.default && message" class="md-modal__message">{{ message }}</span>
    <md-close-icon
      v-if="showCloseButton"
      class="md-modal__close"
      @click="handleClose"
      v-bind="closeBtnProps"
    />
  </div>
</template>

<script>
export default {
  name: 'md-modal-header',

  inject: {
    close: {
      default: null
    }
  },

  props: {
    /** @prop Props to be passed to close button | null */
    closeBtnProps: Object,
    /** @prop ModalHeader label text | '' */
    headerLabel: {
      type: String,
      default: ''
    },
    /** @prop Modal message | '' */
    message: {
      type: String,
      default: ''
    },
    /** @prop show/hide close button | true */
    showCloseButton: {
      type: Boolean,
      default: true
    },
  },

  methods: {
    handleClose(e) {
      this.close && this.close(e);
    }
  },

};
</script>
