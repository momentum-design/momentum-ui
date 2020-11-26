/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const phoneinput = {
  prefix: "md",
  component: "phone-input",
  default: {
    "border-color": {
      light: colors.gray[30].name,
      dark: colors.gray[80].name
    }
  }
};

module.exports = phoneinput;
