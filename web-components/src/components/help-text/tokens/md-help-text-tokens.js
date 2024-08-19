/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const helpText = {
  prefix: "md",
  component: "help-text",
  default: {
    color: {
      light: colors.gray[70].name,
      dark: colors.gray[30].name
    }
  }
};

module.exports = helpText;
