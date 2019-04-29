const path = require('path');
const generateCominedScssFiles = require('./combineScssFiles');

const settingsFiles = require('../scss/settings/settings');
const destination = path.resolve(__dirname, '../scss/settings/settings.scss');

generateCominedScssFiles(settingsFiles, destination);
