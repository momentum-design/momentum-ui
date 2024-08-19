/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const slider = {
  prefix: "lm",
  component: "slider",
  background: {
    selection: {
      light: colors.blue[50].name,
      red: {
        light: colors.red[50].name
      },
      green: {
        light: colors.green[50].name
      },
      blue: {
        light: colors.blue[50].name
      }
    },
    pointer: {
      light: colors.white[100].name
    },
    bar: {
      light: colors.gray[10].name,
      dark: colors.gray[40].name
    },

    hover: {
      pointer: {
        light: colors.blue[10].name
      }
    },

    disabled: {
      selection: {
        light: colors.gray[30].name,
        dark: colors.white[100].name
      },
      pointer: {
        light: colors.gray[10].name,
        dark: colors.gray[40].name
      }
    },
    focus: {
      pointer: {
        light: colors.gray[40].name,
        dark: colors.gray[40].name
      }
    },
    label: {
      light: colors.gray[70].name
    }
  }
};

module.exports = slider;
