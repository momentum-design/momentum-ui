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

const compileCSSModules = async () => {
  for (const module of modules) {
    const componentsDirectory = path.resolve(__dirname, `../css/components`);
    const outFile = path.resolve(componentsDirectory, `${module}.css`);
    const inFile = path.resolve(__dirname, `../scss/components/${module}/module.scss`);

    try {
      const result = await sass.compileAsync(inFile, {
        style: 'compressed',
        sourceMap: true,
        loadPaths: ['../node_modules', "../sass/tools/functions"],
        silenceDeprecations: ['mixed-decls', 'slash-div'],
      });

      await fsExtra.ensureDir(componentsDirectory);
      fs.writeFileSync(outFile, result.css);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
};

compileCSSModules();
