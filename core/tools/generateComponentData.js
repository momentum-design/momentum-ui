const cuiUtils = require('@collab-ui/utils');
const navJSON = require('../docs/data/nav.json');

const glob = 'scss/**/*.scss';
const path = 'data/';
const filename = 'docs.json';

cuiUtils.commentsV2(glob, path, filename, navJSON, true);
