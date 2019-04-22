import {chain, noop, Rule, Tree} from '@angular-devkit/schematics';
import {
  addModuleImportToModule,
  buildComponent,
  findModuleFromOptions,
} from '@angular/cdk/schematics';

import {Schema} from './schema';

/**
 * Scaffolds a new navigation component.
 */
export default function(options: Schema): Rule {
  return chain([
    buildComponent({...options}, {
      template: './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.html',
      stylesheet: './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.__style__',
    }),
    options.skipImport ? noop() : addNavModulesToModule(options)
  ]);
}

/**
 * Adds the required modules to the relative module.
 */
function addNavModulesToModule(options: Schema) {
  return (host: Tree) => {
    const modulePath = findModuleFromOptions(host, options)!;
    addModuleImportToModule(host, modulePath, 'TopbarModule', '@momentum-ui/angular');
    addModuleImportToModule(host, modulePath, 'ButtonModule', '@momentum-ui/angular');
    addModuleImportToModule(host, modulePath, 'ListItemModule', '@momentum-ui/angular');
    return host;
  };
}
