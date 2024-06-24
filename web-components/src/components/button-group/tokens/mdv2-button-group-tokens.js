/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const buttonGroup = {
  prefix: "mdv2",
  component: "button-group",
  indent: { light: "0.0625rem", dark: "0.0625rem" },
  border: {
    radius: { light: "1.875rem", dark: "1.875rem" }
  },
  color: {
    light: "$mds-color-theme-text-secondary-normal",
    dark: "$mds-color-theme-text-secondary-normal",
    active: {
      light: "$mds-color-theme-text-primary-normal",
      dark: "$mds-color-theme-text-primary-normal"
    },
    hover: {
      light: "$mds-color-theme-button-secondary-active-normal",
      dark: "$mds-color-theme-button-secondary-active-normal"
    }
  },
  "bg-color": {
    light: "$mds-color-theme-button-secondary-normal",
    dark: "$mds-color-theme-button-secondary-normal",
    hover: {
      light: "$mds-color-theme-button-secondary-normal",
      dark: "$mds-color-theme-button-secondary-normal"
    },
    pressed: {
      light: "$mds-color-theme-button-secondary-normal",
      dark: "$mds-color-theme-button-secondary-normal"
    },
    focus: {
      light: "$mds-color-theme-button-secondary-active-normal",
      dark: "$mds-color-theme-button-secondary-active-normal"
    },
    active: {
      light: "$mds-color-theme-button-secondary-active-normal",
      dark: "$mds-color-theme-button-secondary-active-normal"
    }
  },
  "outline-border": {
    light: "$mds-color-theme-outline-input-normal",
    dark: "$mds-color-theme-outline-input-normal"
  }
};

module.exports = buttonGroup;
