/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const tooltip = {
  prefix: "lm",
  component: "tooltip",
  "font-color": {
    light: colors.gray["05"].name,
    dark: colors.gray["05"].name
  },
  "bg-color": {
    light: colors.gray[90].name,
    dark: colors.gray[90].name
  }
};

module.exports = tooltip;
