/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const colors = require("@momentum-ui/tokens/dist/colors.json");

const card = {
  prefix: "md",
  component: "card",
  color: {
    light: colors.black[100].name,
    dark: colors.white[100].name,
    title: {
      light: colors.gray[100].name,
      dark: colors.gray["05"].name
    }
  },
  bg: {
    light: colors.white[100].name,
    dark: colors.gray[90].name
  },
  border: {
    light: colors.gray[20].name,
    dark: colors.gray[80].name
  }
};

module.exports = card;
