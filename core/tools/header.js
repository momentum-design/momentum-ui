const path = require('path');
const mdUtils = require('@momentum-ui/utils');

const pkg = require('../package.json');
const year = (new Date()).getFullYear();
const header = `/*!
 * ${pkg.name} v${pkg.version} (${pkg.homepage})
 * ${pkg.description}
 * Copyright 2013-${year} ${pkg.author}
 */`;

mdUtils.addHeader('css/momentum-ui.css', header);
mdUtils.addHeader('css/momentum-ui.min.css', header);
