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
const sass = require('sass');
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

  try {
    let result = await sass.compileAsync(sourceScssFile, {
      // Updated to use compileAsync for the new 'sass' package
      style: outputStyle || 'nested', // nested, expanded, compact, compressed
      sourceMap: true,
      importers: [{
        findFileUrl(url) {
          if (url.startsWith('~')) {
            return new URL(url.slice(1), 'file://node_modules/');
          }
          return null;
        }
      }]
    });

    if (result && result.css) {
      console.log(chalkSuccess('built ' + output + ' successfully!'));
      fse.outputFileSync(output, result.css);
      if (result.sourceMap) {
        // Assuming you want to write the source map to a separate file
        fse.outputFileSync(`${output}.map`, result.sourceMap);
      }
    }
    if (ifPlus) {
      await addHeader(output, header);
      await gzip(output);
    }
  } catch (error) {
    console.error(`Error compiling SCSS: ${error.message}`);
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
