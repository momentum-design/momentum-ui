const comments = require('@momentum-ui/utils/src/comments');
const momentumUiData = require('@momentum-ui/core/data/domd.json')

const glob = 'src/lib/**/*.ts';
const path = 'src/domd/data/';
const filename = `domd.json`;

comments(glob, path, filename, momentumUiData);
