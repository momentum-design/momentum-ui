import fs from 'fs-extra';
import _ from 'lodash';
import * as utils from '@momentum-ui/utils';
// JSON file including Navigation
import domd from '../src/domd/data/domd';
// Chalk Colors the Text
// import { chalkError, chalkSuccess } from '../config/chalkConfig';
// Root Directory of Domd Examples
const argv = process.argv.slice(2)[0];
const rootDir = `${argv || '.'}/src/domd/app/examples`;
const ignoredCategories = [
  'overview',
  'develop'
];

export default function createExamples(domd) {
  let componentContent = `import * as angular from 'angular';\n`;
  let angularModule = `
export default angular
.module('examplesModule', [
  'momentum.ui',
])`;
  const fileEnd = `\n.name;`;

  Object.keys(domd).forEach(async category => {
    if (_.includes(ignoredCategories, category)) return;
    domd[category].children.forEach(async component => {
      if (!component.sections || !component.component) return;
      component.sections.forEach(async section => {
        if (!section.examples) return;
        const componentSectionName = _.startCase(section.component).replace(/\s/g, '') + _.startCase(section.section).replace(/\s/g, '');
        const exampleComponentName = `${componentSectionName}Component`;
        const exampleComponentSelector = _.camelCase(componentSectionName);

        if (section.examples.ts) {
          componentContent = `${componentContent}${section.examples.ts[0].example}\n`;
          angularModule = `${angularModule}\n.component('${exampleComponentSelector}', new ${exampleComponentName}())`;
          return;
        }
      });
      return;
    });
    return;
  });
  const filePath = `${rootDir}/index.ts`;
  const examplesContent = componentContent + angularModule + fileEnd;
  return fs.outputFile(filePath, examplesContent)
    .then(() => {
      console.log(utils.chalkSuccess(`Examples file created`));
      return file;
    })
    .catch(err => console.log(utils.chalkError(`Examples file creation error: ${err}`)));
  console.log(examplesContent);

}

(async () => {
  await utils.emptyDir(rootDir);
  await createExamples(domd);
})();


