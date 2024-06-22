/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const pagination = {
  prefix: "mdv2",
  component: "pagination",
  color: {
    light: "$mds-color-theme-text-secondary-normal",
    dark: "$mds-color-theme-text-secondary-normal",
    current: {
      light: "$mds-color-theme-common-text-white",
      dark: "$mds-color-theme-common-text-white"
    }
  },
  "bg-current": {
    light: "$mds-color-theme-control-active-normal",
    dark: "$mds-color-theme-control-active-normal"
  },

  "bg-hover": {
    light: "$mds-color-theme-control-inactive-normal",
    dark: "$mds-color-theme-inverted-control-inactive-normal" //todo
  },
  nav: {
    color: {
      light: "$mds-color-theme-text-primary-normal",
      dark: "$mds-color-theme-text-primary-normal"
    },
    hover: {
      light: "$mds-color-theme-text-primary-normal",
      dark: "$mds-color-theme-text-primary-normal"
    },
    disabled: {
      light: "$mds-color-theme-text-primary-disabled",
      dark: "$mds-color-theme-text-primary-disabled"
    }
  },
  "dots-color": {
    light: "$mds-color-theme-control-inactive-normal",
    dark: "$mds-color-theme-inverted-control-inactive-normal", //todo
    current: {
      light: "$mds-color-theme-control-active-normal",
      dark: "$mds-color-theme-control-active-normal"
    }
  }
};

module.exports = pagination;
