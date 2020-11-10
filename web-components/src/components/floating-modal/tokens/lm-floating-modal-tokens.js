/* eslint-disable @typescript-eslint/no-var-requires */
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
      light: colors.gray[70].name,
      dark: colors.gray[40].name
    },
    "border-color": {
      light: colors.gray[20].name,
      dark: colors.gray[80].name
    },
    radius: {
      light: "0.25rem",
      dark: "0.25rem"
    },
    "box-shadow": {
      light: "0 4px 8px rgba(0, 0, 0, 0.16), 0 0 1px rgba(0, 0, 0, 0.16)",
      dark: "0 4px 8px rgba(256, 256, 256, 0.16), 0 0 1px rgba(256, 256, 256, 0.16)"
    }
  }
};

module.exports = floatingModal;
