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
const handlebars = require("handlebars");
// const colorData = require("@momentum-ui/tokens/dist/colors.json");
const semanticColorData = require("@momentum-ui/tokens/dist/semanticColor.json");
// const tokenFileData = require("../tokens/vars/tokenFiles.js");
// const tokenImports = require("../tokens/tokenImports.js");
const fse = require("fs-extra");
const fsPath = require("fs-path");

// const createdStyleSheets = [];
// const componentsWithTokens = [];

const _generateFileFromTemplate = async (dest, fileName, data, template) => {
  const source = await fse.readFile(template, "utf8");
  const compile = handlebars.compile(source);
  const finalFile = path.join(dest, fileName);
  await fsPath.writeFile(finalFile, compile(data), err => {
    if (err) throw err;
    else console.warn(`${finalFile} written!`);
  });
};

// NEW
const generateColorTableData = async () => {
  await _generateFileFromTemplate(
    path.resolve(__dirname, "../wc_scss/colors/vars/"),
    "color-table-data-string.ts",
    semanticColorData,
    path.resolve(__dirname, "../templates/color-table-data-string.hbs")
  );
};

generateColorTableData();