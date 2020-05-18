const path = require('path');
const createComponentsData = require('@momentum-ui/utils/src/createComponentsData');

const baseDataJSON = require('./constants/BASE_DATA.json');
const dataDirectory = path.resolve(__dirname, '../data/');
const globArray = [
  path.resolve(__dirname, '../core/scss/**/*.html'),
  // path.resolve(__dirname, '../core/scss/**/*.scss'),
  path.resolve(__dirname, '../react/src/lib/**/*.js'),
  `!**/node_modules/**`,
];

createComponentsData(globArray, dataDirectory, baseDataJSON, true);
