const cuiUtils = require('@collab-ui/utils');
const navJSON = require('@collab-ui/core/data/components.json');

const glob = 'src/lib/**/index.js';
const path = 'src/docs/data/';
const filename = 'docs.json';

cuiUtils.comments(glob, path, filename, navJSON);
