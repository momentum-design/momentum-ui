import { join } from 'path';
import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { getFileContent } from '@schematics/angular/utility/test';

// SchematicTestRunner needs an absolute path to the collection to test.
const collectionPath = join(__dirname, '../collection.json');
let appTree: UnitTestTree;
const appOptions: any = {
  name: 'foo',
  version: '6.0.0',
  directory: '/'
};
const defaultOptions: any = {
  project: 'foo',
  disableBugsnag: true,
  directory: '/'
};
const schematicRunner = new SchematicTestRunner('@collab-ui/angular', collectionPath);

beforeEach((done) => {
  appTree = new UnitTestTree(Tree.empty());
  schematicRunner.runExternalSchematicAsync('@schematics/angular', 'ng-new', appOptions, appTree).subscribe(t => {
      schematicRunner.runExternalSchematicAsync('@schematics/angular', 'module', {name: 'shared', project: 'foo'}, t).subscribe(tree => {
        appTree = tree;
        done();
      });
  });
});
describe('ng-add', () => {
  it('works', () => {
    console.log(appTree.files);
    const tree = schematicRunner.runSchematic('ng-add', defaultOptions, appTree);
    console.log(tree.files);

    const appModuleContent = getFileContent(tree, `${defaultOptions.directory}/src/app/app.module.ts`);
    expect(appModuleContent.includes(`import { BadgeModule } from '@collab-ui/angular';`)).toBe(true);

    const packageJSONContent = JSON.parse(getFileContent(tree, `${defaultOptions.directory}/package.json`));
    expect(!!packageJSONContent.dependencies['@collab-ui/angular']).toBe(true);

    const stylesContent = getFileContent(tree, `${defaultOptions.directory}/src/styles.css`);
    expect(stylesContent.includes(`@import '~@collab-ui/core/scss/collab-ui';`)).toBe(true);
  });

  it('works with module option', () => {
    console.log(appTree.files);
    const tree = schematicRunner.runSchematic('ng-add', {...defaultOptions, module: 'src/app/shared/shared.module.ts'}, appTree);
    console.log(tree.files);

    const appModuleContent = getFileContent(tree, `${defaultOptions.directory}/src/app/shared/shared.module.ts`);
    expect(appModuleContent.includes(`import { BadgeModule } from '@collab-ui/angular';`)).toBe(true);

    const packageJSONContent = JSON.parse(getFileContent(tree, `${defaultOptions.directory}/package.json`));
    expect(!!packageJSONContent.dependencies['@collab-ui/angular']).toBe(true);

    const stylesContent = getFileContent(tree, `${defaultOptions.directory}/src/styles.css`);
    expect(stylesContent.includes(`@import '~@collab-ui/core/scss/collab-ui';`)).toBe(true);
  });
});
