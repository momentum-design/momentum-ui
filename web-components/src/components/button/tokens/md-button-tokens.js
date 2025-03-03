/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const button = {
  prefix: "md",
  component: "button",
  primary: {
    "bg-color": { light: colors.blue[60].name, dark: colors.blue[60].name },
    hover: { "bg-color": { light: colors.blue[70].name, dark: colors.blue[70].name } },
    pressed: { "bg-color": { light: colors.blue[80].name, dark: colors.blue[80].name } },
    "text-color": { light: colors.gray["05"].name, dark: colors.gray["05"].name },
    outline: {
      color: { light: colors.blue[70].name, dark: colors.blue[40].name },
      "text-color": { light: colors.blue[70].name, dark: colors.blue[40].name }
    }
  },
  secondary: {
    "bg-color": { light: colors.gray[20].name, dark: colors.gray[60].name },
    hover: { "bg-color": { light: colors.gray[30].name, dark: colors.gray[70].name } },
    pressed: { "bg-color": { light: colors.gray[40].name, dark: colors.gray[80].name } },
    "text-color": { light: colors.gray[100].name, dark: colors.gray["05"].name },
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
  tertiary: {
    "bg-color": { light: colors.gray[80].name, dark: colors.gray[20].name },
    hover: { "bg-color": { light: colors.gray[90].name, dark: colors.gray[30].name } },
    pressed: { "bg-color": { light: colors.gray["95"].name, dark: colors.gray[40].name } },
    "text-color": { light: colors.gray["05"].name, dark: colors.gray[100].name },
    outline: {
      color: { light: colors.gray[40].name, dark: colors.gray[70].name },
      "text-color": { light: colors.gray[40].name, dark: colors.gray[70].name }
    }
  },
  join: {
    "bg-color": { light: colors.green[60].name, dark: colors.green[60].name },
    hover: { "bg-color": { light: colors.green[70].name, dark: colors.green[70].name } },
    pressed: { "bg-color": { light: colors.green[80].name, dark: colors.green[80].name } },
    "text-color": { light: colors.gray["05"].name, dark: colors.gray["05"].name },
    outline: {
      color: { light: colors.green[70].name, dark: colors.green[40].name },
      "text-color": { light: colors.green[70].name, dark: colors.green[40].name }
    }
  },
  cancel: {
    "bg-color": { light: colors.red[60].name, dark: colors.red[60].name },
    hover: { "bg-color": { light: colors.red[70].name, dark: colors.red[70].name } },
    pressed: { "bg-color": { light: colors.red[80].name, dark: colors.red[80].name } },
    "text-color": { light: colors.gray["05"].name, dark: colors.gray["05"].name },
    outline: {
      color: { light: colors.red[70].name, dark: colors.red[40].name },
      "text-color": { light: colors.red[70].name, dark: colors.red[40].name }
    }
  },
  red: {
    "bg-color": { common: "$mds-color-theme-button-cancel-normal" },
    "text-color": { common: "$mds-color-theme-common-text-primary-normal" },
    hover: { "bg-color": { common: "$mds-color-theme-button-cancel-hover" } },
    pressed: { "bg-color": { common: "$mds-color-theme-button-cancel-pressed" } },
    outline: {
      color: { common: "$mds-color-theme-outline-cancel-normal" },
      "text-color": { common: "$mds-color-theme-text-error-normal" }
    }
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
  ghost: {
    "bg-color": { common: "$mds-color-theme-button-secondary-normal" },
    "text-color": { common: "$mds-color-theme-text-primary-normal" },
    disabled: {
      "bg-color": { common: "$mds-color-theme-button-secondary-disabled" },
      "text-color": { common: "$mds-color-theme-text-primary-disabled" }
    },
    hover: { "bg-color": { common: "$mds-color-theme-button-secondary-hover" } },
    pressed: { "bg-color": { common: "$mds-color-theme-button-secondary-pressed" } }
  },
  "focus-ring": { color: { light: colors.blue[60].name, dark: colors.blue[40].name } },
  disabled: {
    "bg-color": { light: colors.gray[20].name, dark: colors.gray[90].name },
    "text-color": { light: colors.gray[40].name, dark: colors.gray[70].name }
  },
  files: {
    normal: {
      "bg-color": { light: "none", dark: "none" },
      "text-color": { light: colors.gray[100].name, dark: colors.gray["05"].name }
    },
    hover: {
      "bg-color": { light: colors.yellow[70].name, dark: colors.gray[80].name },
      "text-color": { light: colors.white[100].name, dark: colors.gray["05"].name }
    },
    pressed: {
      "bg-color": { light: colors.yellow[80].name, dark: colors.yellow[50].name },
      "text-color": { light: colors.gray["05"].name, dark: colors.gray["05"].name }
    }
  },
  whiteboards: {
    normal: {
      "bg-color": { light: "none", dark: "none" },
      "text-color": { light: colors.gray[100].name, dark: colors.gray["05"].name }
    },
    hover: {
      "bg-color": { light: colors.purple[70].name, dark: colors.gray[80].name },
      "text-color": { light: colors.white[100].name, dark: colors.gray["05"].name }
    },
    pressed: {
      "bg-color": { light: colors.purple[80].name, dark: colors.purple[50].name },
      "text-color": { light: colors.gray["05"].name, dark: colors.gray["05"].name }
    }
  }
};

module.exports = button;
