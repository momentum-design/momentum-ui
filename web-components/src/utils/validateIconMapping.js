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
const fs = require("fs-extra");

function validateIconMapping(iconMapFile, iconManifestFile) {
  let invalidMappingFlag = false;
  const utf8Format = "utf-8";

  try {
    const iconMapData = fs.readFileSync(iconMapFile, utf8Format);
    const iconMap = JSON.parse(iconMapData);

    const iconManifestData = fs.readFileSync(iconManifestFile, utf8Format);
    const iconManifest = JSON.parse(iconManifestData);

    const iconManifestKeyArray = Object.keys(iconManifest);

    for (const key in iconMap) {
      const keyValue = iconMap[key];

      if (keyValue.length === 0 || keyValue === "Unknown") {
        //ignore empty mapping values
        continue;
      }

      if (!iconManifestKeyArray.includes(keyValue)) {
        console.log(`key: ${key}, has invlid mapping value: ${keyValue}`);
        invalidMappingFlag = true;
      }
    }
  } catch (error) {
    console.error("Error reading or parsing JSON files:", error);
  }

  return invalidMappingFlag;
}

const validateMomentumDesignMapping = async () => {
  return validateIconMapping(
    path.resolve(__dirname, "../components/icon/momentum-ui-to-design-icons.json"),
    path.resolve(__dirname, "../../node_modules/@momentum-design/icons/dist/manifest.json")
  );
};

validateMomentumDesignMapping();
