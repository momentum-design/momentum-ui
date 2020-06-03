const fs = require('fs-extra');
const glob = require('fast-glob');
const jsonfile = require('jsonfile');
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
      if (library) {
        if (pathArray.slice().pop() === 'tests' || pathArray.indexOf('utils') >= 0) {
          fileBlocks = null;
        } else if (pathArray.slice().pop() === 'examples') {
          fileBlocks = await parseExamples(library, file, fileContents);
        } else {
          fileBlocks = await parseComments(library, file, fileContents);
        }

        parsedBlocks = fileBlocks
          ? [...parsedBlocks, fileBlocks]
          : parsedBlocks;
      }
    }

    const combinedJSON = await dataToJSON(
      baseDataJSON,
      parsedBlocks
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
    default:
      return null;
  }
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
      console.info(`${outputDirectory}/${component.name}.json created.`);
    }
    if (writeCombinedJSON) {
      jsonfile.writeFileSync(
        `${outputDirectory}/combined.json`,
        componentsJSON
      );
      console.info(`${outputDirectory}/combined.json created.`);
    }
  } catch (e) {
    throw new Error(console.error(e));
  }
};

module.exports = createComponentsData;
