const glob = require('multi-glob').glob;
const SVGSpriter = require('svg-sprite');
const path = require('path');
const fs = require('fs');
const File = require('vinyl');
const spriter = new SVGSpriter({
  dest: './fonts',
  shape: {
    id: {
      generator: function(name) {
        return path.basename(name, '.svg');
      },
    },
  },
  mode: {
    symbol: true,
  },
});
const cwd = path.resolve('.');

function generateSvgSprite() {
  return new Promise((resolve, reject) => {
    console.info('Svg sprite generation started...');
    glob(['svg/**/*.svg'], function(err, files) {
      files.forEach(function(file) {
        spriter.add(
          new File({
            path: path.join(cwd, file),
            base: cwd,
            contents: fs.readFileSync(path.join(cwd, file)),
          })
        );
      });

      spriter.compile(function(error, result) {
        if (err) { reject(console.error(err)); }
        for (let type in result.symbol) {
          fs.writeFileSync(
            path.join(cwd, 'fonts/collab-ui-icons.svg'),
            result.symbol[type].contents
          );
        }
        resolve(console.info(`collab-ui-icons.svg has been created!`));
      });
    });
  });
}

module.exports = generateSvgSprite;
