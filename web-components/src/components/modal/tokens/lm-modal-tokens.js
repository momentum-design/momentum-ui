/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const modal = {
  prefix: "lm",
  component: "modal",
  main: {
    "bg-color": {
      light: colors.white[100].name,
      dark: colors.gray[90].name
    },
    "text-color": {
      light: colors.gray[70].name,
      dark: colors.gray[40].name
    },
    "border-color": {
      light: colors.gray[20].name,
      dark: colors.gray[80].name
    },
    radius: {
      light: "0.5rem",
      dark: "0.5rem"
    },
    padding: {
      light: "1.5rem 1rem",
      dark: "1.5rem 1rem"
    }
  },
  section: {
    "h-padding": {
      common: "0.5rem"
    }
  },
  title: {
    "text-color": {
      light: colors.black[100].name,
      dark: colors.gray["05"].name
    }
  },
  backdrop: {
    "bg-color": {
      light: colors.black[100].name,
      dark: colors.black[100].name
    }
  }
};

module.exports = modal;
