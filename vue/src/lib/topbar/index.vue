<script>
export default {
  name: 'md-topbar',

  provide() {
    return {
      getBrandNode: () => this.$slots.brand,
    }
  },

  render(h) {
    const {
      anchor,
      color,
      fixed,
      icon,
      title,
      ...otherProps
    } = this.$props;

    const topBarClass = `md-top-bar`;
    const brandClass = `md-brand`;

    const brandNodeChildren = ([
      <div class={`${brandClass}__logo`} key={`${brandClass}__logo`}>
        {this.$slots.image || <i class={`icon ${icon}`} />}
      </div>,
      <div class={`${brandClass}__title`} key={`${brandClass}__title`}>
        {title}
      </div>
    ]);

    const getBrandAnchor = () => (
      this.$slots.brand || <a class={brandClass} href={anchor}>{brandNodeChildren}</a>
    );

    const brandNode = (
      <div class={`${topBarClass}__brand`}>
        {getBrandAnchor()}
      </div>
    );

    return (
      <div
        class={
          `${topBarClass}` +
          `${fixed && ` ${topBarClass}--fixed` || ''}` +
          `${color && ` ${topBarClass}--${color}` || ''}`
        }
        role='navigation'
        {...{props: otherProps}}
      >
        <div class={`${topBarClass}__container`}>
          {brandNode}
          {this.$slots.default}
        </div>
      </div>
    );
  },

  props: {
    /** @prop App Url/Link | null */
    anchor: String,
    /** @prop Topbar header color | '' */
    color: {
      type: String,
      default: ''
    },
    /** @prop Determines if Topbar is fixed to top | false */
    fixed: Boolean,
    /** @prop Icon class name | 'icon-cisco-logo' */
    icon: {
      type: String,
      default: 'icon-cisco-logo'
    },
    /** @prop Topbar title text | '' */
    title: {
      type: String,
      default: ''
    },
  }
};
</script>
