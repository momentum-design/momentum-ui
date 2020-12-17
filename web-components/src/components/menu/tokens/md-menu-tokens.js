/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const colors = require("@momentum-ui/tokens/dist/colors.json");

const menu = {
  prefix: "md",
  component: "menu",
  default: {
    light: colors.gray[90].name,
    dark: colors.gray[20].name
  },
  hover: {
    light: colors.blue[70].name,
    dark: colors.blue[20].name
  },
  pressed: {
    light: colors.blue[80].name,
    dark: colors.blue[10].name
  }
};

module.exports = menu;
