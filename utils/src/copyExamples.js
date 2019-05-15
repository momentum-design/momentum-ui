/* eslint-disable no-console */
const fs = require('fs-extra');

const copyExamples = (source, destination) => {
  fs.readdir(source, (error, directories) => {
    if (error) return console.error(error)
    fs.ensureDirSync(destination);
    for (let componentDir of directories) {
      const stats = fs.statSync(`${source}/${componentDir}`);
      if (stats.isDirectory()) {
        fs.readdir(`${source}/${componentDir}`, (error, contents) => {
          for (let content of contents) {
            if (content === 'examples') {
              fs.copySync(
                `${source}/${componentDir}/examples`,
                `${destination}/${componentDir}`
              );
              console.log(
                `Examples copied to ${destination}/${componentDir}`
              );
            }
          }
        });
      }
    }
  });
};
/* eslint-enable no-console */

module.exports = copyExamples;
