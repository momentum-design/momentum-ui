const fs = require('fs');
const sass = require('node-sass');
const Promise = require('bluebird');

function compileCss() {
  return new Promise((resolve, reject) => {
    console.log('Generate CSS started...');
    const cssFilePath = 'css/collab-ui-icons.css';
    sass.render({
      file: 'scss/collab-ui-icons.scss',
      outFile: cssFilePath,
    }, (err, result) => {
      if (err) { reject(console.error(err)); }
      fs.writeFile(cssFilePath, result.css, (err) => {
        if (err) { reject(console.error(err)); }
        resolve(console.info(`${cssFilePath} has been saved!`));
      });
    });
  });
}

function compileCssMin() {
  return new Promise((resolve, reject) => {
    const cssFilePath = 'css/collab-ui-icons.min.css';
    sass.render({
      file: 'scss/collab-ui-icons.scss',
      outFile: cssFilePath,
      outputStyle: 'compressed',
    }, (err, result) => {
      if (err) { reject(console.error(err)); }
      fs.writeFile(cssFilePath, result.css, (err) => {
        if (err) { reject(console.error(err)); }
        resolve(console.info(`${cssFilePath} has been saved!`));
      });
    });
  });
}

function generateCss() {
  return new Promise((resolve) => {
    Promise.all([compileCss(), compileCssMin()])
      .then((result) => {
        resolve(console.info('CSS files created!'));
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

module.exports = generateCss;
