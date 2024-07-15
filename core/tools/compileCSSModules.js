const fs = require('fs');
const fsExtra = require('fs-extra');
const sass = require('sass');
const path = require('path');
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
  'overlay',
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
  'stepper',
  'tabs',
  'time-picker',
  'toggle-switch',
  'tooltip',
  'top-bar',
];

const compileCSSModules = () => {
  modules.forEach((module, idx) => {
    const componentsDirectory = path.resolve(__dirname, `../css/components`);
    const outFile = path.resolve(componentsDirectory, `${module}.css`);

    sass.compileAsync(path.resolve(__dirname, `../scss/components/${module}/module.scss`), {
      importers: [{
        findFileUrl(url) {
          if (url.startsWith('~')) {
            return new URL(url.slice(1), 'file://node_modules/');
          }
          return null;
        }
      }],
      style: 'compressed',
      sourceMap: true,
      outFile: outFile,
    }).then(result => {
      fsExtra.ensureDir(componentsDirectory).then(() => {
        fs.writeFileSync(outFile, result.css);
        if (result.sourceMap) {
          fs.writeFileSync(`${outFile}.map`, result.sourceMap);
        }
      });
    }).catch(error => {
      // eslint-disable-next-line no-console
      console.log(`Error status: ${error.status}, Message: ${error.message}`);
    });
  });
};

compileCSSModules();
