<script>
export default {
  name: 'md-modal',

  data() {
    return {
      animationClass: '',
    }
  },

  provide () {
    return {
      close: this.closeModal
    }
  },

  render(h) {
    const {
      applicationId,
      backdrop,
      backdropClickExit,
      className,
      escapeExits,
      focusDialog,
      htmlId,
      show,
      size,
      ...props
    } = this.$props;

    const modalContent = (
      <div class="md-modal__content">
        <div class="md-modal__flex-container">
          {this.$slots.default}
        </div>
      </div>
    );

    const getModal = () => {
      return show
        &&
        <md-aria-modal
          onExit={this.closeModal}
          getApplicationNode={() => document.querySelector(`#${applicationId}`)}
          dialogClass={
            `md-modal` +
            ` md-modal--${size}` +
            ` ${this.animationClass}` +
            `${(className && ` ${className}`) || ''}`
          }
          includeDefaultStyles={false}
          titleId={htmlId}
          underlayClass={
            backdrop
              ? `md-modal__backdrop fade` + ` ${this.animationClass}`
              : ''
          }
          underlayClickExits={backdropClickExit}
          escapeExits={escapeExits}
          focusDialog={focusDialog}
          {...{props: props}}
        >
          {modalContent}
        </md-aria-modal>;
      };

    return (
      getModal()
    );
  },

  props: {
    /** @prop application DOM id, used to set aria-hidden to true when modal is open */
    applicationId: {
      type: String,
      required: true
    },
    /** @prop Determines the visibility and ability to edit the backdrop of the Modal | true */
    backdrop: {
      type: Boolean,
      default: true
    },
    /** @prop To enable/disable clicking on underlay to exit modal | false */
    backdropClickExit: Boolean,
    /** @prop Optional css class names | '' */
    className: String,
    /** @prop To enable/disable escape to exit modal | true */
    escapeExits: {
      type: Boolean,
      default: true
    },
    /** @prop To set focus to the entire modal rather than elements within modal | true */
    focusDialog: {
      type: Boolean,
      default: true
    },
    /** @prop Unique HTML ID used for tying label to HTML input for automated testing */
    htmlId: {
      type: String,
      required: true
    },
    /** @prop Show/hide modal */
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    /** @prop Size of the modal | 'default' */
    size: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['large', 'medium', 'default', 'small', 'full', 'dialog'].indexOf(value) !== -1
      }
    },
  },

  watch: {
    show(val, oldVal) {
      oldVal !== val
        && val
        && this.setAnimationState(true);
    }
  },

  methods: {
    setAnimationState(isOpen) {
      this.animationClass = isOpen ? 'in' : '';
    },

    closeModal(e) {
      this.setAnimationState();

      return setTimeout(() => {
        this.$emit('hide', e);
      }, 300);
    },
  },
};
</script>
