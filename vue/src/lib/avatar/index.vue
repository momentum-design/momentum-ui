<script>
export default {
  name: 'md-avatar',

  data() {
    return {
      isImageLoaded: false,
      isImageErrored: false
    }
  },

  render(h) {
    const {
      alt,
      backgroundColor,
      buttonClassName,
      className,
      color,
      failureBadge,
      hasNotification,
      hideDefaultTooltip,
      isDecrypting,
      isOverview,
      size,
      src,
      theme,
      title,
      type,
    } = this.$props;
    const {
      isImageLoaded,
      isImageErrored
    } = this.$data;
    const onClick = this.$listeners.click;
    const icon = this.$slots.icon && this.$slots.icon[0];

    const getInitials = () => {
      if (!title.replace(/\s/g, '').length) return '';
      let letters = [];
      const words = title.trim().split(/ +/);
      const repeatTimes = Math.min(type === 'group' && 1 || 2, words.length);
      for (let i = 0; i < repeatTimes; i++) {
        letters.push(String.fromCodePoint(words[i].codePointAt(0)));
      }
      return letters.join('');
    };

    const getIcon = () => {
      if (icon && icon.componentOptions && icon.componentOptions.tag === 'md-icon') {
        return (
          <span
            class={
              'md-avatar__icon' +
              `${isOverview ? ' md-avatar__icon--overview' : ''}`
            }
            style={{ backgroundColor, color }}
          >
            {icon}
          </span>
        );
      }
      throw new Error('Icon slot should be a component of type Icon');
    };

    const getLetter = () => {
      return (
        <span
          key='letter'
          class={
            'md-avatar__letter' +
            `${(isDecrypting && ` md-decrypting`) || ''}` +
            `${(isImageLoaded && ` md-avatar__img--hidden`) || ''}`
            }
          style={{ backgroundColor, color }}
        >
          {getInitials()}
        </span>
      );
    };

    const getChildren = () => {
      if(type === 'self') {
        return (
          <span
            key='self'
            class='md-avatar__self'
            style={{ backgroundColor, color }}
          >
            <md-icon name={size === 40 || size === 'medium' ? 'chat-active_18' : 'chat-active_16'} />
          </span>
        );
      } else if (src && !isImageErrored) {
      // image src is present and image has not yet errored
        const imgChildren = [];
         // image is not loaded and title is provided
        if (title && !isImageLoaded) {
          imgChildren.push(getLetter());
        }
        imgChildren.push(
          <img
            alt={alt}
            class={
              `md-avatar__img` +
              `${(!isImageLoaded && ` md-avatar__img--hidden`) || ''}`
            }
            draggable={false}
            key={`image-${imgChildren.length}`}
            onError={this.handleImgError}
            onLoad={this.handleImgLoaded}
            src={src}
            ref='image'
          />
        );
        return imgChildren;
      } else if (icon) {
        return getIcon();
      } else if (title) {
        return getLetter();
      }
    };

    const avatar = h('div',
      {
        class: 'md-avatar' +
          `${(onClick && ` md-avatar--clickable`) || ''}` +
          `${(type && ` md-avatar--${type}`) || ''}` +
          `${(size && ` md-avatar--${size}`) || ''}` +
          `${(theme && ` md-avatar--${theme}`) || ''}` +
          `${(isDecrypting && ` md-decrypting`) || ''}` +
          `${(className && ` ${className}`) || ''}`,
        attrs: {
          title: !hideDefaultTooltip ? title : '',
          ...!onClick && {...this.$attrs}
        }
      },
      [
        getChildren(),
        type === 'typing' && <md-loading/>,
        failureBadge && <span class='md-avatar__failure-badge' />,
        hasNotification && <span class='md-avatar__notification-badge' />
      ]
    );

    const button = h('md-button',
      {
        props: {
          className: buttonClassName,
          circle: true,
          removeStyle: true,
          ...this.$attrs
        },
        on: {
          click: onClick
        },
        attrs: {
          ...this.$attrs
        }
      },
      [ avatar ]
    );

    return (
      onClick ? button : avatar
    );
  },

  props: {
    /** @prop Image alt tag | '' */
    alt: {
      type: String,
      default: ''
    },
    /** @prop Set Avatar background color | '' */
    backgroundColor: {
      type: String,
      default: ''
    },
    /** @prop Optional css class string for button | '' */
    buttonClassName: {
      type: String,
      default: ''
    },
    /** @prop Optional css class string for Avatar component | null */
    className: String,
    /** @prop Set Avatar text color | '' */
    color: {
      type: String,
      default: ''
    },
    /** @prop Set existance of a failureBadge on the Avatar | false */
    failureBadge: Boolean,
    /** @prop Set existance of a notification on the Avatar | false */
    hasNotification: Boolean,
    /** @prop Set the visibility of Avatar's default tooltip | false */
    hideDefaultTooltip: Boolean,
    /** @prop Set if Avatar's content is decrypting | false */
    isDecrypting: Boolean,
    /** @prop Set existance of Avatar's Overview | false */
    isOverview: Boolean,
    /** @prop Set the size of the Avatar from one of the preconfigured options | 'medium' */
    size: {
      type: [Number, String],
      default: 'medium',
      validator: val => [
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        18,
        24,
        28,
        36,
        40,
        44,
        52,
        56,
        72,
        80,
        84
      ].indexOf(val) !== -1
    },
    /** @prop Optional image source for the Avatar | null */
    src: String,
    /** @prop Optional Avatar color theme | null */
    theme: String,
    /** @prop set Avatar title / user's name | null */
    title: String,
    /** @prop optional Avatar type | '' */
    type: {
      type: String,
      default: '',
      validator: val => [
        '',
        'active',
        'bot',
        'call',
        'dnd',
        'group',
        'inactive',
        'meeting',
        'ooo',
        'presenting',
        'self',
        'typing'
      ].indexOf(val) !== -1
    },
  },

  watch: {
    src(val) {
      this.handleImgChange();
    }
  },

  mounted() {
    const img = this.$refs.image;
    if (img && img.complete) {
      this.handleImgLoaded();
    }
  },

  methods: {
    handleImgChange() {
      this.isImageLoaded = false;
      this.isImageErrored = false;
    },

    handleImgError() {
      this.isImageErrored = true;
    },

    handleImgLoaded() {
      this.isImageLoaded = true;
    },
  },
};
</script>
