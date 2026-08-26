const { defineConfig } = require('cypress');

const baseUrl = 'http://127.0.0.1:4200';

module.exports = defineConfig({
  allowCypressEnv: false,
  chromeWebSecurity: false,
  video: false,
  e2e: {
    baseUrl,
    fixturesFolder: 'test/fixtures',
    specPattern: 'scss/**/*.cy.js',
    supportFile: 'test/support/index.js',
  },
});
