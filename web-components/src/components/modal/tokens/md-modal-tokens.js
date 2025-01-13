/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const modal = {
  prefix: "md",
  component: "modal",
  main: {
    "bg-color": {
      light: colors.white[100].name,
      dark: colors.gray[90].name
    },
    "text-color": {
      light: colors.gray[80].name,
      dark: colors.gray[30].name
    },
    radius: {
      light: "0.25rem",
      dark: "0.25rem"
    },
    padding: {
      light: "1rem 0.5rem",
      dark: "1rem 0.5rem"
    },
    "border-color": {
      light: colors.gray["05"].name,
      dark: colors.gray[80].name
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
      dark: colors.gray[10].name
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
