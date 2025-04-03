/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const datepicker = {
  prefix: "lm",
  component: "datepicker",
  default: {
    hover: {
      "bg-color": {
        light: colors.gray[20].name,
        dark: colors.gray[70].name
      }
    }
  },
  selected: {
    today: {
      "text-color": {
        light: colors.white[100].name,
        dark: colors.gray["05"].name
      }
    },
    "text-color": {
      light: colors.gray["05"].name,
      dark: colors.gray[100].name
    },
    "bg-color": {
      light: colors.gray[100].name,
      dark: colors.gray["05"].name
    },
    hover: {
      "bg-color": {
        light: colors.gray[95].name,
        dark: colors.gray[10].name
      }
    },
    pressed: {
      "bg-color": {
        light: colors.gray[90].name,
        dark: colors.gray[10].name
      }
    }
  },
  range: {
    "text-color": {
      light: colors.gray[100].name,
      dark: colors.gray["05"].name
    },
    "bg-color": {
      light: colors.gray[20].name,
      dark: colors.gray[60].name
    },
    hover: {
      "bg-color": {
        light: colors.gray[30].name,
        dark: colors.gray[70].name
      }
    },
    edge: {
      "bg-color": {
        light: colors.gray[100].name,
        dark: colors.gray["05"].name
      }
    }
  }
};

module.exports = datepicker;
