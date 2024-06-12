/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const colors = require("@momentum-ui/tokens/dist/colors.json");

const menu = {
  prefix: "mdv2",
  component: "menu",
  default: {
    light: colors.gray[100].name,
    dark: colors.gray[10].name
  },
  hover: {
    "bg": {
      light: colors.blue[10].name,
      dark: colors.blue[80].name
    }
  },
  pressed: {
    "bg": {
      light: colors.blue[20].name,
      dark: colors.blue[70].name
    }
  }
};

module.exports = menu;
