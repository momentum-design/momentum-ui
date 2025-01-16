/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const table = {
  prefix: "md",
  component: "table",
  header: {
    "bg-color": {
      light: colors.gray[10].name,
      dark: colors.gray[80].name
    }
  },
  hover: {
    "bg-color": {
      light: colors.blue[20].name,
      dark: colors.blue[90].name
    }
  },
  pressed: {
    "bg-color": {
      light: colors.gray[20].name,
      dark: colors.gray[90].name
    }
  },
  "border-color": {
    light: colors.gray[10].name,
    dark: colors.gray[80].name
  },
  "text-color": {
    light: colors.gray[80].name,
    dark: colors.gray[40].name
  },
  stripped: {
    "bg-color": {
      light: colors.gray[20].name,
      dark: colors.gray[70].name
    }
  },
  "main-border": {
    common: "1px solid var(--table-border-color)"
  },
  "column-border": {
    common: "1px solid var(--table-border-color)"
  },
  "row-border": {
    common: "1px solid var(--table-border-color)"
  },
  "header-row-border": {
    common: "1px solid var(--table-border-color)"
  }
};

module.exports = table;
