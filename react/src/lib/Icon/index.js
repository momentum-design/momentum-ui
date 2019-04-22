/** @component icon */

import React from 'react';
import PropTypes from 'prop-types';
import iconNames from '@collab-ui/icons/data/iconNames.json';
import { Button } from '@collab-ui/react';
import getColorValue from '@collab-ui/utils/lib/getColorValue';

class Icon extends React.PureComponent {
  render() {
    const {
      ariaLabel,
      buttonClassName,
      color,
      className,
      description,
      isAria, // TODO(pajeter): remove isAria code with next major release
      onClick,
      name,
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
        case 'isAria-warn': // TODO(pajeter): remove isAria code with next major release
          console.warn(
            `[@collab-ui/react] Icon: isAria prop is deprecated and will be removed. Title, description or ariaLabel props should be used to add accessibility.`
          );
          break;
        case 'color-warn':
          console.warn(
            `[@collab-ui/react] Icon: ${data} may not exist in the design system,` +
              ` please use a color name from https://momentum.design/styles/color/style`
          );
          break;
        case 'name-error':
          console.warn(
            `[@collab-ui/react] Icon: Icon ${data} does not exist in the design system.` +
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
      if (!isAria) return deprecationWarning(); // TODO(pajeter): remove isAria code with next major release
      if (
        isAria && // TODO(pajeter): remove isAria code with next major release
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

    const deprecationWarning = () => {
      // TODO(pajeter): remove isAria code with next major release
      consoleHandler('isAria-warn');
    };

    const getIcon = () => {
      return (
        <i
          className={`cui-icon icon` + ` ${getNameClass()}` + `${(className && ` ${className}`) || ''}`}
          aria-label={!onClick ? getAriaLabel() : null}
          style={styles}
          {...!onClick && { ...otherProps }}
        />
      );
    };

    return onClick ? (
      <Button
        className={
          'cui-button--icon' +
          `${(type && ` cui-button--icon-${type}`) || ''}` +
          `${(buttonClassName && ` ${buttonClassName}`) || ''}`
        }
        ariaLabel={getAriaLabel()}
        onClick={onClick}
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
  /** @prop Text to display for blindness accessibility features | null */
  ariaLabel: PropTypes.string,
  /** @prop Optional Button class name string | '' */
  buttonClassName: PropTypes.string,
  /** @prop Optional color css styling | '' */
  color: PropTypes.string,
  /** @prop Optional class name string | '' */
  className: PropTypes.string,
  /** @prop Icon description text | '' */
  description: PropTypes.string,
  /** @prop Depreciated prop that supports accessibility features | true */
  isAria: PropTypes.bool, // TODO(pajeter): remove isAria code with next major release
  /** @prop Required Icon name */
  name: PropTypes.string.isRequired,
  /** @prop Handler invoked by click of the user | null */
  onClick: PropTypes.func,
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
  ariaLabel: null,
  buttonClassName: '',
  color: '',
  className: '',
  description: '',
  isAria: true, // TODO(pajeter): remove isAria code with next major release
  onClick: null,
  size: null,
  sizeOverride: false,
  style: null,
  title: '',
  type: '',
};

Icon.displayName = 'Icon';

export default Icon;
