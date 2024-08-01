/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const alert = {
  prefix: "mdv2",
  component: "alert",
  default: {
    "bg-color": {
      common: "$mds-color-theme-background-solid-primary-normal"
    },
    "align-items": {
      common: "flex-start"
    },
    "text-color": {
      common: "$mds-color-theme-text-secondary-normal"
    },
    "icon-size": {
      common: "24px"
    },
    "border-color": {
      common: "$mds-color-theme-outline-secondary-normal"
    }
  },
  title: {
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    },
    "font-size": {
      common: "1rem"
    }
  },
  close: {
    "bg-color": {
      common: "transparent"
    },
    size: {
      common: "1rem"
    },
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    }
  }
};

module.exports = alert;
