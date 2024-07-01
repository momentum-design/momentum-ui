/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const menu = {
  prefix: "mdv2",
  component: "menu",
  "text-color": {
    light: "$mds-color-theme-text-primary-normal",
    dark: "$mds-color-theme-text-primary-normal"
  },
  default: {
    light: "$mds-color-theme-button-secondary-normal",
    dark: "$mds-color-theme-button-secondary-normal"
  },
  hover: {
    bg: {
      light: "$mds-color-theme-button-secondary-hover",
      dark: "$mds-color-theme-button-secondary-hover"
    }
  },
  pressed: {
    bg: {
      light: "$mds-color-theme-button-secondary-pressed",
      dark: "$mds-color-theme-button-secondary-pressed"
    }
  },
  selected: {
    default: {
      bg: {
        light: "$mds-color-theme-button-secondary-active-normal",
        dark: "$mds-color-theme-button-secondary-active-normal"
      }
    },
    hover: {
      bg: {
        light: "$mds-color-theme-button-secondary-active-hover",
        dark: "$mds-color-theme-button-secondary-active-hover"
      }
    },
    pressed: {
      bg: {
        light: "$mds-color-theme-button-secondary-active-pressed",
        dark: "$mds-color-theme-button-secondary-active-pressed"
      }
    }
  }
};

module.exports = menu;
