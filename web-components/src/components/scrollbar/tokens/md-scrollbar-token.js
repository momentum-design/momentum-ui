/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const slider = {
  prefix: "md",
  component: "scrollbar",
  background: {
    track: {
      light: colors.gray[10].name,
      dark: colors.gray[30].name
    },
    indicator: {
      light: colors.gray[30].name,
      dark: colors.gray[10].name
    },
    hover: {
      indicator: {
        light: colors.gray[40].name,
        dark: colors.gray[20].name
      }
    },
    active: {
      indicator: {
        light: colors.gray[50].name,
        dark: colors.gray[10].name
      }
    },
    disabled: {
      indicator: {
        light: colors.gray[20].name,
        dark: colors.gray[40].name
      }
    }
  }
};

module.exports = slider;
