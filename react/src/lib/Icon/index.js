/**
 * @category styles
 * @component icon
 * @variations collab-ui-react
 */

import React from 'react';
import PropTypes from 'prop-types';
import iconPaths from '@collab-ui/icons/data/iconsData.json';
import colors from '@collab-ui/core/data/colors.json';
import _ from 'lodash';
import { Button } from '@collab-ui/react';

let count = 0;

const Icon = props => {
  const {
    name,
    size,
    className,
    color,
    isClickable,
    title,
    description,
    isAria,
    ...otherHTMLProps
  } = props;

  const iconCount = count++;
  const titleId = `icon-title-${iconCount}`;
  const descId = description ? `icon-desc-${iconCount}` : undefined;

  const consoleHandler = (message, data) => {
    /* eslint-disable no-console */
    switch (message) {
      case 'color-warn':
        console.warn(
          `${data} may not exist in the design system,` +
            ` please use a color name from http://collab-ui.cisco.com/styles/colors`
        );
        break;
      case 'color-error':
        console.warn(
          `${data} does not exist in the design system,` +
            ` please use a color name from http://collab-ui.cisco.com/styles/colors`
        );
        break;
      case 'name-error':
        console.warn(
          `Icon ${data} does not exist in the design system.` +
            ` Visit http://collab-ui-icons.cisco.com for a list of available icons or to request a new icon.`
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
      const variation = _.find(c.variations, ['variable', colorName]);

      if (variation) return getColorSpec(variation);
    }

    return consoleHandler('color-error', colorName);
  };

  const isolateRoot = str => {
    return _.chain(str)
      .trimStart('$')
      .split('-')
      .value()[0];
  };

  const formatColor = () => {
    return color.startsWith('$')
      ? color
      : color.endsWith('-base')
        ? _.trimEnd(color, '-base')
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
      ? _.trimStart(name, 'icon-')
      : name;

    return iconPaths[iconName]
      ? iconPaths[iconName].map((icoPath, index) => (
          <path d={icoPath} key={index} />
        ))
      : consoleHandler('name-error', iconName);
  };

  const getAria = () => {
    return description ? `${titleId} ${descId}` : `${titleId}`;
  };

  const getTitle = () => {
    return !title ? _.startCase(name) : title;
  };

  return (
    isClickable
      ?
      <Button color='none' {...otherHTMLProps} >
        <svg
          className={`cui-icon` + `${(className && ` ${className}`) || ''}`}
          width={getSize()}
          height={getSize()}
          aria-labelledby={isAria ? getAria() : undefined}
        >
          {isAria && <title id={titleId}>{getTitle()}</title>}
          {description && isAria && <desc id={descId}>{description}</desc>}
          <g fill={getColor()} fillRule="evenodd">
            {getPaths()}
          </g>
        </svg>
      </Button>
      :
      <svg
        className={`cui-icon` + `${(className && ` ${className}`) || ''}`}
        width={getSize()}
        height={getSize()}
        aria-labelledby={isAria ? getAria() : undefined}
        {...otherHTMLProps}
      >
        {isAria && <title id={titleId}>{getTitle()}</title>}
        {description && isAria && <desc id={descId}>{description}</desc>}
        <g fill={getColor()} fillRule="evenodd">
          {getPaths()}
        </g>
      </svg>
  );
};

Icon.propTypes = {
  isClickable: PropTypes.bool,
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  isAria: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string
};

Icon.defaultProps = {
  color: '',
  className: '',
  isClickable: false,
  isAria: true
};

Icon.displayName = 'Icon';

export default Icon;

/**
*
* @category communication
* @component icon
* @section default
*
* @js
*

export default class ListItemType extends React.PureComponent {

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
*
* @category communication
* @component icon
* @section color
*
* @js
*

export default class ListItemType extends React.PureComponent {

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
*
* @category communication
* @component icon
* @section click
*
* @js
*

export default class ListItemType extends React.PureComponent {

  render() {
    return(
      <div>
        <Icon name='accessories_16' color='blue' ariaLabel='Accessories' isClickable onClick={() => console.log('Icon 16 - clicked')} />
        <Icon name='accessories_20' color='blue' ariaLabel='Accessories' isClickable onClick={() => console.log('Icon 20 - clicked')} />
        <Icon name='accessories_36' color='blue' ariaLabel='Accessories' isClickable onClick={() => console.log('Icon 36 - clicked')} />
        <Icon name='accessories_56' color='blue' ariaLabel='Accessories' isClickable onClick={() => console.log('Icon 56 - clicked')} />
      </div>
    );
  }
}
**/
