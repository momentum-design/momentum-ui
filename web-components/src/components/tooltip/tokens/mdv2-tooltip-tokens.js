/* eslint-disable no-undef */

const tooltip = {
  prefix: "mdv2",
  component: "tooltip",
  "font-color": {
    common: "$mds-color-theme-text-primary-normal"
  },
  "bg-color": {
    common: "$mds-color-theme-background-solid-primary-normal"
  },
  border: {
    common: "$mds-color-theme-outline-secondary-normal"
  },
  radius: {
    common: "8px"
  },
  shadow: {
    common: "none"
  },
  arrow: {
    bottom: {
      top: {
        common: "-8px"
      },
      "before-top": {
        common: "2px"
      }
    },
    right: {
      left: {
        common: "-9px"
      },
      "before-top": {
        common: "2px"
      }
    }
  }
};

module.exports = tooltip;
