const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const { defineConfig } = require('cypress');
const babelConfig = require('./.babelrc');

const baseUrl = 'http://127.0.0.1:4300';

module.exports = defineConfig({
  allowCypressEnv: false,
  chromeWebSecurity: false,
  numTestsKeptInMemory: 1,
  video: false,
  e2e: {
    baseUrl,
    fixturesFolder: 'test/fixtures',
    specPattern: 'src/lib/**/*.cy.js',
    supportFile: 'test/support/index.js',
    setupNodeEvents(on) {
      on(
        'file:preprocessor',
        webpackPreprocessor({
          webpackOptions: {
            mode: 'development',
            target: 'web',
            resolve: {
              extensions: ['.js', '.jsx', '.json'],
              fallback: { fs: false },
            },
            module: {
              rules: [
                {
                  test: /\.jsx?$/,
                  exclude: /node_modules/,
                  use: {
                    loader: 'babel-loader',
                    options: babelConfig,
                  },
                },
              ],
            },
          },
        }),
      );
    },
  },
});
