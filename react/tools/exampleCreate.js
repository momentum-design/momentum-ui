import fs from 'fs-extra';
import _ from 'lodash';
// JSON file including Navigation
import docs from '../src/docs/data/docs';
// Chalk Colors the Text
import { chalkError, chalkSuccess } from '../config/chalkConfig';
// Root Directory of Docs Components
const argv = process.argv.slice(2)[0];
const rootDir = `${argv || '.'}/src/docs/components`;

const mkTitleCase = str => _.startCase(_.toLower(str));

const rmWhiteSpace = str => str.replace(/\s/g, '');

const rmDash = str => str.replace(/-/g, '');

/* eslint-disable no-console */
const emptyDir = dir => {
  return fs
    .emptyDir(dir)
    .then(() => {
      console.log(chalkSuccess(`Directory created: ${dir}`));
      return dir;
    })
    .catch(err => console.log(chalkError(`Directory creation error: ${err}`)));
};

const ensureFile = file => {
  return fs
    .ensureFile(file)
    .then(() => {
      console.log(chalkSuccess(`File created: ${file}`));
      return file;
    })
    .catch(err => console.log(chalkError(`File creation error: ${err}`)));
};
/* eslint-enable no-console */

const appendFile = (file, data, extraData) => {
  const appendData = (extraData && extraData + data) || data;

  return fs.appendFile(file, appendData);
};

export default function createDir(json) {
  // Create Directory for Overall Navigation Category
  return Object.keys(json).forEach(async category => {
    // Don't create directories for these files
    if (category === 'overview' || category === 'develop') return;

    const categoryDir = await emptyDir(`${rootDir}/${mkTitleCase(category)}`);
    // Create Directories and Entry Files for Each Component under the Category
    return json[category].children.forEach(async component => {
      if (!component.sections || !component.component) return;

      const tcComponent = rmWhiteSpace(mkTitleCase(component.component));

      // Create Directory and File for Each Example Section under the Component Directory and Add Code to File
      return component.sections.forEach(async (sectionComponent, idx) => {
        if (
          !sectionComponent.examples ||
          (!sectionComponent.examples.html && !sectionComponent.examples.js) ||
          !sectionComponent.section
        )
          return;

        const sectionName = rmDash(sectionComponent.section);
        const componentDir = await emptyDir(`${categoryDir}/${tcComponent}`);
        const componentFile = await ensureFile(`${componentDir}/index.js`);
        const fileNumber = idx < 10 ? `0${idx}` : idx;
        const sectionFile = await ensureFile(
          `${componentDir}/${sectionName}.js`
        );
        let optionalCodeString;

        // Append Import/Export to Entry File
        appendFile(
          componentFile,
          `export { default as ${tcComponent}${sectionName} } from './${sectionName}';\n`
        );

        if (sectionComponent.core) {
          optionalCodeString = `
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: \`${
                  sectionComponent.examples.html[0].example
                }\`}} />

              /* eslint-enable */
              }
            }
          `;

          return appendFile(sectionFile, optionalCodeString);
        }

        // Append Code to each Example File
        optionalCodeString = `import React from 'react';\nimport { ${tcComponent} } from '@collab-ui/react';\n`;

        appendFile(
          sectionFile,
          sectionComponent.examples.js[0].example,
          optionalCodeString
        );
      });
    });
  });
}

(async () => {
  await emptyDir(rootDir);
  await createDir(docs);
})();
