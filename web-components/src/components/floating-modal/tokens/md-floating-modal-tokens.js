/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const floatingModal = {
  prefix: "md",
  component: "floating-modal",
  main: {
    "bg-color": {
      light: colors.white[100].name,
      dark: colors.gray[90].name
    },
    "text-color": {
      light: colors.gray[80].name,
      dark: colors.gray[30].name
    },
    "border-color": {
      light: colors.gray[30].name,
      dark: colors.gray[70].name
    },
    radius: {
      light: "0.5rem",
      dark: "0.5rem"
    },
    "box-shadow": {
      light: "0 4px 8px rgba(0, 0, 0, 0.20), 0 0 1px rgba(0, 0, 0, 0.20)",
      dark: "0 4px 8px rgba(256, 256, 256, 0.20), 0 0 1px rgba(256, 256, 256, 0.20)"
    }
  }
};

module.exports = floatingModal;
