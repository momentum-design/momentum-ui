const path = require('path');
const fs = require("fs");

module.exports = function writeFileSyncRecursive(filename, content, charset) {
  const folders = filename.split(path.sep).slice(0, -1);
  if (folders.length) {
    // create folder path if it doesn't exist
    folders.reduce((last, folder) => {
      const folderPath = last ? last + path.sep + folder : folder;
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
      return folderPath;
    });
  }
  fs.writeFileSync(filename, content, charset);
};
