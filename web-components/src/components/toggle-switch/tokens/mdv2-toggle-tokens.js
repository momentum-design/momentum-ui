/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const toggleSwitch = {
  prefix: "mdv2",
  component: "toggle-switch",
  "bg-color": {
    light: "$mds-color-theme-button-secondary-normal",
    dark: "$mds-color-theme-button-secondary-normal"
  },
  "border-color": {
    light: "$mds-color-theme-outline-input-normal",
    dark: "$mds-color-theme-outline-input-normal",    
  },
  "bg-color--hover": {
    light: "$mds-color-theme-button-secondary-hover",
    dark: "$mds-color-theme-button-secondary-hover"
  },
  "bg-color--checked": {
    light: "$mds-color-theme-control-active-normal",
    dark: "$mds-color-theme-control-active-normal"
  },
  "bg-color--checked-hover": {
    light: "$mds-color-theme-control-active-hover",
    dark: "$mds-color-theme-control-active-hover"
  },
  "bg-color--disabled": {
    light: "$mds-color-theme-button-secondary-disabled",
    dark: "$mds-color-theme-button-secondary-disabled"
  },
  "bg-color--disabled--checked": {
    light: "$mds-color-theme-button-secondary-pressed",
    dark: "$mds-color-theme-button-secondary-pressed"
  },
  slider: {
    color: {
      light: "$mds-color-theme-text-primary-normal",
      dark: "$mds-color-theme-text-primary-normal"
    },
    "color--checked": {
      light: "$mds-color-theme-inverted-text-primary-normal",
      dark: "$mds-color-theme-inverted-text-primary-normal"
    },
    "color-disabled": {
      light: "$mds-color-theme-text-primary-disabled",
      dark: "$mds-color-theme-text-primary-disabled",
    },
    "color-disabled--checked": {
      light: "$mds-color-theme-inverted-text-primary-disabled",
      dark: "$mds-color-theme-inverted-text-primary-disabled"
    }
  },
  focus: {
    light: "$mds-color-theme-outline-theme-normal",
    dark: "$mds-color-theme-outline-theme-normal"
  }
};

module.exports = toggleSwitch;
