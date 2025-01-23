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
  },
  "default-momentum": {
    "bg-color": {
      common: "$mds-color-theme-background-secondary-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    }
  },
  promotional: {
    bg: {
      common: "$mds-color-theme-common-button-promotion-normal"
    },
    "text-color": {
      common: "$mds-color-theme-common-text-primary-normal"
    }
  }
};

module.exports = alertBanner;
