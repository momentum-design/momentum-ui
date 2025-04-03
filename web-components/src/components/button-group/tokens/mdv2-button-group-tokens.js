/* eslint-disable no-undef */

const buttonGroup = {
  prefix: "mdv2",
  component: "button-group",
  indent: { light: "0.0625rem", dark: "0.0625rem" },
  border: {
    radius: { light: "1.875rem", dark: "1.875rem" }
  },
  color: {
    common: "$mds-color-theme-text-secondary-normal",
    active: {
      common: "$mds-color-theme-text-primary-normal"
    },
    hover: {
      common: "$mds-color-theme-button-secondary-active-normal"
    }
  },
  "bg-color": {
    common: "$mds-color-theme-button-secondary-normal",
    hover: {
      common: "$mds-color-theme-button-secondary-normal"
    },
    pressed: {
      common: "$mds-color-theme-button-secondary-normal"
    },
    focus: {
      common: "$mds-color-theme-button-secondary-active-normal"
    },
    active: {
      common: "$mds-color-theme-button-secondary-active-normal"
    }
  },
  "outline-border": {
    common: "$mds-color-theme-outline-input-normal"
  }
};

module.exports = buttonGroup;
