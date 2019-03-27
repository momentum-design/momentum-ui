const fs = require('fs-extra');
const glob = require('fast-glob');
const jsonfile = require('jsonfile');
const kebabCase = require('lodash/kebabCase');
const path = require('path');

const dataToJSON = require('./dataToJSON');
const parseComments = require('./parseComments');
const parseExamples = require('./parseExamples');

const createComponentsData = async (
  filesToBeParsed,
  outputDirectory,
  baseDataJSON,
  writeCombinedJSON
) => {
  try {
    const files = glob.sync(filesToBeParsed);
    let parsedBlocks = [];
    for (let file of files) {
      let fileBlocks;
      const filePath = path.parse(file);
      const pathArray = filePath.dir.split('/');
      const library = getLibraryName(file);
      const fileContents = fs.readFileSync(file);
      if (!library) return;
      if (pathArray.indexOf('examples') > 0) {
        fileBlocks = await parseExamples(library, file, fileContents);
      } else {
        fileBlocks = await parseComments(library, file, fileContents);
      }
      parsedBlocks = [...parsedBlocks, fileBlocks];
    }
    const combinedJSON = await dataToJSON(
      baseDataJSON,
      parsedBlocks.filter(Boolean)
    );
    await splitDataJSONIntoFiles(
      combinedJSON,
      outputDirectory,
      writeCombinedJSON
    );
  } catch (e) {
    throw new Error(console.error(e));
  }
};

const getLibraryName = filePath => {
  switch (true) {
    case filePath.includes('core'):
      return 'core';
    case filePath.includes('react'):
      return 'react';
    case filePath.includes('angularjs'):
      return 'angularjs';
    case filePath.includes('angular'):
      return 'angular';
    default:
      return null;
  }
};

const getComponentName = pathArray => {
  if (pathArray.indexOf('examples') > 0)
    return kebabCase(pathArray[pathArray.indexOf('examples') - 1]);
  return kebabCase(pathArray[pathArray.length - 1]);
};

const splitDataJSONIntoFiles = async (
  componentsJSON,
  outputDirectory,
  writeCombinedJSON
) => {
  try {
    fs.mkdirpSync(outputDirectory);
    for (let component of componentsJSON) {
      const fileName = `${outputDirectory}/${component.name}.json`;
      jsonfile.writeFileSync(fileName, component);
      // console.log(`${fileName} was saved!`);
    }
    if (writeCombinedJSON) {
      jsonfile.writeFileSync(
        `${outputDirectory}/combined.json`,
        componentsJSON
      );
    }
  } catch (e) {
    throw new Error(console.error(e));
  }
};

module.exports = createComponentsData;
