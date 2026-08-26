/* eslint-disable no-console */
const fse = require('fs-extra');
const { chalkProcessing, chalkSuccess } = require('../../config/chalkConfig');
const { componentRoot, libRoot } = require('../../config/constants');
const buildBabel = require('./buildBabel');

const runLib = async () => {
  console.log(chalkProcessing('Building: '), chalkSuccess('npm module'));
  await fse.remove(libRoot);
  await fse.mkdirs(libRoot);
  await buildBabel(componentRoot, libRoot);
  console.log(chalkProcessing('Built: '), chalkSuccess('npm module'));
};

module.exports = { runLib };
