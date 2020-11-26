/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const accordion = {
  prefix: "md",
  component: "accordion",
  "color-border": {
    light: colors.gray[20].name,
    dark: colors.gray[80].name
  },
  "bg-focus": {
    light: colors.white[100].name,
    dark: colors.gray[90].name
  },
  hover: {
    light: colors.blue[10].name,
    dark: colors.blue[80].name
  },
  active: {
    light: colors.blue[50].name,
    dark: colors.blue[40].name
  }
};

module.exports = accordion;
