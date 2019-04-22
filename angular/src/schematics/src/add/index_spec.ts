import { join } from 'path';
import { Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { getFileContent } from '@schematics/angular/utility/test';

// SchematicTestRunner needs an absolute path to the collection to test.
const collectionPath = join(__dirname, '../collection.json');
let appTree: UnitTestTree;
const appOptions: any = {
  name: 'foo',
  version: '6.0.0',
  directory: '/',
};
const defaultOptions: any = {
  project: 'foo',
  disableBugsnag: true,
  directory: '/',
};
const schematicRunner = new SchematicTestRunner(
  '@momentum-ui/angular',
  collectionPath
);

beforeEach(done => {
  appTree = new UnitTestTree(Tree.empty());
  schematicRunner
    .runExternalSchematicAsync(
      '@schematics/angular',
      'ng-new',
      appOptions,
      appTree
    )
    .subscribe(t => {
      schematicRunner
        .runExternalSchematicAsync(
          '@schematics/angular',
          'module',
          { name: 'shared', project: 'foo' },
          t
        )
        .subscribe(tree => {
          appTree = tree;
          done();
        });
    });
});
describe('ng-add', () => {
  it('works', () => {
    console.info(appTree.files);
    const tree = schematicRunner.runSchematic(
      'ng-add',
      defaultOptions,
      appTree
    );
    console.info(tree.files);

    const appModuleContent = getFileContent(
      tree,
      `${defaultOptions.directory}/src/app/app.module.ts`
    );
    expect(
      appModuleContent.includes(
        `import { BadgeModule } from '@momentum-ui/angular';`
      )
    ).toBe(true);

    const packageJSONContent = JSON.parse(
      getFileContent(tree, `${defaultOptions.directory}/package.json`)
    );
    expect(!!packageJSONContent.dependencies['@momentum-ui/angular']).toBe(true);

    const stylesContent = getFileContent(
      tree,
      `${defaultOptions.directory}/src/styles.css`
    );
    expect(
      stylesContent.includes(`@import '~@momentum-ui/core/scss/momentum-ui';`)
    ).toBe(true);
  });

  it('works with module option', () => {
    console.info(appTree.files);
    const tree = schematicRunner.runSchematic(
      'ng-add',
      { ...defaultOptions, module: 'src/app/shared/shared.module.ts' },
      appTree
    );
    console.info(tree.files);

    const appModuleContent = getFileContent(
      tree,
      `${defaultOptions.directory}/src/app/shared/shared.module.ts`
    );
    expect(
      appModuleContent.includes(
        `import { BadgeModule } from '@momentum-ui/angular';`
      )
    ).toBe(true);

    const packageJSONContent = JSON.parse(
      getFileContent(tree, `${defaultOptions.directory}/package.json`)
    );
    expect(!!packageJSONContent.dependencies['@momentum-ui/angular']).toBe(true);

    const stylesContent = getFileContent(
      tree,
      `${defaultOptions.directory}/src/styles.css`
    );
    expect(
      stylesContent.includes(`@import '~@momentum-ui/core/scss/momentum-ui';`)
    ).toBe(true);
  });
});
