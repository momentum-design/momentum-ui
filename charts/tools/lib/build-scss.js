/*
 move to scss
*/

const fse = require('fs-extra');
const path = require('path');
const {
  // chalkError,
  chalkSuccess,
  // chalkWarning,
  chalkProcessing
} = require('../../config/chalkConfig');
const { libScssRoot, cssRoot } = require('../../config/constants');
const sass = require('node-sass');
const tildeImporter = require('node-sass-tilde-importer');
const addHeader = require('@momentum-ui/utils/src/addHeader');
const gzip = require('@momentum-ui/utils/src/gzip');
const pkg = require('../../package.json');
const year = (new Date()).getFullYear();
const header = `/*!
 * ${pkg.name} v${pkg.version} (${pkg.homepage})
 * ${pkg.description}
 * Copyright 2013-${year} ${pkg.author}
 */`;
const outFile = path.resolve(cssRoot, 'momentum-chart.css');
const outFileMin = path.resolve(cssRoot, 'momentum-chart-min.css');

process.env.NODE_ENV = 'production'; // this assures React is built in prod mode and that the Babel dev config doesn't apply.

const sourceScssFile = path.resolve(libScssRoot, 'momentum-chart.scss');
const buildScss = async (output, outputStyle, ifPlus) => {
  console.log(chalkProcessing('Building ' + output + ' with ' + outputStyle));

  let result = sass.renderSync({
    file: sourceScssFile,
    importer: tildeImporter,
    outputStyle: outputStyle || 'nested', // nested, expanded, compact, compressed
    sourceMap: true
  });

  if (result && result.css) {
    console.log(chalkSuccess('built ' + output + ' successfully!'));
    fse.outputFileSync(output, result.css);
  }
  if (ifPlus) {
    await addHeader(output, header);
    await gzip(output);
  }
};

// Remove Lib Directory
const runBuildCss = async (ifPlus) => {
  console.log(chalkProcessing('Building: '), chalkSuccess('npm css module'));
  if (fse.existsSync(cssRoot)) await fse.remove(cssRoot);
  // Create Lib Directory
  await fse.mkdirs(cssRoot);

  await buildScss(outFile, 'nest', ifPlus);
  await buildScss(outFileMin, 'compressed', ifPlus);
};

module.exports = {
  runBuildCss
};

/* eslint-enable no-console */
