/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const label = {
  prefix: "mdv2",
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
