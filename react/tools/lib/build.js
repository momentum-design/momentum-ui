const { runWebpack } = require('./build-bundle');
const { runLib } = require('./build-lib');
const { runES } = require('./build-es');

(async () => {
  // await runLib();
  // await runES();
  await runWebpack();
})();