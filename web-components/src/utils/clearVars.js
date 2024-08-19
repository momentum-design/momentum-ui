/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const rimraf = require("rimraf");
const fsx = require("fs-extra");
const { readdirSync } = require("fs");

const removeDirectory = (path) => {
  rimraf(path, function () {
    console.log(`successfully removed ${path}`);
  });
};

const allComponentVars = async () => {
  const source = path.resolve(__dirname, "../components");
  return readdirSync(source, { withFileTypes: true })
    .filter((componentDir) => componentDir.isDirectory())
    .filter((componentDir) => fsx.existsSync(path.resolve(__dirname, `../components/${componentDir.name}/scss/vars/`)))
    .map((componentDir) => {
      return componentDir.name;
    });
};

const clearVars = async () => {
  const colorVars = path.resolve(__dirname, "../wc_scss/colors/vars");
  const themeVars = path.resolve(__dirname, "../wc_scss/themes/vars");
  const compiledTokenFiles = path.resolve(__dirname, "../tokens/vars");

  const componentVars = await allComponentVars();
  for (const componentName of componentVars) {
    await removeDirectory(path.resolve(__dirname, `../components/${componentName}/scss/vars`));
  }

  await removeDirectory(colorVars);
  await removeDirectory(themeVars);
  await removeDirectory(compiledTokenFiles);
};

clearVars();
