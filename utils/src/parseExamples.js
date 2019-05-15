const htmlEntities = require('./htmlEntities');
const kebabCase = require('lodash/kebabCase');
const path = require('path');

const parseExamples = async (library, file, fileContents) => {
  try {
    const filePath = path.parse(file);
    if (filePath.name === 'index' || filePath.name === 'examples.module')
      return;
    const exampleString = fileContents.toString('utf8');
    const escapedExampleString = htmlEntities(fileContents.toString('utf8'));
    const unformattedSection =
      filePath.name.indexOf('.') < 0
        ? filePath.name
        : filePath.name.substr(0, filePath.name.indexOf('.'));
    const section = kebabCase(unformattedSection);
    const pathArray = filePath.dir.split('/');
    const component = kebabCase(pathArray[pathArray.indexOf('examples') - 1]);
    const exampleBlock = [
      {
        component: component,
        section: section,
        [library]: {
          example: exampleString,
          escaped: escapedExampleString,
        },
      },
    ];
    return exampleBlock;
  } catch (e) {
    throw new Error(console.error(file, e));
  }
};

module.exports = parseExamples;
