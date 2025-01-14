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
const colorData = require("@momentum-ui/tokens/dist/colors.json");
const semanticColorData = require("@momentum-ui/tokens/dist/semanticColor.json");
const tokenFileData = require("../tokens/vars/tokenFiles.js");
const tokenImports = require("../tokens/tokenImports.js");
const fse = require("fs-extra");
const fsPath = require("fs-path");

const createdStyleSheets = [];
const componentsWithTokens = [];

const _generateFileFromTemplate = async (dest, fileName, data, template) => {
  const source = await fse.readFile(template, "utf8");
  const compile = handlebars.compile(source);
  const finalFile = path.join(dest, fileName);
  await fsPath.writeFile(finalFile, compile(data), (err) => {
    if (err) throw err;
  });
};

const generateColorsFromTokens = async () => {
  await _generateFileFromTemplate(
    path.resolve(__dirname, "../wc_scss/colors/vars/"),
    "color-settings.scss",
    colorData,
    path.resolve(__dirname, "../templates/colors-settings.hbs")
  );
  await _generateFileFromTemplate(
    path.resolve(__dirname, "../wc_scss/colors/vars/"),
    "color-utilities.scss",
    colorData,
    path.resolve(__dirname, "../templates/colors.hbs")
  );
  // CSS Momentum Color Variables
  await _generateFileFromTemplate(
    path.resolve(__dirname, "../wc_scss/colors/vars/"),
    "css-color-variables.scss",
    colorData,
    path.resolve(__dirname, "../templates/css-color-variables.hbs")
  );
};

const generateSemanticColorsFromTokens = async () => {
  await _generateFileFromTemplate(
    path.resolve(__dirname, "../wc_scss/colors/vars/"),
    "semantic-color-settings.scss",
    semanticColorData,
    path.resolve(__dirname, "../templates/semantic-color-settings.hbs")
  );

  // Dark & Light CSS Semantic Color Variables
  await _generateFileFromTemplate(
    path.resolve(__dirname, "../wc_scss/colors/vars/"),
    `semantic-colors--light.scss`,
    semanticColorData,
    path.resolve(__dirname, "../templates/semantic-color-light.hbs")
  );

  await _generateFileFromTemplate(
    path.resolve(__dirname, "../wc_scss/colors/vars/"),
    `semantic-colors--dark.scss`,
    semanticColorData,
    path.resolve(__dirname, "../templates/semantic-color-dark.hbs")
  );
};

const _getDeepestKeys = (obj) => {
  let keys = [];
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      const subkeys = _getDeepestKeys(obj[key]);
      keys = keys.concat(
        subkeys.map(function (subkey) {
          return subkey;
        })
      );
    } else {
      keys.push(key);
    }
  }
  return keys;
};

const _checkDataFileFormat = (colorDataFileName, colorDataFile) => {
  const deepestKeys = _getDeepestKeys(colorDataFile);

  let errorMsg = "";

  if (deepestKeys.shift() !== "prefix") {
    errorMsg += `\nThe token object in ${colorDataFileName} needs to begin with the property key "prefix".`;
  }

  if (deepestKeys.shift() !== "component") {
    errorMsg += `\nThe token object in ${colorDataFileName} needs to have it's second property key to be "component".`;
  }

  if (!deepestKeys.includes("light") && !deepestKeys.includes("dark") && !deepestKeys.includes("common")) {
    errorMsg += `The token object in ${colorDataFileName} needs to have all colors defined with key name "light", "dark" or "common".\n`;
  }

  if (errorMsg.length > 0) {
    console.error(errorMsg);
    process.exit(1);
  }
};

const _generateComponentColors = async (componentName, colorDataFileName, colorDataFile) => {
  _checkDataFileFormat(colorDataFileName, colorDataFile);

  if (!componentsWithTokens.includes(componentName)) componentsWithTokens.push(componentName);
  const destination = path.resolve(__dirname, `../components/${componentName}/scss/vars`);
  const filePrefix = `${colorDataFile.prefix}-${componentName}`;

  // Color Tokens as SCSS Variables
  await _generateFileFromTemplate(
    destination,
    `${filePrefix}-settings.scss`,
    colorDataFile,
    path.resolve(__dirname, "../templates/component-colors.hbs")
  );
  createdStyleSheets.push(path.join(`${filePrefix}-settings`));

  // Dark & Light CSS Variables
  await _generateFileFromTemplate(
    destination,
    `${filePrefix}--light.scss`,
    colorDataFile,
    path.resolve(__dirname, "../templates/light-colors.hbs")
  );
  createdStyleSheets.push(path.join(`${filePrefix}--light`));

  await _generateFileFromTemplate(
    destination,
    `${filePrefix}--dark.scss`,
    colorDataFile,
    path.resolve(__dirname, "../templates/dark-colors.hbs")
  );
  createdStyleSheets.push(path.join(`${filePrefix}--dark`));
};

const _lowercaseFirstLetter = (word) => {
  return word.replace(/([A-Z])([a-zA-Z]*)/g, function (group1) {
    return group1.toLowerCase();
  });
};

const generateThemeStylesheets = () => {
  const lightDarkThemes = ["Light", "Dark"];
  const designThemes = ["lm", "md", "mdv2"];

  const autoGeneratedMessage = `//----------------------------------------------------------
// Do not edit this file directly. This is generated from
// Lumos color tokens & imported Momentum color tokens.
// src/components/\${componentName}/tokens/*.js
// @momentum-ui/tokens/src/core/\${componentName}.js
//----------------------------------------------------------\n
`;

  const themeStyles = ["lmLight", "mdLight", "lmDark", "mdDark", "mdv2Light", "mdv2Dark"];
  const themeStyleFiles = {
    lmLight: `${autoGeneratedMessage}@import "@/wc_scss/colors/settings.scss";\n`,
    mdLight: `${autoGeneratedMessage}@import "@/wc_scss/colors/settings.scss";\n`,
    lmDark: `${autoGeneratedMessage}@import "@/wc_scss/colors/settings.scss";\n`,
    mdDark: `${autoGeneratedMessage}@import "@/wc_scss/colors/settings.scss";\n`,
    mdv2Light: `${autoGeneratedMessage}@import "@/wc_scss/colors/settings.scss";\n`,
    mdv2Dark: `${autoGeneratedMessage}@import "@/wc_scss/colors/settings.scss";\n`
  };

  for (const lightDarkTheme of lightDarkThemes) {
    for (const designTheme of designThemes) {
      const lowercaseLightDarkTheme = _lowercaseFirstLetter(lightDarkTheme);

      themeStyleFiles[`${designTheme}${lightDarkTheme}`] +=
        `@import "@/wc_scss/colors/vars/css-color-variables.scss";\n`;

      themeStyleFiles[`${designTheme}${lightDarkTheme}`] +=
        `@import "@/wc_scss/colors/vars/semantic-color-settings.scss";\n`;

      themeStyleFiles[`${designTheme}${lightDarkTheme}`] +=
        `@import "@/wc_scss/colors/vars/semantic-colors--${lowercaseLightDarkTheme}.scss";\n`;

      themeStyleFiles[`${designTheme}${lightDarkTheme}`] +=
        `@import "@/wc_scss/themes/global--${lowercaseLightDarkTheme}.scss";\n`;

      themeStyleFiles[`${designTheme}${lightDarkTheme}`] += `@import "@/wc_scss/themes/global--${designTheme}.scss";\n`;

      themeStyleFiles[`${designTheme}${lightDarkTheme}`] +=
        `@import "@momentum-design/tokens/dist/scss/theme/webex/${lowercaseLightDarkTheme}-stable.scss";\n`;

      for (const componentName of componentsWithTokens) {
        themeStyleFiles[`${designTheme}${lightDarkTheme}`] +=
          `@import "@/components/${componentName}/scss/vars/${designTheme}-${componentName}-settings.scss";\n`;

        themeStyleFiles[`${designTheme}${lightDarkTheme}`] +=
          `@import "@/components/${componentName}/scss/vars/${designTheme}-${componentName}--${lowercaseLightDarkTheme}.scss";\n`;
      }
    }
  }

  for (const themeStyleName of themeStyles) {
    themeStyleFiles[themeStyleName] += `\n:root,\n:host {\n`;
    themeStyleFiles[themeStyleName] += `  @include css-color-variables;\n`;
    themeStyleFiles[themeStyleName] += `  @include global-vars;\n`;
    themeStyleFiles[themeStyleName] += `  @include global-theme-specific-vars;\n`;
    themeStyleFiles[themeStyleName] += `  @include semantic-color-vars;\n`;

    for (const componentName of componentsWithTokens) {
      themeStyleFiles[themeStyleName] += `  @include ${componentName}-vars;\n`;
    }
    themeStyleFiles[themeStyleName] += `}\n`;

    const themeStyleFilePath = path.resolve(__dirname + `/../wc_scss/themes/vars/${themeStyleName}.scss`);
    fsPath.writeFile(themeStyleFilePath, themeStyleFiles[themeStyleName], (err) => {
      if (err) throw err;
    });
  }
};

const generateComponentScssFromTokens = async () => {
  const allTokenFiles = tokenFileData.tokenFiles.concat(tokenImports);
  let index = 0;
  for (const tokenObject of allTokenFiles) {
    const componentName = tokenObject.component;
    const tokenFileName = tokenFileData.tokenFileNames[index];
    await _generateComponentColors(componentName, tokenFileName, tokenObject);
    index++;
  }

  generateThemeStylesheets();
};

generateColorsFromTokens();
generateSemanticColorsFromTokens();
generateComponentScssFromTokens();
