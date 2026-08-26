const { defineConfig } = require('cypress');

const baseUrl = 'http://127.0.0.1:3100';

module.exports = defineConfig({
  allowCypressEnv: false,
  chromeWebSecurity: false,
  video: false,
  viewportHeight: 900,
  viewportWidth: 1440,
  e2e: {
    baseUrl,
    fixturesFolder: 'test/fixtures',
    specPattern: 'test/integration/**/*.cy.js',
    supportFile: 'test/support/index.js',
  },
});
