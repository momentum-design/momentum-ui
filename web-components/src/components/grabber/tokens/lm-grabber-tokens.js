/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const grabber = {
  prefix: "lm",
  component: "grabber",
  "bg-color": {
    light: colors.gray[20].name,
    dark: colors.gray[80].name
  },
  "text-color": {
    light: colors.gray[100].name,
    dark: colors.gray["05"].name
  },
  hover: {
    "bg-color": {
      light: colors.gray[30].name,
      dark: colors.gray[70].name
    }
  },
  pressed: {
    "bg-color": {
      light: colors.gray[30].name,
      dark: colors.gray[70].name
    }
  },
  width: {
    common: "14px"
  },
  "border-radius": {
    common: "16px"
  },
  "border-width": {
    light: "0"
  }
};

module.exports = grabber;
