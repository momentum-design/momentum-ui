const path = require('path');
const { copyExamples } = require('@collab-ui/utils');

const reactExamples = path.resolve(__dirname, '../../react/src/lib');
const examplesDirectory = path.resolve(__dirname, '../client/examples');

copyExamples(reactExamples, examplesDirectory);
