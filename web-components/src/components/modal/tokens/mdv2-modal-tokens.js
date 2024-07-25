/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const modal = {
  prefix: "mdv2",
  component: "modal",
  main: {
    "bg-color": {
      common: "$mds-color-theme-background-solid-primary-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-secondary-normal"
    },
    "border-color": {
      common: "$mds-color-theme-outline-secondary-normal"
    },
    radius: {
      common: "0.5rem"
    },
    padding: {
      common: "1.5rem 1rem"
    }
  },
  title: {
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    }
  },
  backdrop: {
    "bg-color": {
      common: "$mds-color-theme-common-overlays-secondary-normal"
    }
  }
};

module.exports = modal;
