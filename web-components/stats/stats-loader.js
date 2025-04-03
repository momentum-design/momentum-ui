/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const { getNormalizedPlatformPath } = require("./utils");
const writeFileSyncRecursive = require("./writeFileSyncRecursive");
const analyzeCSS = require("./cssStats.js");

module.exports = async function (source) {
  const location = this.resourcePath;

  const components_base = getNormalizedPlatformPath("src/components/");
  const scss_sub_path = getNormalizedPlatformPath("/scss/");
  const components_base_idx = location.indexOf(components_base);
  const scss_sub_path_idx = location.indexOf(scss_sub_path);

  if (components_base_idx > 0 && scss_sub_path_idx > 0) {
    const name = location.substring(location.indexOf(components_base) + 15, location.indexOf(scss_sub_path));
    analyzeCSS(name, source);

    writeFileSyncRecursive(`stats/css/${name}.css`, source, "utf-8");
  }

  return source;
};
