/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable no-undef */

const dropdown = {
  prefix: "mdv2",
  component: "dropdown",
  "bg-color": {
    common: "$mds-color-theme-background-primary-ghost",
    hover: {
      common: "$mds-color-theme-background-primary-hover"
    },
    active: {
      common: "$mds-color-theme-background-primary-active"
    },
    disabled: {
      common: "$mds-color-theme-background-primary-disabled"
    },
    focus: {
      common: "$mds-color-theme-background-primary-active"
    }
  },
  "border-color": {
    common: "$mds-color-theme-outline-input-normal",
    focus: {
      common: "$mds-color-theme-outline-theme-normal"
    },
    disabled: {
      common: "$mds-color-theme-outline-primary-disabled"
    }
  },
  label: {
    radius: {
      common: "0.25rem"
    }
  },
  list: {
    "bg-color": {
      common: "$mds-color-theme-background-solid-primary-normal"
    },
    "border-color": {
      common: "$mds-color-theme-outline-secondary-normal"
    },
    padding: {
      common: "8"
    },
    item: {
      "bg-color-hover": {
        common: "$mds-color-theme-background-primary-hover"
      },
      "bg-color-focus": {
        common: "$mds-color-theme-background-primary-active"
      },
      "border-focus": {
        common: "$mds-color-theme-outline-theme-normal"
      },
      "border-radius": {
        common: "8"
      },
      height: {
        common: "36"
      }
    }
  }
};

module.exports = dropdown;
