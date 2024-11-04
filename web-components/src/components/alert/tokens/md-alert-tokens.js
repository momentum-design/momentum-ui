/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const alert = {
  prefix: "md",
  component: "alert",
  default: {
    "bg-color": {
      light: colors.white[100].name,
      dark: colors.gray[80].name
    },
    "align-items": {
      light: "center",
      dark: "center"
    },
    "text-color": {
      light: colors.gray[90].name,
      dark: colors.gray[10].name
    },
    "icon-size": {
      light: "40px",
      dark: "40px"
    },
    "border-color": {
      light: colors.gray[20].name,
      dark: colors.gray[80].name
    },
    "new-border-color": {
      light: colors.gray[20].name,
      dark: colors.gray[80].name
    },
    "new-body-text-color": {
      common: "$mds-color-theme-text-primary-normal"
    }
  },
  title: {
    "text-color": {
      light: colors.theme[50].name,
      dark: colors.theme[60].name
    },
    "font-size": {
      light: "1rem",
      dark: "1rem"
    }
  },
  close: {
    "bg-color": {
      light: "#e6e8e8",
      dark: colors.gray[90].name
    },
    size: {
      light: "2.75rem",
      dark: "2.75rem"
    },
    "text-color": {
      light: colors.gray[90].name,
      dark: colors.gray["05"].name
    }
  }
};

module.exports = alert;
