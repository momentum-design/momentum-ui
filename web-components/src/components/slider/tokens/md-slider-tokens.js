/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const slider = {
  prefix: "md",
  component: "slider",
  background: {
    selection: {
      light: colors.blue[50].name,
      dark: colors.blue[50].name
    },
    pointer: {
      light: colors.white[100].name
    },
    bar: {
      light: colors.gray[30].name,
      dark: colors.gray[60].name
    },

    hover: {
      pointer: {
        light: colors.blue[10].name,
        dark: colors.blue[10].name
      }
    },

    disabled: {
      selection: {
        light: colors.gray[50].name,
        dark: colors.gray[50].name
      },
      pointer: {
        light: colors.gray[30].name,
        dark: colors.gray[60].name
      }
    },
    focus: {
      pointer: {
        light: colors.blue[20].name,
        dark: colors.gray[20].name
      },
      selection: {
        light: colors.blue[60].name,
        dark: colors.blue[20].name
      }
    }
  },
  focus: {
    shadow: {
      light: colors.blue[50].name,
      dark: colors.blue[50].name
    }
  },
  label: {
    light: colors.gray[70].name,
    dark: colors.gray[40].name
  }
};

module.exports = slider;
