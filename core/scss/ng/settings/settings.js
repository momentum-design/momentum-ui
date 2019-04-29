const path = require('path');
const coreSettingsFiles = require('../../settings/settings');

const ngSettingsFiles = [
  './sidepanel.scss',
  './slider.scss',
  './topbar.scss',
].map(file => path.resolve(__dirname, file));

const iconsSettingsFiles = [
  '../../../../icons/scss/variables.scss',
  '../../../../icons/scss/symphony/variable-mapping.scss',
].map(file => path.resolve(__dirname, file));


// const ngSettingsFilePaths = ngSettingsFiles.map(file => path.resolve(__dirname, file));

module.exports = iconsSettingsFiles.concat(coreSettingsFiles.concat(ngSettingsFiles))
