/**
 * @category styles
 * @component icon
 * @variations collab-ui-react
 */

import React from 'react';
import PropTypes from 'prop-types';
import { find, chain, startCase, trimEnd, trimStart, uniqueId } from 'lodash';
import iconPaths from '@collab-ui/icons/data/iconsData.json';
import colors from '@collab-ui/core/data/colors.json';
import { Button } from '@collab-ui/react';

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
    type,
    ...otherHTMLProps
  } = props;

  const iconCount = uniqueId();
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
      const variation = find(c.variations, ['variable', colorName]);

      if (variation) return getColorSpec(variation);
    }

    return consoleHandler('color-error', colorName);
  };

  const isolateRoot = str => {
    return chain(str)
      .trimStart('$')
      .split('-')
      .value()[0];
  };

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
      ? trimStart(name, 'icon-')
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
    return !title ? startCase(name) : title;
  };

  return (
    isClickable
      ?
      <Button 
        className={
          'cui-button--icon' +
          `${(type && ` cui-button--icon-${type}`) || ''}`
        }
        {...otherHTMLProps}
      >
        <svg
          className={
            `cui-icon` +
            `${(className && ` ${className}`) || ''}`
          }
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
  description: PropTypes.string,
  type: PropTypes.oneOf(['', 'white'])
};

Icon.defaultProps = {
  color: '',
  className: '',
  isClickable: false,
  isAria: true,
  type: ''
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

export default class Default extends React.PureComponent {

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

export default class Default extends React.PureComponent {

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

export default class Default extends React.PureComponent {

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

/**
*
* @category communication
* @component icon
* @section type
*
* @js
*

export default class Default extends React.PureComponent {

  render() {
    return(
      <div>
        <div className='row'>
          <div>Default</div>
          <div style={{padding: '5px'}}>
            <Icon name='clear-active_24' ariaLabel='Clear' isClickable onClick={() => console.log('Icon 20 - clicked')} />
          </div>
        </div>
        <div className='row'>
          <div>Type(white)</div>
          <div style={{ backgroundColor: 'black', padding: '5px', width: 'fit-content'}}>
            <Icon name='clear-active_24' ariaLabel='Clear' type='white' isClickable onClick={() => console.log('Icon 36 - clicked')} />
          </div>
        </div>
      </div>
    );
  }
}
**/
