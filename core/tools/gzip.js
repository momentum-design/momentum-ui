const path = require('path');
const gzip = require('@momentum-ui/utils/src/gzip');

gzip(path.resolve(__dirname, '../css/momentum-ui.min.css'));
