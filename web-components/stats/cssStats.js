/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const cssstats = require("cssstats");
const writeFileSyncRecursive = require("./writeFileSyncRecursive");

module.exports = function analyzeCSS(module, data) {
  try {
    const stats = cssstats(data, {
      specificityGraph: true,
      sortedSpecificityGraph: true,
      repeatedSelectors: true,
      propertyResets: true
    });
    writeFileSyncRecursive(`stats/json/${module}.json`, JSON.stringify(stats, null, 2), "utf-8");
  } catch (err) {
    console.log(`"${module}" not analyzed: `, err);
  }
};
