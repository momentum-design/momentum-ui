/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const accordion = {
  prefix: "md",
  component: "accordion",
  color: {
    light: colors.gray[80].name,
    dark: colors.gray[30].name
  },
  "color-border": {
    light: colors.gray[20].name,
    dark: colors.gray[80].name
  },
  "bg-focus": {
    light: colors.white[100].name,
    dark: colors.gray[90].name
  },
  "border-focus": {
    light: colors.blue[60].name,
    dark: colors.blue[40].name
  },
  hover: {
    light: colors.gray[10].name,
    dark: colors.gray[80].name
  },
  disabled: {
    light: colors.gray[50].name,
    dark: colors.gray[60].name
  },
  active: {
    light: colors.blue[50].name,
    dark: colors.blue[40].name
  }
};

module.exports = accordion;
