/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const alert = {
  prefix: "mdv2",
  component: "alert",
  default: {
    "bg-color": {
      light: colors.white[60].name,
      dark: colors.gray[90].name
    },
    "align-items": {
      light: "flex-start",
      dark: "flex-start"
    },
    "text-color": {
      light: colors.gray[70].name,
      dark: colors.gray[20].name
    },
    "icon-size": {
      light: "24px",
      dark: "24px"
    }
  },
  title: {
    "text-color": {
      light: colors.gray[100].name,
      dark: colors.gray["05"].name
    },
    "font-size": {
      light: "1rem",
      dark: "1rem"
    }
  },
  close: {
    "bg-color": {
      light: colors.white[60].name,
      dark: colors.gray[90].name
    },
    size: {
      light: "1rem",
      dark: "1rem"
    },
    "text-color": {
      light: colors.gray[100].name,
      dark: colors.gray["05"].name
    }
  }
};

module.exports = alert;
