/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const buttonGroup = {
  prefix: "mdv2",
  component: "button-group",
  color: {
    light: colors.gray[70].name,
    dark: colors.gray[40].name,
    active: {
      light: colors.gray[100].name,
      dark: colors.gray["05"].name
    }
  },
  "bg-color": {
    light: colors.gray[20].name,
    dark: colors.gray[95].name,
    hover: {
      light: colors.gray[30].name,
      dark: colors.gray[90].name
    },
    pressed: {
      light: colors.gray[40].name,
      dark: colors.gray[80].name
    },
    focus: {
      light: colors.gray[30].name,
      dark: colors.gray[90].name
    },
    active: {
      light: colors.white[100].name,
      dark: colors.gray[60].name
    }
  }
};

module.exports = buttonGroup;
