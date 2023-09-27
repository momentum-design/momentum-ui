/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const tabs = {
  prefix: "md",
  component: "tabs",
  default: {
    "bg-color": {
      light: colors.white[100].name,
      dark: colors.gray[90].name
    },
    "text-color": {
      light: colors.gray[80].name,
      dark: colors.gray[30].name
    },
    "border-color": {
      light: colors.gray[20].name,
      dark: colors.gray[80].name
    },
    "active-border": {
      light: colors.theme[50].name,
      dark: colors.theme[50].name
    },
    "focus-bg": {
      light: colors.white[100].name,
      dark: colors.gray[90].name
    },
    "focus-border": {
      light: colors.blue[60].name,
      dark: colors.blue[40].name
    },
    "hover-border": {
      light: colors.gray[20].name,
      dark: colors.gray[30].name
    },
    hover: {
      light: colors.gray[10].name,
      dark: colors.gray[80].name
    },
    pressed: {
      light: colors.gray[20].name,
      dark: colors.gray[90].name
    },
    disabled: {
      light: colors.gray[50].name,
      dark: colors.gray[60].name
    },
    active: {
      light: colors.theme[70].name,
      dark: colors.theme[40].name
    }
  },
  "left-arrow": {
    "bg-color": {
      light: colors.white[100].name,
      dark: colors.gray[90].name
    }
  },
  "right-arrow": {
    "bg-color": {
      light: colors.white[100].name,
      dark: colors.gray[90].name
    }
  }
};

module.exports = tabs;
