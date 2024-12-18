/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const datepicker = {
  prefix: "md",
  component: "datepicker",
  default: {
    hover: {
      "bg-color": {
        light: colors.gray[20].name,
        dark: colors.gray[90].name
      }
    }
  },
  selected: {
    today: {
      "text-color": {
        light: colors.white[100].name,
        dark: colors.gray["05"].name
      }
    }
  }
};

module.exports = datepicker;
