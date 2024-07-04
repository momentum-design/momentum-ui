/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const alertBanner = {
  prefix: "mdv2",
  component: "alert-banner",
  default: {
    "bg-color": {
      light: "$mds-color-theme-background-alert-theme-normal",
      dark: "$mds-color-theme-background-alert-theme-normal"
    },
    "text-color": {
      light: "$mds-color-theme-text-accent-normal",
      dark: "$mds-color-theme-text-accent-normal"
    }
  },
  error: {
    "bg-color": {
      light: "$mds-color-theme-background-alert-error-normal",
      dark: "$mds-color-theme-background-alert-error-normal"
    },
    "text-color": {
      light: "$mds-color-theme-text-error-normal",
      dark: "$mds-color-theme-text-error-normal"
    }
  },
  warning: {
    "bg-color": {
      light: "$mds-color-theme-background-alert-warning-normal",
      dark: "$mds-color-theme-background-alert-warning-normal"
    },
    "text-color": {
      light: "$mds-color-theme-text-warning-normal",
      dark: "$mds-color-theme-text-warning-normal"
    }
  },
  success: {
    "bg-color": {
      light: "$mds-color-theme-background-alert-success-normal",
      dark: "$mds-color-theme-background-alert-success-normal"
    },
    "text-color": {
      light: "$mds-color-theme-text-success-normal",
      dark: "$mds-color-theme-text-success-normal"
    }
  },
  "border-radius": {
    light: "0.5rem",
    dark: "0.5rem"
  }
};

module.exports = alertBanner;
