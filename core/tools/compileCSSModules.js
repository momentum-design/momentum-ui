const fs = require('fs-extra');
const sass = require('node-sass');
const path = require('path');
const tildeImporter = require('node-sass-tilde-importer');
const modules = [
  'accordion',
  'activity-button',
  'alert',
  'alert-banner',
  'avatar',
  'avatar',
  'badge',
  'breadcrumbs',
  'button',
  'button-group',
  'card',
  'cdk-overlay',
  'checkbox',
  'chip',
  'close',
  'close-wrapper',
  'coachmark',
  'collapse-button',
  'combo-box',
  'content-item',
  'date-picker',
  'drawer',
  'date-range-picker',
  'editable-textfield',
  'overlay',
  'footer',
  'hero',
  'icon',
  'input',
  'input-phone-number',
  'label',
  'lightbox',
  'link',
  'list-item',
  'list-separator',
  'meeting-list',
  'loading',
  'loader',
  'menu',
  'modal',
  'panel',
  'page-header',
  'pagination',
  'popover',
  'progress',
  'radio',
  'select',
  'sidebar',
  'slider',
  'social-list',
  'space-list',
  'tabs',
  'time-picker',
  'toggle-switch',
  'tooltip',
  'top-bar',
];

const compileCSSModules = () => {
  modules.forEach((module, idx) => {
    const componentsDirectory = path.resolve(__dirname, `../css/components`);
    const outFile = path.resolve(__dirname, componentsDirectory, `${module}.css`);
    const mapFile = path.resolve(__dirname, componentsDirectory, `${module}.map.css`);

    sass.render(
      {
        file: path.resolve(__dirname, `../scss/components/${module}/module.scss`),
        // data: 'body{background:blue; a{color:black;}}',
        importer: tildeImporter,
        // includePaths: [ 'lib/', 'mod/' ],
        outputStyle: 'compressed',
        outFile: outFile,
        sourceMap: true,
      },
      function(error, result) {
        // node-style callback from v3.0.0 onwards
        if (error) {
          console.log(error.status); // used to be "code" in v2x and below
          console.log(error.column);
          console.log(error.message);
          console.log(error.line);
        } else {
          fs.ensureDir(componentsDirectory);
          fs.writeFileSync(outFile, result.css);
          fs.writeFileSync(mapFile, result.map);
        }
      }
    );
  });
};

compileCSSModules();


