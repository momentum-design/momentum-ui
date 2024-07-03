/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const table = {
  prefix: "mdv2",
  component: "table",
  header: {
    "bg-color": {
      light: "$mds-color-theme-background-secondary-normal",
      dark: "$mds-color-theme-background-secondary-normal"
    }
  },
  hover: {
    "bg-color": {
      light: "$mds-color-theme-background-primary-hover",
      dark: "$mds-color-theme-background-primary-hover"
    }
  },
  pressed: {
    "bg-color": {
      light: "$mds-color-theme-background-primary-active",
      dark: "$mds-color-theme-background-primary-active"
    }
  },
  "border-color": {
    light: "$mds-color-theme-outline-secondary-normal",
    dark: "$mds-color-theme-outline-secondary-normal"
  },
  "text-color": {
    light: "$mds-color-theme-text-secondary-normal",
    dark: "$mds-color-theme-text-secondary-normal"
  },
  stripped: {
    "bg-color": {
      light: "$mds-color-theme-button-primary-disabled",
      dark: "$mds-color-theme-button-primary-disabled"
    }
  }
};

module.exports = table;
