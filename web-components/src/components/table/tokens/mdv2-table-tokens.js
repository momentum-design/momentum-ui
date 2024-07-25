/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const table = {
  prefix: "mdv2",
  component: "table",
  header: {
    "bg-color": {
      common: "$mds-color-theme-background-secondary-normal"
    }
  },
  hover: {
    "bg-color": {
      common: "$mds-color-theme-background-primary-hover"
    }
  },
  pressed: {
    "bg-color": {
      common: "$mds-color-theme-background-primary-active"
    }
  },
  "border-color": {
    common: "$mds-color-theme-outline-secondary-normal"
  },
  "text-color": {
    common: "$mds-color-theme-text-secondary-normal"
  },
  stripped: {
    "bg-color": {
      common: "$mds-color-theme-button-primary-disabled"
    }
  }
};

module.exports = table;
