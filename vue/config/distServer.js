// This file configures a web server for testing the production build
// on your local machine.

const browserSync = require('browser-sync');
const historyApiFallback = require('connect-history-api-fallback');
const { chalkProcessing } = require('./chalkConfig');

/* eslint-disable no-console */

console.log(chalkProcessing('Opening production build...'));

// Run Browsersync
browserSync({
  port: 5300,
  ui: {
    port: 5301,
  },
  server: {
    baseDir: 'dist',
  },

  files: ['src/*.html'],

  middleware: [historyApiFallback()],
});

/* eslint-enable no-console */
