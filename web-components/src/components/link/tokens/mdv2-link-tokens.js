/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const link = {
  prefix: "mdv2",
  component: "link",
  default: {
    light: "$mds-color-theme-text-accent-normal",
    dark: "$mds-color-theme-text-accent-normal"
  },
  hover: {
    light: "$mds-color-theme-text-accent-hover",
    dark: "$mds-color-theme-text-accent-hover"
  },
  pressed: {
    light: "$mds-color-theme-text-accent-active",
    dark: "$mds-color-theme-text-accent-active"
  },
  focus: {
    light: "$mds-color-theme-common-text-primary-disabled",
    dark: "$mds-color-theme-common-text-primary-disabled",

    outline: {
      light: "$mds-color-theme-common-text-primary-disabled",
      dark: "$mds-color-theme-common-text-primary-disabled"
    }
  },
  disabled: {
    light: "$mds-color-theme-common-text-primary-disabled",
    dark: "$mds-color-theme-common-text-primary-disabled"
  },
  inline: {
    light: "$mds-color-theme-text-error-normal",
    dark: "$mds-color-theme-text-error-normal",

    hover: {
      light: "$mds-color-theme-text-error-hover",
      dark: "$mds-color-theme-text-error-hover"
    },
    pressed: {
      light: "$mds-color-theme-text-error-active",
      dark: "$mds-color-theme-text-error-active"
    },
    focus: {
      light: "$mds-color-theme-text-error-normal",
      dark: "$mds-color-theme-text-error-normal"
    },
    "font-size": {
      light: "14px",
      dark: "14px"
    },
    "font-size__inline": {
      light: "12px",
      dark: "12px"
    }
  }
};

module.exports = link;
