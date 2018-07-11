// More info on Webpack's Node API here: https://webpack.js.org/api/node/
// Allowing console calls below since this is a build file.

/* eslint-disable no-console */

const fse = require('fs-extra');
const {
  chalkSuccess,
  chalkProcessing,
} = require('../../config/chalkConfig');
const { componentRoot, esRoot } = require('../../config/constants');
const buildBabel = require('./buildBabel');

/* eslint-disable */

// Remove ES Directory
const runES = async () => {
  console.log(chalkProcessing('Building: '), chalkSuccess('es module'));
  if (fse.existsSync(esRoot)) await fse.remove(esRoot);
  // Create ES Directory
  await fse.mkdirs(esRoot);
  // Build Babel Transformed Files
  await buildBabel(componentRoot, esRoot, { modules: false });
  console.log(chalkProcessing('Built: '), chalkSuccess('es module'));
};


module.exports = {
  runES
};

/* eslint-enable no-console */