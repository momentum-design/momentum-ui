/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const task_item = {
  prefix: "mdv2",
  component: "taskitem",
  "text-color": {
    light: colors.gray[70].name,
    dark: colors.gray[40].name
  },
  "hover-bg-color": {
    light: colors.white[100].name,
    dark: colors.gray[90].name
  },
  "pressed-bg-color": {
    light: colors.white[100].name,
    dark: colors.gray[90].name
  },
  "focus-bg-color": {
    light: colors.white[100].name,
    dark: colors.gray[95].name
  },
  "focus-border-color": {
    light: colors.theme[60].name,
    dark: colors.theme[40].name
  },
  status: {
    "bg-color": {
      light: colors.gray[20].name,
      dark: colors.gray[80].name
    },
    "text-color": {
      light: colors.gray[100].name,
      dark: colors.gray[10].name
    },
    pause: {
      "bg-color": {
        light: colors.yellow[20].name,
        dark: colors.yellow[70].name
      }
    }
  },
  selected: {
    "text-color": {
      light: colors.gray[100].name,
      dark: colors.gray["05"].name
    }
  },
  chat: {
    "text-color": {
      light: colors.gray[70].name,
      dark: colors.gray[40].name
    },
    "quantity-bg-color": {
      light: colors.cobalt[30].name,
      dark: colors.cobalt[70].name
    },
    "quantity-text-color": {
      light: colors.cobalt[80].name,
      dark: colors.cobalt[20].name
    }
  },
  timer: {
    "text-color": {
      light: colors.green[70].name,
      dark: colors.green[50].name
    }
  }
};

module.exports = task_item;
