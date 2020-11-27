/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const pagination = {
  prefix: "md",
  component: "pagination",
  color: {
    light: colors.gray[50].name,
    dark: colors.gray[40].name,
    current: {
      light: colors.gray[100].name,
      dark: colors.gray[60].name
    }
  },
  "bg-hover": {
    light: colors.gray[20].name,
    dark: colors.gray[60].name
  },
  nav: {
    color: {
      light: colors.gray[90].name,
      dark: colors.gray[40].name
    },
    focus: {
      light: colors.blue[60].name,
      dark: colors.blue[40].name
    },
    hover: {
      light: colors.gray[100].name,
      dark: colors.gray[60].name
    },
    disabled: {
      light: colors.gray[30].name,
      dark: colors.gray[30].name
    }
  },
  "dots-color": {
    light: colors.gray[30].name,
    dark: colors.gray[40].name,
    current: {
      light: colors.gray[100].name,
      dark: colors.gray[60].name
    }
  }
};

module.exports = pagination;
