/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const path = require("path");
const fs = require("fs");
const { getNormalizedPlatformPath } = require("./utils");

module.exports = function writeFileSyncRecursive(filename, content, charset) {
  const _filename = getNormalizedPlatformPath(filename);
  const folders = _filename.split(path.sep).slice(0, -1);
  if (folders.length) {
    // create folder path if it doesn't exist
    folders.reduce((last, folder) => {
      const folderPath = path.resolve(last ? getNormalizedPlatformPath(`${last}/${folder}`) : folder);
      if (!fs.existsSync(folderPath) || !fs.lstatSync(folderPath).isDirectory()) {
        fs.mkdirSync(folderPath);
      }
      return folderPath;
    });
  }

  fs.writeFileSync(_filename, content, charset);
};
