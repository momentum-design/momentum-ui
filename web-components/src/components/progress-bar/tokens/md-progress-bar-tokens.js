/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const progressbar = {
  prefix: "md",
  component: "progress-bar",
  track: {
    "bg-color": {
      light: colors.gray[20].name,
      dark: colors.gray[20].name
    }
  },
  indicator: {
    "in-progress": {
      light: colors.theme[50].name,
      dark: colors.theme[50].name
    }
  },
  label: {
    "text-color": {
      light: colors.black[100].name,
      dark: colors.white[100].name
    }
  }
};

module.exports = progressbar;
