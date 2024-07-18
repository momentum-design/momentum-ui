/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const tooltip = {
  prefix: "mdv2",
  component: "tooltip",
  "font-color": {
    light: "$mds-color-theme-text-primary-normal",
    dark: "$mds-color-theme-text-primary-normal"
  },
  "bg-color": {
    light: "$mds-color-theme-background-solid-primary-normal",
    dark: "$mds-color-theme-background-solid-primary-normal"
  },
  border: {
    light: "$mds-color-theme-outline-secondary-normal",
    dark: "$mds-color-theme-outline-secondary-normal"
  },
  radius: {
    light: "8px",
    dark: "8px"
  },
  shadow: {
    light: "none",
    dark: "none"
  },
  arrow: {
    bottom: {
      top: {
        light: "-9px",
        dark: "-9px"
      },
      "before-top": {
        light: "2px",
        dark: "2px"
      }
    },
    right: {
      left: {
        light: "-17px",
        dark: "-17px"
      },
      "before-top": {
        light: "2px",
        dark: "2px"
      }
    }
  }
};

module.exports = tooltip;
