const writeFileSyncRecursive = require("./writeFileSyncRecursive");
const analyzeCSS = require("./cssStats.js");

module.exports = async function(source) {
  const location = this.resourcePath;
  const name = location.substring(location.indexOf("src/components/") + 15, location.indexOf("/scss/"));
  analyzeCSS(name, source);

  writeFileSyncRecursive(`stats/css/${name}.css`, source, "utf-8");
  return source;
};
