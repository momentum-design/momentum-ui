const mdUtils = require('@momentum-ui/utils');
const momentumUiData = require('@momentum-ui/core/data/domd.json')

const glob = 'src/lib/**/*.ts';
const path = 'src/domd/data/';
const filename = `domd.json`;

mdUtils.comments(glob, path, filename, momentumUiData);
