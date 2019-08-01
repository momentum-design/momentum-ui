const { runWebpack } = require('./build-bundle');
const { runLib } = require('./build-lib');
const { runES } = require('./build-es');
const { runBuildCss } = require('./build-scss');

console.log(runWebpack);

(async() => {
  await runLib();
  await runES();
  await runWebpack();
  await runBuildCss(true);
})();
