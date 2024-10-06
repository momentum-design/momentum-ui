/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const list = {
  prefix: "md",
  component: "advance-list",
  "text-color": {
    light: colors.gray[100].name,
    dark: colors.gray["05"].name
  },
  hover: {
    background: {
      light: colors.blue[20].name,
      dark: colors.blue[50].name
    },
    "text-color": {
      light: colors.gray[100].name,
      dark: colors.gray[100].name
    }
  },
  disabled: {
    "text-color": {
      light: colors.gray[40].name,
      dark: colors.gray[70].name
    }
  },
  active: {
    background: {
      light: colors.blue[50].name,
      dark: colors.blue[40].name
    },
    "text-color": {
      light: colors.gray[100].name,
      dark: colors.gray[100].name
    }
  },
  focus: {
    "border-color": {
      light: colors.blue[70].name,
      dark: colors.blue[40].name
    }
  }
};

module.exports = list;
