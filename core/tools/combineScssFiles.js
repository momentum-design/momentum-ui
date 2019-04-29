const fs = require('fs-extra');
const concat = require('concat');
const path = require('path');

const combineScssFiles = (files, destination) => {
  fs.ensureDirSync(path.dirname(destination));
  console.log(destination);
  concat(files, destination);
};

module.exports = combineScssFiles;
