/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const accordion = {
  prefix: "mdv2",
  component: "accordion",
  "color-border": {
    light: colors.gray[10].name,
    dark: colors.gray[90].name
  },
  "bg-focus": {
    light: colors.white[60].name,
    dark: colors.gray[90].name
  },
  hover: {
    light: colors.gray[10].name,
    dark: colors.gray[80].name
  },
  active: {
    light: colors.blue[60].name,
    dark: colors.blue[50].name
  }
};

module.exports = accordion;
