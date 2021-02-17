/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const dropdown = {
  prefix: "lm",
  component: "dropdown",
  "bg-color": {
    focus: {
      light: colors.gray[10].name,
      dark: colors.gray[90].name
    }
  },
  "border-color": {
    light: colors.gray[30].name,
    dark: colors.gray[80].name,
    focus: {
      light: colors.gray[30].name,
      dark: colors.gray[70].name
    }
  },
  list: {
    "bg-color": {
      light: colors.white[100].name,
      dark: colors.gray[90].name
    },
    item: {
      "hover-bg-color": {
        light: colors.blue[10].name,
        dark: colors.blue[70].name
      },
      "focus-bg-color": {
        light: colors.blue[20].name,
        dark: colors.blue[80].name
      }
    }
  }
};

module.exports = dropdown;
