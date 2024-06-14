/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const alertBanner = {
  prefix: "lm",
  component: "alert-banner",
  default: {
    "bg-color": {
      light: colors.blue[10].name,
      dark: colors.blue[70].name
    },
    "text-color": {
      light: colors.blue[70].name,
      dark: colors.blue[10].name
    }
  },
  error: {
    "bg-color": {
      light: colors.red[10].name,
      dark: colors.red[70].name
    },
    "text-color": {
      light: colors.red[70].name,
      dark: colors.red[10].name
    }
  },
  warning: {
    "bg-color": {
      light: colors.yellow[10].name,
      dark: colors.yellow[70].name
    },
    "text-color": {
      light: colors.yellow[70].name,
      dark: colors.yellow[10].name
    }
  },
  success: {
    "bg-color": {
      light: colors.green[10].name,
      dark: colors.green[70].name
    },
    "text-color": {
      light: colors.green[70].name,
      dark: colors.green[10].name
    }
  }
};

module.exports = alertBanner;
