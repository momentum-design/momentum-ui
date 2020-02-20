<script>
export default {
  name: 'md-topbar-mobile',

  data() {
    return {
      isMobileOpen: false,
    }
  },

  inject: {
    getBrandNode: {
      default: null
    }
  },

  render(h) {
    const {
      closeMenuAriaLabel,
      shouldCloseOnClick,
      openMenuAriaLabel,
      ...otherProps
    } = this.$props;
    const { isMobileOpen } = this.$data;

    const mobileButton = (
      <md-icon
        name='list-menu_20'
        buttonClassName='md-top-bar__mobile-menu-button'
        onClick={this.handleOpen}
        ariaLabel={openMenuAriaLabel}
        aria-pressed={isMobileOpen}
      />
    );

    const passClickHandlerToChildren = this.$slots.default && this.$slots.default.map(child => {
      child.data.on = { ...child.data.on, click: this.handleClose };
      child.data.nativeOn = { ...child.data.nativeOn, click: this.handleClose };
      return child;
    });

    return (
      <div>
        {!isMobileOpen && mobileButton}
        <div
          class={
            `md-top-bar__mobile md-tb-mobile` +
            `${isMobileOpen ? ' open' : ''}`
          }
          onClick={() => shouldCloseOnClick ? this.handleClose : null}
          onKeydown={this.handleKeyDown}
          role='menu'
          tabindex={0}
          {...{props: otherProps}}
        >
          <md-icon
            name='cancel_20'
            buttonClassName={`md-tb-mobile__close`}
            aria-pressed={isMobileOpen}
            onClick={this.handleClose}
            ariaLabel={closeMenuAriaLabel}
          />
          {/* eslint-disable jsx-a11y/no-static-element-interactions */}
          <span onClick={this.handleClose} onKeydown={this.handleKeyDown}>{this.$slots.brand || this.getBrandNode && this.getBrandNode()}</span>
          {/* eslint-enable jsx-a11y/no-static-element-interactions */}
          <md-list-separator />
          <nav class={`md-tb-mobile__nav`}>
            {!shouldCloseOnClick && passClickHandlerToChildren || this.$slots.default}
          </nav>
        </div>
        <div
          class={`md-tb-mobile__mask` + `${isMobileOpen ? ' open' : ''}`}
          onClick={this.handleClose}
          role='none'
        />
      </div>
    );
  },

  props: {
    /** @prop Aria Label for close Button | 'Close Menu' */
    closeMenuAriaLabel: {
      type: String,
      default: 'Close Menu'
    },
    /** @prop Set mobile menu to close on any click | true */
    shouldCloseOnClick: {
      type: Boolean,
      default: true
    },
    /** @prop Aria Label for open Button | 'Open Menu' */
    openMenuAriaLabel: {
      type: String,
      default: 'Open Menu'
    },
  },

  methods: {
    handleClose() {
      this.isMobileOpen = false;
    },

    handleOpen() {
      this.isMobileOpen = true;
    },

    handleKeyDown(e) {
      if (
        e.which === 32
          || e.which === 13
          || e.charCode === 32
          || e.charCode === 13
        ) {
        this.handleClose();
        e.preventDefault();
      }
    },
  },
};
</script>
