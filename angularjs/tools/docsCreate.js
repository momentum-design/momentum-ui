const mdUtils = require('@collabui/momentum-ui-utils');
const collabUiData = require('@momentum-ui/core/data/docs.json')

const glob = 'src/lib/**/*.ts';
const path = 'src/docs/data/';
const filename = `docs.json`;

mdUtils.comments(glob, path, filename, collabUiData);
