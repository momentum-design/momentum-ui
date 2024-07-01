/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const modal = {
  prefix: "mdv2",
  component: "modal",
  main: {
    "bg-color": {
      light: "$mds-color-theme-background-solid-primary-normal",
      dark: "$mds-color-theme-background-solid-primary-normal"
    },
    "text-color": {
      light: "$mds-color-theme-text-secondary-normal",
      dark: "$mds-color-theme-text-secondary-normal"
    },
    "border-color": {
      light: "$mds-color-theme-outline-secondary-normal",
      dark: "$mds-color-theme-outline-secondary-normal"
    },
    radius: {
      light: "0.5rem",
      dark: "0.5rem"
    },
    padding: {
      light: "1.5rem 1rem",
      dark: "1.5rem 1rem"
    }
  },
  title: {
    "text-color": {
      light: "$mds-color-theme-text-primary-normal",
      dark: "$mds-color-theme-text-primary-normal"
    }
  },
  backdrop: {
    "bg-color": {
      light: "$mds-color-theme-common-overlays-secondary-normal",
      dark: "$mds-color-theme-common-overlays-secondary-normal"
    }
  }
};

module.exports = modal;
