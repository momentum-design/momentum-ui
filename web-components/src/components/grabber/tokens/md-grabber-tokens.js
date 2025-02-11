/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const grabber = {
  prefix: "md",
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
    common: "12px"
  },
  "border-radius": {
    common: "10px"
  },
  "border-width": {
    common: "0"
  },
  shadow: {
    common: "0px 0px 1px rgba(0, 0, 0, 0.18), 0px 2px 4px rgba(0, 0, 0, 0.16)"
  }
};

module.exports = grabber;
