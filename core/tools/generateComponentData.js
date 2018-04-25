const cuiUtils = require('@collab-ui/utils');
const navJSON = require('../docs/data/nav.json');

const glob = 'scss/**/*.scss';
const path = 'data/';
const filename = 'docs.json';

cuiUtils.comments(glob, path, filename, navJSON, true);
