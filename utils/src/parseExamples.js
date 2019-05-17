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
    const pathArray = filePath.dir.split('/');
    const component = kebabCase(pathArray[pathArray.indexOf('examples') - 1]);
    const sectionWithoutComponentName =
      !filePath.name.startsWith(`${component}-`)
        ? filePath.name
        : filePath.name.split(`${component}-`).pop();
    const unformattedSection =
      sectionWithoutComponentName.indexOf('.') < 0
        ? sectionWithoutComponentName
        : sectionWithoutComponentName.substr(0, sectionWithoutComponentName.indexOf('.'));
    const section = kebabCase(unformattedSection);
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
