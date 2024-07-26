/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const grabber = {
  prefix: "mdv2",
  component: "grabber",
  "bg-color": {
    common: "$mds-color-theme-overlay-button-secondary-normal"
  },
  "text-color": {
    common: "$mds-color-theme-text-primary-normal"
  },
  "border-color": {
    light: "$mds-color-theme-common-outline-secondary-normal",
    dark: "$mds-color-theme-outline-button-normal"
  },
  hover: {
    "bg-color": {
      common: "$mds-color-theme-overlay-button-secondary-hover"
    }
  },
  pressed: {
    "bg-color": {
      common: "$mds-color-theme-overlay-button-secondary-pressed"
    }
  },
  width: {
    common: "20px"
  },
  "border-radius": {
    common: "8px"
  },
  "border-width": {
    common: "1px"
  }
};

module.exports = grabber;
