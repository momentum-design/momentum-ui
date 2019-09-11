const { runBuildCss } = require('./build-scss');

(async() => {
  await runBuildCss(true);
})();
