/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const buttonGroup = {
  prefix: "md",
  component: "button-group",
  color: {
    light: colors.gray[80].name,
    dark: colors.gray[50].name,
    active: {
      light: colors.gray[100].name,
      dark: colors.gray[10].name
    }
  },
  "bg-color": {
    light: colors.gray[30].name,
    dark: colors.gray[90].name,
    hover: {
      light: colors.gray[40].name,
      dark: colors.gray[100].name
    },
    pressed: {
      light: colors.gray[50].name,
      dark: colors.gray[90].name
    },
    focus: {
      light: colors.gray[40].name,
      dark: colors.gray[100].name
    },
    active: {
      light: colors.white[100].name,
      dark: colors.gray[70].name
    }
  }
};

module.exports = buttonGroup;
