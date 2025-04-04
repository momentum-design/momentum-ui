/* eslint-disable no-undef */

const menu = {
  prefix: "mdv2",
  component: "menu",
  "text-color": {
    common: "$mds-color-theme-text-primary-normal"
  },
  default: {
    common: "$mds-color-theme-button-secondary-normal"
  },
  hover: {
    bg: {
      common: "$mds-color-theme-button-secondary-hover"
    }
  },
  pressed: {
    bg: {
      common: "$mds-color-theme-button-secondary-pressed"
    }
  },
  selected: {
    default: {
      bg: {
        common: "$mds-color-theme-button-secondary-active-normal"
      }
    },
    hover: {
      bg: {
        common: "$mds-color-theme-button-secondary-active-hover"
      }
    },
    pressed: {
      bg: {
        common: "$mds-color-theme-button-secondary-active-pressed"
      }
    }
  }
};

module.exports = menu;
