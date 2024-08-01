/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const alertBanner = {
  prefix: "mdv2",
  component: "alert-banner",
  default: {
    "bg-color": {
      common: "$mds-color-theme-background-alert-theme-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-accent-normal"
    }
  },
  error: {
    "bg-color": {
      common: "$mds-color-theme-background-alert-error-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-error-normal"
    }
  },
  warning: {
    "bg-color": {
      common: "$mds-color-theme-background-alert-warning-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-warning-normal"
    }
  },
  success: {
    "bg-color": {
      common: "$mds-color-theme-background-alert-success-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-success-normal"
    }
  },
  "border-radius": {
    common: "0.5rem"
  }
};

module.exports = alertBanner;
