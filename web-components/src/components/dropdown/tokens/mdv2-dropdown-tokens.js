/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const dropdown = {
  prefix: "mdv2",
  component: "dropdown",
  "bg-color": {
    hover: {
      light: "$mds-color-theme-background-primary-hover",
      dark: "$mds-color-theme-background-primary-hover"
    },
    active: {
      light: "$mds-color-theme-background-primary-active",
      dark: "$mds-color-theme-background-primary-active"
    }
  },
  "border-color": {
    light: "$mds-color-theme-outline-input-normal",
    dark: "$mds-color-theme-outline-input-normal",
    focus: {
      light: "$mds-color-theme-outline-theme-normal",
      dark: "$mds-color-theme-outline-theme-normal"
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
      light: "$mds-color-theme-background-solid-primary-normal",
      dark: "$mds-color-theme-background-solid-primary-normal"
    },
    "border-color": {
      light: "$mds-color-theme-outline-secondary-normal",
      dark: "$mds-color-theme-outline-secondary-normal"
    },
    padding: {
      light: "8",
      dark: "8"
    },
    item: {
      "bg-color-hover": {
        light: "$mds-color-theme-background-primary-hover",
        dark: "$mds-color-theme-background-primary-hover"
      },
      "bg-color-focus": {
        light: "$mds-color-theme-background-primary-active",
        dark: "$mds-color-theme-background-primary-active"
      },
      "border-focus": {
        light: "$mds-color-theme-outline-theme-normal",
        dark: "$mds-color-theme-outline-theme-normal"
      },
      "border-radius": {
        light: "8",
        dark: "8"
      },
      height: {
        light: "40",
        dark: "40"
      }
    }
  }
};

module.exports = dropdown;
