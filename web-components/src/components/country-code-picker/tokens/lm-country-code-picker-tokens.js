/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const countryCodePicker = {
  prefix: "lm",
  component: "country-code-picker",
  default: {
    "bg-color": {
      light: colors.gray[10].name,
      dark: colors.gray[100].name
    },
    "border-color": {
      light: colors.gray[30].name,
      dark: colors.gray[80].name
    }
  },
  disabled: {
    "bg-color": {
      light: colors.gray[10].name,
      dark: colors.gray[100].name
    }
  }
};

module.exports = countryCodePicker;
