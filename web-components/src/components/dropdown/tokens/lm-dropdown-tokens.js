/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const dropdown = {
  prefix: "lm",
  component: "dropdown",
  "bg-color": {
    hover: {
      light: colors.gray[20].name,
      dark: colors.gray[90].name
    },
    active: {
      light: colors.gray[30].name,
      dark: colors.gray[80].name
    }
  },
  "border-color": {
    light: colors.gray[30].name,
    dark: colors.gray[80].name,
    focus: {
      light: colors.theme[70].name,
      dark: colors.theme[50].name
    }
  },
  label: {
    radius: {
      light: "0.25rem",
      dark: "0.25rem"
    }
  },
  list: {
    "bg-color": {
      light: colors.white[100].name,
      dark: colors.gray[90].name
    },
    item: {
      "bg-color-hover": {
        light: colors.blue[20].name,
        dark: colors.blue[50].name
      },
      "bg-color-focus": {
        light: colors.blue[50].name,
        dark: colors.blue[40].name
      }
    }
  }
};

module.exports = dropdown;
