const path = require('path');
const { copyExamples } = require('@momentum-ui/utils');

const reactExamples = path.resolve(__dirname, '../../react/src/lib');
const examplesDirectory = path.resolve(__dirname, '../client/examples');

copyExamples(reactExamples, examplesDirectory);
