/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const spinner = {
  prefix: "md",
  component: "spinner",
  "bg-color": {
    light: colors.gray[40].name,
    dark: colors.gray[50].name
  },
  color: {
    light: colors.black[100].name,
    dark: colors.white[100].name
  }
};

module.exports = spinner;
