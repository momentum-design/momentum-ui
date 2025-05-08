/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const accordion = {
  prefix: "lm",
  component: "accordion",
  "border-radius": {
    common: "0.25rem"
  },
  "item-margin": {
    common: "0"
  },
  "item-header-border-radius": {
    common: "0.25rem"
  },
  "item-header-bg": {
    common: "transparent"
  },
  "item-header-color-active": {
    common: "$mds-color-theme-outline-theme-normal"
  },
  "color-border": {
    light: colors.gray[10].name,
    dark: colors.gray[90].name
  },
  "bg-focus": {
    light: colors.white[60].name,
    dark: colors.gray[90].name
  },
  hover: {
    light: colors.gray[10].name,
    dark: colors.gray[80].name
  },
  active: {
    light: colors.blue[60].name,
    dark: colors.blue[50].name
  }
};

module.exports = accordion;
