/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const toggleSwitch = {
  prefix: "lm",
  component: "toggle-switch",
  "bg-color": {
    light: colors.gray[50].name,
    dark: colors.gray[50].name
  },
  "bg-color--hover": {
    light: colors.gray[40].name,
    dark: colors.gray[40].name
  },
  "bg-color--checked": {
    light: colors.blue[60].name,
    dark: colors.blue[50].name
  },
  "bg-color--checked-hover": {
    light: colors.blue[70].name,
    dark: colors.blue[60].name
  },
  "bg-color--disabled": {
    light: colors.gray[10].name,
    dark: colors.gray[90].name
  },
  "bg-color--disabled--checked": {
    light: colors.blue[10].name,
    dark: colors.blue[90].name
  },
  slider: {
    color: {
      common: colors.white["100"].name
    },
    "color--checked": {
      common: colors.white["100"].name
    },
    "color-disabled": {
      light: colors.gray["05"].name,
      dark: colors.gray[70].name
    },
    "color-disabled--checked": {
      light: colors.white[100].name,
      dark: colors.gray[70].name
    }
  },
  focus: {
    light: colors.blue[50].name,
    dark: colors.blue[60].name
  }
};

module.exports = toggleSwitch;
