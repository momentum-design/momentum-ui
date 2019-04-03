import { NodePackageInstallTaskOptions } from '@angular-devkit/schematics/tasks/node-package/install-task';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export interface Schema {
  /** Name of the project. */
  project: string;

  /** Whether to skip the npm install. */
  skipInstall: boolean;

  module: string;

  directory: Partial<NodePackageInstallTaskOptions>;
}
