/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const button = {
  prefix: "lm",
  component: "button",
  primary: {
    "bg-color": { light: colors.blue[60].name, dark: colors.blue[60].name },
    "text-color": { light: colors.gray["05"].name, dark: colors.gray["05"].name },
    hover: { "bg-color": { light: colors.blue[70].name, dark: colors.blue[70].name } },
    pressed: { "bg-color": { light: colors.blue[80].name, dark: colors.blue[80].name } },
    outline: {
      color: { light: colors.blue[70].name, dark: colors.blue[40].name },
      "text-color": { light: colors.blue[70].name, dark: colors.blue[40].name }
    }
  },
  secondary: {
    "bg-color": { light: colors.gray[20].name, dark: colors.gray[80].name },
    "text-color": { light: colors.gray[100].name, dark: colors.gray["05"].name },
    hover: { "bg-color": { light: colors.gray[30].name, dark: colors.gray[90].name } },
    pressed: { "bg-color": { light: colors.gray[40].name, dark: colors.gray[100].name } },
    outline: {
      color: { light: colors.gray[70].name, dark: colors.gray[40].name },
      "text-color": { light: colors.gray[70].name, dark: colors.gray[40].name }
    }
  },
  "secondary-negative": {
    "bg-color": { common: "$mds-color-theme-button-secondary-normal" },
    "border-color": { common: "$mds-color-theme-outline-cancel-normal" },
    "text-color": { common: "$mds-color-theme-text-error-normal" },
    hover: { "bg-color": { common: "$mds-color-theme-button-secondary-hover" } },
    pressed: { "bg-color": { common: "$mds-color-theme-button-secondary-pressed" } }
  },
  "secondary-positive": {
    "bg-color": { common: "$mds-color-theme-button-secondary-normal" },
    "border-color": { common: "$mds-color-theme-outline-join-normal" },
    "text-color": { common: "$mds-color-theme-text-success-normal" },
    hover: { "bg-color": { common: "$mds-color-theme-button-secondary-hover" } },
    pressed: { "bg-color": { common: "$mds-color-theme-button-secondary-pressed" } }
  },
  "secondary-accent": {
    "bg-color": { common: "$mds-color-theme-button-secondary-normal" },
    "border-color": { common: "$mds-color-theme-outline-theme-normal" },
    "text-color": { common: "$mds-color-theme-text-accent-normal" },
    hover: { "bg-color": { common: "$mds-color-theme-button-secondary-hover" } },
    pressed: { "bg-color": { common: "$mds-color-theme-button-secondary-pressed" } }
  },
  green: {
    "bg-color": { light: colors.green[60].name, dark: colors.green[60].name },
    hover: { "bg-color": { light: colors.green[70].name, dark: colors.green[70].name } },
    pressed: { "bg-color": { light: colors.green[80].name, dark: colors.green[80].name } },
    outline: {
      color: { light: colors.green[70].name, dark: colors.green[40].name },
      "text-color": { light: colors.green[70].name, dark: colors.green[40].name }
    }
  },
  white: {
    "bg-color": { light: colors.white.default.name, dark: colors.gray[90].name },
    "text-color": { light: colors.gray[70].name, dark: colors.gray[40].name },
    hover: { "bg-color": { light: colors.gray[10].name, dark: colors.gray[90].name } },
    pressed: { "bg-color": { light: colors.gray[20].name, dark: colors.gray[95].name } },
    outline: {
      color: { light: colors.gray[30].name, dark: colors.gray[40].name },
      "text-color": { light: colors.gray[70].name, dark: colors.gray[40].name }
    }
  },
  "inverted-white": {
    "bg-color": { light: colors.gray[80].name, dark: colors.white.default.name },
    "text-color": { light: colors.white.default.name, dark: colors.gray[100].name },
    hover: { "bg-color": { light: colors.gray[90].name, dark: colors.gray[10].name } },
    pressed: { "bg-color": { light: colors.gray[95].name, dark: colors.gray[20].name } },
    outline: {
      color: { light: colors.gray[40].name, dark: colors.gray[30].name },
      "text-color": { light: colors.gray[40].name, dark: colors.gray[70].name }
    }
  },
  gray: {
    "bg-color": { light: colors.gray[60].name, dark: colors.gray[80].name },
    hover: { "bg-color": { light: colors.gray[70].name, dark: colors.gray[70].name } },
    pressed: { "bg-color": { light: colors.gray[80].name, dark: colors.gray[60].name } }
  },
  red: {
    "bg-color": { light: colors.red[60].name, dark: colors.red[60].name },
    hover: { "bg-color": { light: colors.red[70].name, dark: colors.red[70].name } },
    pressed: { "bg-color": { light: colors.red[80].name, dark: colors.red[80].name } },
    outline: {
      color: { light: colors.red[70].name, dark: colors.red[40].name },
      "text-color": { light: colors.red[70].name, dark: colors.red[40].name }
    }
  },
  ghost: {
    "bg-color": { common: "$mds-color-theme-button-secondary-normal" },
    "text-color": { common: "$mds-color-theme-text-primary-normal" },
    disabled: {
      "bg-color": { common: "$mds-color-theme-button-secondary-disabled" },
      "text-color": { common: "$mds-color-theme-text-primary-disabled" }
    },
    hover: { "bg-color": { light: colors.gray[10].name, dark: colors.gray[90].name } },
    pressed: { "bg-color": { light: colors.gray[20].name, dark: colors.gray[95].name } }
  },
  "ghost-active": {
    "bg-color": { light: colors.gray[20].name, dark: colors.gray[80].name },
    "text-color": { light: colors.gray[100].name, dark: colors.gray["05"].name },
    disabled: {
      "bg-color": { light: colors.gray[20].name, dark: colors.gray[90].name },
      "text-color": { light: colors.gray[40].name, dark: colors.gray[70].name }
    },
    hover: { "bg-color": { light: colors.gray[20].name, dark: colors.gray[80].name } },
    pressed: { "bg-color": { light: colors.gray[20].name, dark: colors.gray[80].name } }
  },
  promotional: {
    "bg-color": { common: "$mds-color-theme-common-button-promotion-normal" },
    "text-color": { common: "$mds-color-theme-common-text-primary-normal" },
    hover: { "bg-color": { common: "$mds-color-theme-common-button-promotion-hover" } },
    pressed: { "bg-color": { common: "$mds-color-theme-common-button-promotion-active" } }
  },
  available: {
    "bg-color": { light: colors.green["05"].name, dark: colors.green[90].name },
    hover: { "bg-color": { light: colors.green[10].name, dark: colors.green[80].name } },
    pressed: { "bg-color": { light: colors.green[10].name, dark: colors.green[80].name } }
  },
  engaged: {
    "bg-color": { light: colors.yellow["05"].name, dark: colors.yellow[90].name },
    hover: { "bg-color": { light: colors.yellow[10].name, dark: colors.yellow[80].name } },
    pressed: { "bg-color": { light: colors.yellow[20].name, dark: colors.yellow[70].name } }
  },
  unavailable: {
    "bg-color": { light: colors.red["05"].name, dark: colors.red[90].name },
    hover: { "bg-color": { light: colors.red[10].name, dark: colors.red[80].name } },
    pressed: { "bg-color": { light: colors.red[10].name, dark: colors.red[80].name } }
  },
  idle: {
    "bg-color": { light: colors.gray["05"].name, dark: colors.gray[90].name },
    hover: { "bg-color": { light: colors.gray[10].name, dark: colors.gray[80].name } },
    pressed: { "bg-color": { light: colors.gray[10].name, dark: colors.gray[80].name } }
  },
  disabled: {
    "bg-color": { light: colors.gray[20].name, dark: colors.gray[90].name },
    "text-color": { light: colors.gray[40].name, dark: colors.gray[70].name }
  },
  favorite: {
    "icon-color": { common: colors.yellow[50].name },
    hover: {
      "bg-color": { light: colors.gray[10].name, dark: colors.gray[90].name },
      "icon-color": { common: colors.yellow[50].name }
    },
    pressed: {
      "bg-color": { light: colors.gray[20].name, dark: colors.gray[80].name },
      "icon-color": { common: colors.yellow[50].name }
    }
  },
  "focus-ring": { color: { light: colors.blue[60].name, dark: colors.blue[40].name } },
  "inverted-primary": {
    "bg-color": { common: "$mds-color-theme-inverted-button-primary-normal" },
    "text-color": { common: "$mds-color-theme-text-primary-normal" },
    hover: { "bg-color": { common: "$mds-color-theme-inverted-button-primary-hover" } },
    pressed: { "bg-color": { common: "$mds-color-theme-inverted-button-primary-pressed" } },
    disabled: {
      "bg-color": { common: "$mds-color-theme-inverted-button-primary-disabled" },
      "text-color": { common: "$mds-color-theme-inverted-text-primary-disabled" }
    }
  },
  "inverted-secondary": {
    "bg-color": { common: "$mds-color-theme-inverted-button-secondary-normal" },
    "text-color": { common: "$mds-color-theme-inverted-text-primary-normal" },
    "border-color": { common: "$mds-color-theme-inverted-outline-button-normal" },
    disabled: {
      "bg-color": { common: "$mds-color-theme-inverted-button-secondary-disabled" },
      "text-color": { common: "$mds-color-theme-inverted-text-primary-disabled" },
      "border-color": { common: "$mds-color-theme-inverted-outline-disabled-normal" }
    }
  },
  dropdown: {
    "bg-color": { light: colors.white[100].name, dark: colors.gray[100].name },
    "text-color": {
      light: colors.gray[100].name,
      dark: colors.gray["05"].name,
      placeholder: { light: colors.gray[70].name, dark: colors.gray[40].name }
    },
    "border-color": { light: colors.gray[30].name, dark: colors.gray[80].name },
    hover: { light: colors.gray[20].name, dark: colors.gray[90].name },
    active: { light: colors.gray[30].name, dark: colors.gray[70].name },
    disabled: {
      "bg-color": { light: colors.gray[10].name, dark: colors.gray[90].name },
      "border-color": { light: colors.gray[10].name, dark: colors.gray[90].name },
      "text-color": { light: colors.gray[70].name, dark: colors.gray[40].name }
    }
  }
};

module.exports = button;
