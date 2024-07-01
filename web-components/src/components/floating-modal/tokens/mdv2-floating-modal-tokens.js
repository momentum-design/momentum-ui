/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const floatingModal = {
  prefix: "mdv2",
  component: "floating-modal",
  main: {
    "bg-color": {
      light: "$mds-color-theme-background-solid-primary-normal",
      dark: "$mds-color-theme-background-solid-primary-normal"
    },
    "text-color": {
      light: "$mds-color-theme-text-primary-normal",
      dark: "$mds-color-theme-text-primary-normal"
    },
    "border-color": {
      light: "$mds-color-theme-outline-secondary-normal",
      dark: "$mds-color-theme-outline-secondary-normal"
    },
    radius: {
      light: "0.5rem",
      dark: "0.5rem"
    },
    "box-shadow": {
      light: "0 4px 8px rgba(0, 0, 0, 0.16), 0 0 1px rgba(0, 0, 0, 0.16)",
      dark: "0 4px 8px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0, 0, 0, 0.20)"
    },
    "bg-color-alternate": {
      light: "$mds-color-theme-background-solid-secondary-normal",
      dark: "$mds-color-theme-background-solid-secondary-normal"
    },
    "text-color-alternate": {
      light: "$mds-color-theme-text-primary-normal",
      dark: "$mds-color-theme-text-primary-normal"
    }
  },
  outer: {
    "border-color": {
      light: "$mds-color-theme-outline-secondary-normal",
      dark: "$mds-color-theme-outline-secondary-normal"
    }
  }
};

module.exports = floatingModal;
