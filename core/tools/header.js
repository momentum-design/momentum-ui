const path = require('path');
const mdUtils = require('@collab-ui/utils');

const pkg = require('../package.json');
const year = (new Date()).getFullYear();
const header = `/*!
 * ${pkg.name} v${pkg.version} (${pkg.homepage})
 * ${pkg.description}
 * Copyright 2013-${year} ${pkg.author}
 */`;

mdUtils.addHeader('css/collab-ui.css', header);
mdUtils.addHeader('css/collab-ui.min.css', header);
