/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const list = {
  prefix: "mdv2",
  component: "advance-list",
  "text-color": {
    common: "$mds-color-theme-text-primary-normal"
  },
  hover: {
    background: {
      common: "$mds-color-theme-background-primary-hover"
    },
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    }
  },
  disabled: {
    "text-color": {
      common: "$mds-color-theme-text-primary-disabled"
    }
  },
  active: {
    background: {
      common: "$mds-color-theme-background-primary-active"
    },
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    }
  },
  focus: {
    "border-color": {
      common: "$mds-color-theme-outline-theme-normal"
    }
  },
  "border-radius": {
    pill: {
      common: "9999px"
    },
    rounded: {
      common: "0.5rem"
    }
  },
  "line-height": {
    common: "1.5rem"
  }
};

module.exports = list;
