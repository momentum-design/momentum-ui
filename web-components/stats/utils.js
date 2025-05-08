/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const path = require("path");

module.exports = {
  getNormalizedPlatformPath: (_path) => (_path && typeof _path === "string" ? _path.replace(/\//g, path.sep) : "")
};
