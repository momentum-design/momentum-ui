/** @component icon */

import React from 'react';
import PropTypes from 'prop-types';
import iconNames from '@momentum-ui/icons/data/iconNames.json';
import { Button } from '@momentum-ui/react';
import getColorValue from '@momentum-ui/utils/lib/getColorValue';

class Icon extends React.PureComponent {
  render() {
    const {
      append,
      ariaLabel,
      buttonClassName,
      buttonProps,
      color,
      className,
      description,
      onClick,
      name,
      prepend,
      size,
      sizeOverride,
      style,
      title,
      type,
      ...otherProps
    } = this.props;

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
      fontSize: getSize(),
      ...color && { color: getColor() },
      ...style,
    };

    const getAriaLabel = () => {
      if (
        ariaLabel
      ) {
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
          className={
            `md-icon icon` +
            ` ${getNameClass()}` +
            `${(className && ` ${className}`) || ''}` +
            `${(prepend && ` md-prepend`) || ''}` +
            `${(append && ` md-append`) || ''}`
          }
          aria-label={!onClick ? getAriaLabel() : null}
          style={styles}
          {...(title && !onClick) && { title: title }}
          {...!onClick && { ...otherProps }}
        />
      );
    };

    return onClick ? (
      <Button
        className={
          'md-button--icon' +
          `${(type && ` md-button--icon-${type}`) || ''}` +
          `${(buttonClassName && ` ${buttonClassName}`) || ''}`
        }
        ariaLabel={getAriaLabel()}
        onClick={onClick}
        {...buttonProps}
        {...title && { title: title }}
        {...otherProps}
      >
        {getIcon()}
      </Button>
    ) : (
      getIcon()
    );
  }
}

Icon.propTypes = {
  /** @prop Add margin to the left of Icon | null */
  append: PropTypes.bool,
  /** @prop Text to display for blindness accessibility features | null */
  ariaLabel: PropTypes.string,
  /** @prop Optional Button class name string | '' */
  buttonClassName: PropTypes.string,
  /** @prop Optional props to pass to underlying button component | null */
  buttonProps: PropTypes.object,
  /** @prop Optional color css styling | '' */
  color: PropTypes.string,
  /** @prop Optional class name string | '' */
  className: PropTypes.string,
  /** @prop Icon description text | '' */
  description: PropTypes.string,
  /** @prop Required Icon name */
  name: PropTypes.string.isRequired,
  /** @prop Handler invoked by click of the user | null */
  onClick: PropTypes.func,
  /** @prop Add margin to the right of Icon | null */
  prepend: PropTypes.bool,
  /** @prop Sets Icon size | null */
  size: PropTypes.number,
  // Internal prop to override iconName with size prop */
  sizeOverride: PropTypes.bool,
  /** @prop Additional style properties to be applied | null */
  style: PropTypes.object,
  /** @prop Sets Icon Title prop | '' */
  title: PropTypes.string,
  /** @prop Sets Icon Type | '' */
  type: PropTypes.oneOf(['', 'white']),
};

Icon.defaultProps = {
  append: false,
  ariaLabel: null,
  buttonClassName: '',
  buttonProps: null,
  color: '',
  className: '',
  description: '',
  onClick: null,
  prepend: false,
  size: null,
  sizeOverride: false,
  style: null,
  title: '',
  type: '',
};

Icon.displayName = 'Icon';

export default Icon;
