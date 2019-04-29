const path = require('path');
const generateCominedScssFiles = require('./combineScssFiles');

const settingsFiles = require('../scss/ng/settings/settings');
const destination = path.resolve(__dirname, '../scss/ng/settings/settings.scss');

generateCominedScssFiles(settingsFiles, destination);
