/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const floatingModal = {
  prefix: "lm",
  component: "floating-modal",
  main: {
    "bg-color": {
      light: colors.white[100].name,
      dark: colors.gray[90].name
    },
    "text-color": {
      light: colors.gray[100].name,
      dark: colors.gray["05"].name
    },
    "border-color": {
      light: colors.gray[20].name,
      dark: colors.gray[80].name
    },
    radius: {
      light: "0.5rem",
      dark: "0.5rem"
    },
    "box-shadow": {
      light: "0 4px 8px rgba(0, 0, 0, 0.16), 0 0 1px rgba(0, 0, 0, 0.16)",
      dark: "0 4px 8px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0, 0, 0, 0.20)"
    },
    "bg-color-alternate": {
      light: colors.gray[70].name,
      dark: colors.gray[30].name
    },
    "text-color-alternate": {
      light: colors.gray["05"].name,
      dark: colors.gray[100].name
    }
  },
  outer: {
    "border-color": {
      light: colors.gray[10].name,
      dark: colors.gray[90].name
    }
  }
};

module.exports = floatingModal;
