const path = require('path');
const fs = require('fs-extra');
const svgson = require('svgson');
const glob = require('glob');
const _ = require('lodash');

function processSvg() {
  return new Promise((resolve, reject) => {
    glob('svg/*.svg', (err, files) => {
      const icons = {};
      for (let file of files) {
        const svgString = fs.readFileSync(path.resolve(file), 'utf-8');
        if (svgString) {
          const name = path.parse(file).name;
          svgson(svgString, {}, (result) => {
            if (_.find(result.childs, ['name', 'path'])) {
              const path = _.find(result.childs, ['name', 'path']);
              const { d } = path.attrs;
              if (icons[name]) {
                icons[name].push(d);
              } else {
                icons[name] = [];
                icons[name].push(d);
              }
            } else if (_.find(result.childs, ['name', 'g'])) {
              const paths = _.find(result.childs, ['name', 'g']).childs;
              for (let path of paths) {
                const { d } = path.attrs;
                if (icons[name]) {
                  icons[name].push(d);
                } else {
                  icons[name] = [];
                  icons[name].push(d);
                }
              }
            }
          });
        }
      }
      fs.writeJson('data/iconsData.json', icons, err => {
        if (err) reject(err);
        resolve(console.info('iconsData.json created!'));
      });
    });
  });
}

module.exports = processSvg;
