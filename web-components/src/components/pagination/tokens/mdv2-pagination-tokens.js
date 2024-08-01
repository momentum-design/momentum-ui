/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const pagination = {
  prefix: "mdv2",
  component: "pagination",
  color: {
    common: "$mds-color-theme-text-secondary-normal",
    current: {
      common: "$mds-color-theme-common-text-primary-normal"
    }
  },
  "bg-current": {
    common: "$mds-color-theme-control-active-normal"
  },

  "bg-hover": {
    common: "$mds-color-theme-inverted-control-inactive-normal"
  },
  nav: {
    color: {
      common: "$mds-color-theme-text-primary-normal"
    },
    hover: {
      common: "$mds-color-theme-text-primary-normal"
    },
    disabled: {
      common: "$mds-color-theme-text-primary-disabled"
    }
  },
  "dots-color": {
    common: "$mds-color-theme-inverted-control-inactive-normal",
    current: {
      common: "$mds-color-theme-control-active-normal"
    }
  }
};

module.exports = pagination;
