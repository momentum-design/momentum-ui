/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const tableAdvanced = {
  prefix: "lm",
  component: "table-advanced",
  header: {
    "bg-color": {
      light: colors.gray["05"].name,
      dark: colors.gray[95].name
    }
  },
  filter: {
    "bg-color": {
      light: colors.white[100].name,
      dark: colors.gray[100].name
    },
    "border-color": {
      light: colors.gray[30].name,
      dark: colors.gray[80].name
    },
    hover: {
      "bg-color": {
        light: colors.gray[10].name,
        dark: colors.gray[90].name
      }
    },
    pressed: {
      "bg-color": {
        light: colors.gray[20].name,
        dark: colors.gray[80].name
      }
    }
  },
  hover: {
    "bg-color": {
      light: colors.gray["05"].name,
      dark: colors.gray[95].name
    }
  },
  selected: {
    "bg-color": {
      light: colors.gray[10].name,
      dark: colors.gray[90].name
    }
  },
  "border-color": {
    light: colors.gray[20].name,
    dark: colors.gray[80].name
  },
  "text-color": {
    light: colors.gray[70].name,
    dark: colors.gray[40].name
  },
  stripped: {
    "bg-color": {
      light: colors.gray[10].name,
      dark: colors.gray[80].name
    }
  }
};

module.exports = tableAdvanced;
