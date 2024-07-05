/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const list = {
  prefix: "mdv2",
  component: "list",
  "text-color": {
    light: "$mds-color-theme-text-primary-normal",
    dark: "$mds-color-theme-text-primary-normal"
  },
  hover: {
    background: {
      light: "$mds-color-theme-background-primary-hover",
      dark: "$mds-color-theme-background-primary-hover"
    },
    "text-color": {
      light: "$mds-color-theme-text-primary-normal",
      dark: "$mds-color-theme-text-primary-normal"
    }
  },
  disabled: {
    "text-color": {
      light: "$mds-color-theme-text-primary-disabled",
      dark: "$mds-color-theme-text-primary-disabled"
    }
  },
  active: {
    background: {
      light: "$mds-color-theme-background-primary-active",
      dark: "$mds-color-theme-background-primary-active"
    },
    "text-color": {
      light: "$mds-color-theme-text-primary-normal",
      dark: "$mds-color-theme-text-primary-normal"
    }
  },
  focus: {
    "border-color": {
      light: "$mds-color-theme-outline-theme-normal",
      dark: "$mds-color-theme-outline-theme-normal"
    }
  },
  "border-radius": {
    pill: {
      light: "9999px",
      dark: "9999px"
    },
    rounded: {
      light: "0.5rem",
      dark: "0.5rem"
    }
  },
  "line-height": {
    light: "1.5rem",
    dark: "1.5rem"
  }
};

module.exports = list;
