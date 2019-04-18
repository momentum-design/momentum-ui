const startsWith = require('lodash/startsWith');
const trimStart = require('lodash/trimStart');
const find = require('lodash/find');
const isEmpty = require('lodash/isEmpty');
const colorTokens = require('@collab-ui/core/tokens/colors.json').colors;
const legacyColors = require('@collab-ui/core/tokens/legacyColors.json');

const getColorValue = (color, colorFormat) => {
  const colorName = convertScssVariableToName(color);
  const colorObject = getColorObject(colorName);
  const colorValue = getColorValueFromToken(colorObject, colorFormat);
  return colorValue;
};

const convertScssVariableToName = color => {
  switch (true) {
    case startsWith(color, '$cui-'):
      return trimStart(color, '$cui-');
    case startsWith(color, '$'):
      return trimStart(color, '$');
    case startsWith(color, 'cui-'):
      return trimStart(color, 'cui-');
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

const getColorObjectFromTokens = colorName => {
  return colorTokens.reduce((agg, ele) => {
    const colorObject = find(ele.variations, { name: colorName });
    return colorObject ? colorObject : agg;
  }, {});
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
        `[@collab-ui] Design system colors update: ${data.oldName} is now ${
          data.newName
        }. Refer to https://momentum.design/styles/color/style`
      );
      break;
    case 'color-error':
      console.warn(
        `[@collab-ui] ${data.oldName} does not exist in the design system,` +
          ` please use a color name from https://momentum.design/styles/color/style`
      );
      break;
  }
  /* eslint-enable no-console */
};

export default getColorValue;
