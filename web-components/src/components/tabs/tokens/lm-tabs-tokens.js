/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const tabs = {
  prefix: "lm",
  component: "tabs",
  default: {
    "bg-color": {
      light: colors.white[60].name,
      dark: colors.gray[100].name
    },
    "text-color": {
      light: colors.gray[70].name,
      dark: colors.gray[40].name
    },
    "border-color": {
      light: colors.gray[10].name,
      dark: colors.gray[90].name
    },
    "active-border": {
      light: colors.theme[60].name,
      dark: colors.theme[40].name
    },
    "focus-bg": {
      light: colors.white[60].name,
      dark: colors.gray[90].name
    },
    "focus-border": {
      light: colors.theme[60].name,
      dark: colors.theme[40].name
    },
    "focus-shadow": {
      light: "0 0 4px 2px transparent",
      dark: "0 0 4px 2px Transparent"
    },
    "hover-border": {
      light: colors.gray[10].name,
      dark: colors.gray[20].name
    },
    hover: {
      light: colors.gray[10].name,
      dark: colors.gray[80].name
    },
    pressed: {
      light: colors.gray[20].name,
      dark: colors.gray[70].name
    },
    disabled: {
      light: colors.gray[40].name,
      dark: colors.gray[70].name
    },
    active: {
      light: colors.blue[70].name,
      dark: colors.theme[50].name
    }
  },
  "left-arrow": {
    "bg-color": {
      light:
        "linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 58%, rgba(255, 255, 255, 0.55) 77%, rgba(255, 255, 255, 0.02) 99%, rgba(255, 255, 255, 0) 100%)",
      dark:
        "linear-gradient(to right, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 1) 50%, rgba(18, 18, 18, 0.5) 75%, rgba(18, 18, 18, 0) 100%)"
    }
  },
  "right-arrow": {
    "bg-color": {
      light:
        "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.53) 24%, rgba(255, 255, 255, 1) 45%, rgba(255, 255, 255, 1) 100%)",
      dark:
        "linear-gradient(to right, rgba(18, 18, 18, 0) 0%, rgba(18, 18, 18, 0.5) 25%, rgba(18, 18, 18, 1) 50%, rgba(18, 18, 18, 1) 100%)"
    }
  }
};

module.exports = tabs;
