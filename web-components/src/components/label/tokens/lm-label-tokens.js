/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const label = {
  prefix: "lm",
  component: "label",
  color: {
    light: colors.black[100].name,
    dark: colors.gray[30].name
  },
  secondary: {
    light: colors.gray[70].name,
    dark: colors.gray[40].name
  }
};

module.exports = label;
