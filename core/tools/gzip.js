const path = require('path');
const fs = require('fs');
const { gzip } = require('@collab-ui/utils');

gzip(path.resolve(__dirname, '../css/collab-ui.min.css'));
