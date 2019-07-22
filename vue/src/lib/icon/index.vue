<script>
import iconNames from '@momentum-ui/icons/data/iconNames.json';
import getColorValue from '@momentum-ui/utils/lib/getColorValue';

export default {
  name: 'md-icon',

  render: function (h) {
    const {
      append,
      ariaLabel,
      buttonClassName,
      color,
      className,
      description,
      name,
      prepend,
      size,
      sizeOverride,
      cssStyle,
      title,
      type,
      ...otherProps
    } = this.$props;

    const consoleHandler = (message, data) => {
      /* eslint-disable no-console */
      switch (message) {
        case 'color-warn':
          console.warn(
            `[@momentum-ui/react] Icon: ${data} may not exist in the design system,` +
              ` please use a color name from https://momentum.design/styles/color/style`
          );
          break;
        case 'name-error':
          console.warn(
            `[@momentum-ui/react] Icon: Icon ${data} does not exist in the design system.` +
              ` Visit https://momentum.design/styles/icons/library for a list of available icons or to request a new icon.`
          );
          break;
      }
      /* eslint-enable no-console */
    };

    const getSize = () => {
      const defaultSize = 16;
      const sizeFromName = Number(name.split('_')[1]);
      return size || sizeFromName || defaultSize;
    };

    const getColor = () => {
      if (color.startsWith('#')) {
        consoleHandler('color-warn', color);
        return color;
      }

      return getColorValue(color);
    };

    const getNameClass = () => {
      let iconName = name.startsWith('icon-') ? name.replace(/^(icon-)/, '') : name;
      if (sizeOverride) {
        iconName = name.split('_')[0] + `_${getSize()}`;
      }
      return iconNames.includes(iconName) ? `icon-${iconName}` : consoleHandler('name-error', iconName);
    };

    const styles = {
      fontSize: `${getSize()}px`,
      ...color && { color: getColor() },
      ...cssStyle,
    };

    const getAriaLabel = () => {
      if (ariaLabel) {
        return ariaLabel;
      }
      if (!ariaLabel) {
        if (title && description) return `${title} ${description}`;
        if (title) return title;
        if (description) return description;
      }
      return null;
    };

    const getIcon = () => {
      return (
        <i
          class={
            `md-icon icon` +
            ` ${getNameClass()}` +
            `${(className && ` ${className}`) || ''}` +
            `${(prepend && ` md-prepend`) || ''}` +
            `${(append && ` md-append`) || ''}`
          }
          aria-label={!this.$listeners.click ? getAriaLabel() : null}
          style={styles}
          {...!this.$listeners.click && { ...otherProps }}
        />
      );
    };

    const button = h(
      'md-button',
      {
        class:
          'md-button--icon' +
          `${(type && ` md-button--icon-${type}`) || ''}` +
          `${(buttonClassName && ` ${buttonClassName}`) || ''}`,
        on: {
          click: this.handleClick,
        },
        attrs: {
          'aria-label': getAriaLabel(),
          ...otherProps
        },
      },
      [
        getIcon(),
      ]
    );

    return (
      this.$listeners.click ? button : getIcon()
    )
  },

  props: {
    /** @prop Add margin to the left of Icon | false */
    append: Boolean,
    /** @prop Text to display for blindness accessibility features | null */
    ariaLabel: String,
    /** @prop Optional Button class name string | '' */
    buttonClassName: {
      type: String,
      default: ''
    },
    /** @prop Optional color css styling | '' */
    color: {
      type: String,
      default: ''
    },
    /** @prop Optional class name string | '' */
    className: {
      type: String,
      default: ''
    },
    /** @prop Icon description text | '' */
    description: {
      type: String,
      default: ''
    },
    /** @prop Required Icon name */
    name: {
      type: String,
      required: true
    },
    /** @prop Add margin to the right of Icon | null */
    prepend: Boolean,
    /** @prop Sets Icon size | null */
    size: Number,
    // Internal prop to override iconName with size prop */
    sizeOverride: Boolean,
    /** @prop Additional style properties to be applied | null */
    cssStyle: Object,
    /** @prop Sets Icon Title prop | '' */
    title: {
      type: String,
      default: ''
    },
    /** @prop Sets Icon Type | '' */
    type: {
      type: String,
      default: '',
      validator: function (value) {
        return ['', 'white'].indexOf(value) !== -1
      }
    },
  },

  methods: {
    handleClick(e) {
      this.$emit('click', e);
    },
  }
};
</script>
