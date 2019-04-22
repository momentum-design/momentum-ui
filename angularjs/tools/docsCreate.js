const mdUtils = require('@collabui/collab-ui-utils');
const collabUiData = require('@collab-ui/core/data/docs.json')

const glob = 'src/lib/**/*.ts';
const path = 'src/docs/data/';
const filename = `docs.json`;

mdUtils.comments(glob, path, filename, collabUiData);
