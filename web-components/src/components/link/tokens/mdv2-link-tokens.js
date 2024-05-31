/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const colors = require("@momentum-ui/tokens/dist/colors.json");

const link = {
  prefix: "mdv2",
  component: "link",
  default: {
    light: "$mds-color-theme-accent-text-default",
    dark: "$mds-color-theme-accent-text-default"
  },
  hover: {
    light: "$mds-color-theme-accent-text-hover",
    dark: "$mds-color-theme-accent-text-hover"
  },
  pressed: {
    light: "$mds-color-theme-accent-text-active",
    dark: "$mds-color-theme-accent-text-active"
  },
  focus: {
    light: "$mds-color-theme-neutral-text-disabled",
    dark: "$mds-color-theme-neutral-text-disabled",

    outline: {
      light: "$mds-color-theme-neutral-text-disabled",
      dark: "$mds-color-theme-neutral-text-disabled"
    }
  },
  disabled: {
    light: "$mds-color-theme-neutral-text-disabled",
    dark: "$mds-color-theme-neutral-text-disabled"
  },
  inline: {
    light: "$mds-color-theme-negative-text-default",
    dark: "$mds-color-theme-negative-text-default",

    hover: {
      light: "$mds-color-theme-negative-text-hover",
      dark: "$mds-color-theme-negative-text-hover"
    },
    pressed: {
      light: "$mds-color-theme-negative-text-active",
      dark: "$mds-color-theme-negative-text-active"
    },
    focus: {
      light: "$mds-color-theme-negative-text-default",
      dark: "$mds-color-theme-negative-text-default"
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
