const path = require('path');
const fs = require('fs');
const { gzip } = require('@momentum-ui/utils');

gzip(path.resolve(__dirname, '../css/momentum-ui.min.css'));
