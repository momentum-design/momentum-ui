/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const tabs = {
  prefix: "mdv2",
  component: "tabs",
  default: {
    "bg-color": {
      light: "$mds-color-theme-button-secondary-normal",
      dark: "$mds-color-theme-button-secondary-normal"
    },
    "text-color": {
      light: "$mds-color-theme-text-secondary-normal",
      dark: "$mds-color-theme-text-secondary-normal"
    },
    "border-color": {
      light: "transparent",
      dark: "transparent"
    },
    "active-bottom-border": {
      light: "2px solid $mds-color-theme-outline-input-active",
      dark: "2px solid $mds-color-theme-outline-input-active"
    },
    "focus-bg": {
      light: colors.white[60].name,
      dark: colors.gray[90].name
    },
    "focus-border": {
      light: "$mds-color-theme-outline-theme-normal",
      dark: "$mds-color-theme-outline-theme-normal"
    },
    "focus-shadow": {
      light: "0 0 4px 0px $mds-color-theme-outline-theme-normal",
      dark: "0 0 4px 0px $mds-color-theme-outline-theme-normal"
    },
    "hover-border": {
      light: "transparent",
      dark: "transparent"
    },
    hover: {
      light: "$mds-color-theme-button-secondary-hover",
      dark: "$mds-color-theme-button-secondary-hover"
    },
    pressed: {
      light: "$mds-color-theme-button-secondary-pressed",
      dark: "$mds-color-theme-button-secondary-pressed"
    },
    disabled: {
      light: "$mds-color-theme-button-secondary-disabled",
      dark: "$mds-color-theme-button-secondary-disabled"
    },
    active: {
      light: "$mds-color-theme-text-primary-normal",
      dark: "$mds-color-theme-text-primary-normal"
    }
  }
};

module.exports = tabs;
