/**
 * @category styles
 * @component icon
 * @variations collab-ui-react
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  chain,
  find,
  trimEnd,
  uniqueId
} from 'lodash';
import iconPaths from '@collab-ui/icons/data/iconsData.json';
import colors from '@collab-ui/core/data/colors.json';
import { Button } from '@collab-ui/react';

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
      title,
      type,
      ...otherProps
    } = this.props;

    const iconCount = uniqueId();
    const titleId = `icon-title-${iconCount}`;
    const descId = description ? `icon-desc-${iconCount}` : undefined;

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
              ` please use a color name from http://core.collab-ui.com/styles/colors`
          );
          break;
        case 'color-error':
          console.warn(
            `[@collab-ui/react] Icon: ${data} does not exist in the design system,` +
              ` please use a color name from http://core.collab-ui.com/styles/colors`
          );
          break;
          case 'name-error':
          console.warn(
            `[@collab-ui/react] Icon: Icon ${data} does not exist in the design system.` +
              ` Visit http://icons.collab-ui.com for a list of available icons or to request a new icon.`
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

    const getColorSpec = colorObj =>
      colorObj.hex
        ? colorObj.hex
        : colorObj.opacity && isolateRoot(colorObj.variable) === 'white'
          ? `rgba(255, 255, 255, ${colorObj.opacity / 100})`
          : `rgba(0, 0, 0, ${colorObj.opacity / 100})`;

    const getHexFromJSON = colorName => {
      for (let c of colors) {
        const variation = find(c.variations, ['variable', colorName]);

        if (variation) return getColorSpec(variation);
      }

      return consoleHandler('color-error', colorName);
    };

    const isolateRoot = str => (
      chain(str)
        .trimStart('$')
        .split('-')
        .value()[0]
    );

    const formatColor = () => {
      return color.startsWith('$')
        ? color
        : color.endsWith('-base')
          ? trimEnd(color, '-base')
          : `$${color}`;
    };

    const getColor = () => {
      if (!color) return 'inherit';

      if (color.startsWith('#')) {
        consoleHandler('color-warn', color);

        return color;
      }

      return getHexFromJSON(formatColor());
    };

    const getPaths = () => {
      const iconName = name.startsWith('icon-')
        ? name.replace(/^(icon-)/,'')
        : name;

      return iconPaths[iconName]
        ? iconPaths[iconName].map((icoPath, index) => (
            <path d={icoPath} key={index} />
          ))
        : consoleHandler('name-error', iconName);
    };

    const getAriaLabelledBy = () => {
      if (!isAria) return deprecationWarning(); // TODO(pajeter): remove isAria code with next major release
      if (!ariaLabel) {
        if (title && description) return (`${titleId} ${descId}`);
        if (title) return (`${titleId}`);
        if (description) return (`${descId}`);
      }
      return null;
    };

    const getAriaLabel = () => (
      (isAria // TODO(pajeter): remove isAria code with next major release
        && ariaLabel) ? ariaLabel : null
    );

    const deprecationWarning = () => { // TODO(pajeter): remove isAria code with next major release
      consoleHandler('isAria-warn');
    };

    const getIcon = () => {
      return (
        <svg
          className={
            `cui-icon` +
            `${(className && ` ${className}`) || ''}`
          }
          name={name}
          width={getSize()}
          height={getSize()}
          aria-labelledby={!onClick ? getAriaLabelledBy() : null}
          aria-label={!onClick ? getAriaLabel() : null}
          {...!onClick && {...otherProps}}
        >
          {isAria // TODO(pajeter): remove isAria code with next major release
            && title && <title id={titleId}>{title}</title>}
          {isAria // TODO(pajeter): remove isAria code with next major release
            && description && <desc id={descId}>{description}</desc>}
          <g fill={getColor()} fillRule="evenodd">
            {getPaths()}
          </g>
        </svg>
        );
    };

    return (
      onClick
        ?
        <Button
          className={
            'cui-button--icon' +
            `${(type && ` cui-button--icon-${type}`) || ''}` +
            `${(buttonClassName && ` ${buttonClassName}`) || ''}`
          }
          ariaLabel={getAriaLabel()}
          ariaLabelledBy={
            isAria // TODO(pajeter): remove isAria code with next major release
              ? getAriaLabelledBy()
              : deprecationWarning() // TODO(pajeter): remove isAria code with next major release
          }
          onClick={onClick}
          {...otherProps}
        >
          {getIcon()}
        </Button>
        :
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
  /** @prop Sets Icon Title prop | '' */
  title: PropTypes.string,
  /** @prop Sets Icon Type | '' */
  type: PropTypes.oneOf(['', 'white'])
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
  title: '',
  type: ''
};

Icon.displayName = 'Icon';

export default Icon;

/**
* @component icons
* @section default
* @react
*
import { Icon } from '@collab-ui/react';

export default class IconDefault extends React.PureComponent {

  render() {
    return(
      <div>
        <Icon name='accessories_16' />
        <Icon name='accessories_20' />
        <Icon name='accessories_36' />
        <Icon name='accessories_56' />
      </div>
    );
  }
}
**/

/**
* @component icons
* @section color
* @react
*
import { Icon } from '@collab-ui/react';

export default class IconColor extends React.PureComponent {

  render() {
    return(
      <div>
        <Icon name='accessories_16' color='blue' />
        <Icon name='accessories_20' color='blue' />
        <Icon name='accessories_36' color='blue' />
        <Icon name='accessories_56' color='blue' />
      </div>
    );
  }
}
**/

/**
* @component icons
* @section white
* @react
*
import { Icon } from '@collab-ui/react';

export default class Default extends React.PureComponent {

  render() {
    return(
      <div style={{ backgroundColor: 'black', padding: '5px', width: 'fit-content' }}>
        <Icon
          name='clear-active_24'
          ariaLabel='Clear'
          type='white'
          onClick={() => console.log('Icon 36 - clicked')}
        />
      </div>
    );
  }
}
**/

