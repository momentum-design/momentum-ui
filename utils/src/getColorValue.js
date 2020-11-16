const startsWith = require('lodash/startsWith');
const trimStart = require('lodash/trimStart');
const isEmpty = require('lodash/isEmpty');
const colorTokens = require('@momentum-ui/tokens/dist/colors.json');
const legacyColors = require('@momentum-ui/tokens/src/legacyColors.json');

const getColorValue = (color, colorFormat) => {
  const colorName = convertScssVariableToName(color);
  const colorObject = getColorObject(colorName);
  const colorValue = getColorValueFromToken(colorObject, colorFormat);
  return colorValue;
};

const convertScssVariableToName = color => {
  switch (true) {
    case startsWith(color, '$md-'):
      return trimStart(color, '$md-');
    case startsWith(color, '$'):
      return trimStart(color, '$');
    case startsWith(color, 'md-'):
      return trimStart(color, 'md-');
    default:
      return color;
  }
};

const getColorObject = colorName => {
  const colorObject = getColorObjectFromTokens(colorName);
  if (isEmpty(colorObject)) {
    return getColorObjectFromTokens(getNewColorName(colorName));
  }
  return colorObject;
};

const getColor = (name, value) => {
  return (colorTokens[name] && colorTokens[name][value]) || {};
};

const getColorObjectFromTokens = colorName => {
  const colorData = colorName.split('-');
  return getColor(colorData[0], colorData[1]);
};

const getNewColorName = colorName => {
  const color = {
    oldName: colorName,
    newName: legacyColors[colorName],
  };
  if (!color.newName) {
    consoleHandler('color-error', color);
    return 'black-100';
  }
  consoleHandler('new-colors-warn', color);
  return color.newName;
};

const getColorValueFromToken = (colorObject, colorFormat) => {
  switch (colorFormat) {
    case 'hex':
      return colorObject.hex;
    case 'rgb':
      return `rgb(${colorObject.rgb.r}, ${colorObject.rgb.g}, ${colorObject.rgb.b})`;
    default:
      return `rgba(${colorObject.rgba.r}, ${colorObject.rgba.g}, ${colorObject.rgba.b}, ${colorObject.rgba.a})`;
  }
};

const consoleHandler = (message, data) => {
  /* eslint-disable no-console */
  switch (message) {
    case 'new-colors-warn':
      console.warn(
        `[@momentum-ui] Design system colors update: ${data.oldName} is now ${
          data.newName
        }. Refer to https://momentum.design/styles/color/style`
      );
      break;
    case 'color-error':
      console.warn(
        `[@momentum-ui] ${data.oldName} does not exist in the design system,` +
          ` please use a color name from https://momentum.design/styles/color/style`
      );
      break;
  }
  /* eslint-enable no-console */
};

module.exports = getColorValue;
