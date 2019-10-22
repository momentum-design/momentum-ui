// This file configures a web server for testing the production build
// on your local machine.

const browserSync = require('browser-sync');
const historyApiFallback = require('connect-history-api-fallback');
const { chalkProcessing } = require('./chalkConfig');

/* eslint-disable no-console */

console.log(chalkProcessing('Opening production build...'));

// Run Browsersync
browserSync({
  port: 4300,
  ui: {
    port: 4301,
  },
  server: {
    baseDir: 'dist',
  },

  files: ['src/*.html'],

  middleware: [historyApiFallback()],
  notify: false,
});

/* eslint-enable no-console */
