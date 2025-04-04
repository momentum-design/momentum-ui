/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */

const colors = require("@momentum-ui/tokens/dist/colors.json");

const breadcrumb = {
  prefix: "lm",
  component: "breadcrumb",
  color: {
    light: colors.blue[50].name,
    dark: colors.blue[40].name,
    current: {
      light: colors.gray[90].name,
      dark: colors.gray[50].name
    },
    slash: {
      light: colors.gray[50].name,
      dark: colors.gray[40].name
    }
  }
};

module.exports = breadcrumb;
