const webpack = require('@cypress/webpack-preprocessor');
const babelConfig = require('../../.babelrc');
const path = require('path');

const codePath = path.resolve(__dirname, '..');
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on) => {
  on(
    'file:preprocessor',
    webpack({
      webpackOptions: {
        target: 'web',
        node: { fs: 'empty'},
        module: {
          rules: [
            {
              test: /\.(js|jsx)?$/,
              exclude: [/node_modules/],
              use: [
                {
                  loader: 'babel-loader',
                  options: babelConfig,
                },
              ],
            },
          ],
        },
      },
    }),
  );
};
