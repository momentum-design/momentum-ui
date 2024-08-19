/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const colors = require("@momentum-ui/tokens/dist/colors.json");

const menu = {
  prefix: "md",
  component: "menu",
  default: {
    light: colors.gray[100].name,
    dark: colors.gray[20].name
  },
  hover: {
    bg: {
      light: colors.blue[20].name,
      dark: colors.blue[80].name
    }
  },
  pressed: {
    bg: {
      light: colors.blue[30].name,
      dark: colors.blue[70].name
    }
  }
};

module.exports = menu;
