const webfontsGenerator = require('webfonts-generator');
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const glob = require('multi-glob').glob;
const _ = require('lodash');
const Promise = require('bluebird');
const handlebars = require('handlebars')

handlebars.registerHelper('removeDashes', function (selector, spacer) {
  return selector.replace(/[_-]/g, spacer);
});

handlebars.registerHelper('equals', function (params) {
  return params[0] === params[1];
});

handlebars.registerHelper('camelCase', function (str) {
  return _.camelCase(str);
});

handlebars.registerHelper('iosCharCode', function (str) {
  return '\\u{' + str + '}';
});

function writeFile(content, dest) {
  mkdirp.sync(path.dirname(dest))
  fs.writeFileSync(dest, content)
}

function generatePathScss(OPTIONS) {
  return new Promise((resolve, reject) => {
    const options = _.extend(OPTIONS, {
      cssTemplate: 'templates/path.hbs',
      cssDest: 'scss/path.scss',
      writeFiles: true,
    });
    webfontsGenerator(options, function (error, result) {
      if (error) { reject(console.error('path.scss FAIL!', error)); }
      resolve(console.info('fonts & path.scss created!'));
    });
  });
}

function generateIconsScss(OPTIONS) {
  return new Promise((resolve, reject) => {
    const options = _.extend(OPTIONS, {
      cssTemplate: 'templates/icons.hbs',
      cssDest: 'scss/icons.scss',
      html: true,
    });
    webfontsGenerator(options, function (error, result) {
      if (error) { reject(console.error('icons.scss FAIL!', error)); }
      const iconsScss = result.generateCss();
      writeFile(iconsScss, options.cssDest);
      resolve(console.info('icons.scss created!'));
    });
  });
}

function generatePlaceholdersScss(OPTIONS) {
  return new Promise((resolve, reject) => {
    const options = _.extend(OPTIONS, {
      cssTemplate: 'templates/placeholders.hbs',
      cssDest: 'scss/placeholders.scss',
    });
    webfontsGenerator(options, function (error, result) {
      if (error) { reject(console.error('placeholders.scss FAIL!', error)); }
      const placeholdersScss = result.generateCss();
      writeFile(placeholdersScss, options.cssDest);
      resolve(console.info('placeholders.scss created!'));
    });
  });
}

function generateMixinsScss(OPTIONS) {
  return new Promise((resolve, reject) => {
    const options = _.extend(OPTIONS, {
      cssTemplate: 'templates/mixins.hbs',
      cssDest: 'scss/mixins.scss',
    });
    webfontsGenerator(options, function (error, result) {
      if (error) { reject(console.error('mixins.scss FAIL!', error)); }
      const mixinsScss = result.generateCss();
      writeFile(mixinsScss, options.cssDest);
      resolve(console.info('mixins.scss created!'));
    });
  });
}

function generateIconType(OPTIONS) {
  return new Promise((resolve, reject) => {
    const options = _.extend(OPTIONS, {
      cssTemplate: 'templates/CollabIconType.hbs',
      cssDest: 'data/CollabIconType.swift',
    });
    webfontsGenerator(options, function (error, result) {
      if (error) { reject(console.error('CollabIconType.swift', error)); }
      const iconsJson = result.generateCss();
      writeFile(iconsJson, options.cssDest);
      resolve(console.info('CollabIconType.swift created!'));
    });
  });
}

function generateVariablesScss(OPTIONS) {
  return new Promise((resolve, reject) => {
    const options = _.extend(OPTIONS, {
      cssTemplate: 'templates/variables.hbs',
      cssDest: 'scss/variables.scss',
    });
    webfontsGenerator(options, function (error, result) {
      if (error) { reject(console.error('variables.scss FAIL!', error)); }
      const variablesScss = result.generateCss();
      writeFile(variablesScss, options.cssDest);
      resolve(console.info('variables.scss created!'));
    });
  });
}

function generateFonts() {
  return new Promise((resolve) => {
    glob(['svg/**/*.svg'], (er, files) => {
      console.log('Generate fonts started...');
      const OPTIONS = {
        files: files,
        fontName: 'collab-ui-icons',
        dest: 'fonts/',
        cssTemplate: 'templates/path.hbs',
        cssDest: 'scss/path.scss',
        cssFontsUrl: '#{$icon-font-path}/',
        types: ['eot', 'woff2', 'woff', 'ttf', 'svg'], // JL: generator all types
        writeFiles: false
      };

      if (er) {
        return console.error(er);
      }

      const generatePromises = [
        generatePathScss,
        generateIconsScss,
        generateVariablesScss,
        generatePlaceholdersScss,
        generateMixinsScss,
        generateIconType,
      ];

      Promise.mapSeries(generatePromises, promise => {
        return promise(OPTIONS);
      })
      .then(() => {
        resolve(console.info('All Fonts Generated!'));
      })
      .catch((err) => {
        console.error(err);
      });
    });
  });
}

module.exports = generateFonts;
