const addHeader = require('@momentum-ui/utils/src/addHeader');

const pkg = require('../package.json');
const year = (new Date()).getFullYear();
const header = `/*!
 * ${pkg.name} v${pkg.version} (${pkg.homepage})
 * ${pkg.description}
 * Copyright 2013-${year} ${pkg.author}
 */`;

addHeader('css/momentum-ui.css', header);
addHeader('css/momentum-ui.min.css', header);
