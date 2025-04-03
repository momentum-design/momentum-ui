/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const tabs = {
  prefix: "mdv2",
  component: "tabs",
  default: {
    "bg-color": {
      common: "$mds-color-theme-button-secondary-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-secondary-normal"
    },
    "border-color": {
      common: "transparent"
    },
    "active-border": {
      common: "$mds-color-theme-outline-input-active"
    },
    "active-vertical-border": {
      common: "inset 2px 0 0 0 $mds-color-theme-outline-input-active"
    },
    "focus-bg": {
      light: colors.white[60].name,
      dark: colors.gray[90].name
    },
    "focus-border": {
      common: "$mds-color-theme-outline-theme-normal"
    },
    "focus-shadow": {
      common: "0 0 4px 0px $mds-color-theme-outline-theme-normal"
    },
    "hover-border": {
      common: "transparent"
    },
    hover: {
      common: "$mds-color-theme-button-secondary-hover"
    },
    pressed: {
      common: "$mds-color-theme-button-secondary-pressed"
    },
    disabled: {
      common: "$mds-color-theme-text-primary-disabled"
    },
    active: {
      common: "$mds-color-theme-text-primary-normal"
    }
  },
  primary: {
    "bg-color": {
      common: "$mds-color-theme-button-primary-normal"
    },
    "text-color": {
      common: "$mds-color-theme-inverted-text-primary-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-button-primary-hover"
      }
    },
    pressed: {
      "bg-color": {
        common: "$mds-color-theme-button-primary-pressed"
      }
    }
  }
};

module.exports = tabs;
