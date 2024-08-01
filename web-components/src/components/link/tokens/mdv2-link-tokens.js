/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const link = {
  prefix: "mdv2",
  component: "link",
  default: {
    common: "$mds-color-theme-text-accent-normal"
  },
  hover: {
    common: "$mds-color-theme-text-accent-hover"
  },
  pressed: {
    common: "$mds-color-theme-text-accent-active"
  },
  focus: {
    common: "$mds-color-theme-common-text-primary-disabled",

    outline: {
      common: "$mds-color-theme-common-text-primary-disabled"
    }
  },
  disabled: {
    common: "$mds-color-theme-text-primary-disabled"
  },
  inline: {
    common: "$mds-color-theme-text-error-normal",

    hover: {
      common: "$mds-color-theme-text-error-hover"
    },
    pressed: {
      common: "$mds-color-theme-text-error-active"
    },
    focus: {
      common: "$mds-color-theme-text-error-normal"
    },
    "font-size": {
      common: "1rem"
    },
    "font-size__inline": {
      common: "0.875rem"
    }
  }
};

module.exports = link;
