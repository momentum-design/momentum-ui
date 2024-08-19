/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const colors = require("@momentum-ui/tokens/dist/colors.json");

const link = {
  prefix: "lm",
  component: "link",
  default: {
    light: colors.blue[70].name,
    dark: colors.blue[40].name
  },
  hover: {
    light: colors.blue[70].name,
    dark: colors.blue[20].name
  },
  pressed: {
    light: colors.blue[80].name,
    dark: colors.blue[10].name
  },
  focus: {
    light: colors.blue[70].name,
    dark: colors.blue[40].name,

    outline: {
      light: colors.blue[60].name,
      dark: colors.blue[60].name
    }
  },
  disabled: {
    light: colors.gray[40].name,
    dark: colors.gray[70].name
  },
  inline: {
    light: colors.red[70].name,
    dark: colors.red[50].name,

    hover: {
      light: colors.red[80].name,
      dark: colors.red[40].name
    },
    pressed: {
      light: colors.red[90].name,
      dark: colors.red[30].name
    },
    focus: {
      light: colors.red[70].name,
      dark: colors.red[50].name
    },
    "font-size": {
      light: "14px",
      dark: "14px"
    },
    "font-size__inline": {
      light: "12px",
      dark: "12px"
    }
  }
};

module.exports = link;
