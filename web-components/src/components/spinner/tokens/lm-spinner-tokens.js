/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const spinner = {
  prefix: "lm",
  component: "spinner",
  "bg-color": {
    common: colors.gray[40].name
  },
  color: {
    common: colors.black[100].name
  }
};

module.exports = spinner;
