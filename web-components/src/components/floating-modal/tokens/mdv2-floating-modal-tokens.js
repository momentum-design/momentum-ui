/* eslint-disable no-undef */

const floatingModal = {
  prefix: "mdv2",
  component: "floating-modal",
  main: {
    "bg-color": {
      common: "$mds-color-theme-background-solid-primary-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    },
    "border-color": {
      common: "$mds-color-theme-outline-secondary-normal"
    },
    radius: {
      common: "0.5rem"
    },
    "box-shadow": {
      light: "0 4px 8px rgba(0, 0, 0, 0.16), 0 0 1px rgba(0, 0, 0, 0.16)",
      dark: "0 4px 8px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0, 0, 0, 0.20)"
    },
    "bg-color-alternate": {
      common: "$mds-color-theme-background-solid-secondary-normal"
    },
    "text-color-alternate": {
      common: "$mds-color-theme-text-primary-normal"
    }
  },
  outer: {
    "border-color": {
      common: "$mds-color-theme-outline-secondary-normal"
    }
  }
};

module.exports = floatingModal;
