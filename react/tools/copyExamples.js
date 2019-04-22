const path = require('path');
const { copyExamples } = require('@momentum-ui/utils');

const libraryDirectory = path.resolve(__dirname, '../src/lib');
const examplesDirectory = path.resolve(__dirname, '../examples');

copyExamples(libraryDirectory, examplesDirectory);
