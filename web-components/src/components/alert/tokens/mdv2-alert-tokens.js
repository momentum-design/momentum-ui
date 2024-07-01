/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const alert = {
  prefix: "mdv2",
  component: "alert",
  default: {
    "bg-color": {
      light: "$mds-color-theme-background-solid-primary-normal",
      dark: "$mds-color-theme-background-solid-primary-normal"
    },
    "align-items": {
      light: "flex-start",
      dark: "flex-start"
    },
    "text-color": {
      light: "$mds-color-theme-text-secondary-normal",
      dark: "$mds-color-theme-text-secondary-normal"
    },
    "icon-size": {
      light: "24px",
      dark: "24px"
    },
    "border-color": {
      light: "$mds-color-theme-outline-secondary-normal",
      dark: "$mds-color-theme-outline-secondary-normal"
    }
  },
  title: {
    "text-color": {
      light: "$mds-color-theme-text-primary-normal",
      dark: "$mds-color-theme-text-primary-normal"
    },
    "font-size": {
      light: "1rem",
      dark: "1rem"
    }
  },
  close: {
    "bg-color": {
      light: "transparent",
      dark: "transparent"
    },
    size: {
      light: "1rem",
      dark: "1rem"
    },
    "text-color": {
      light: "$mds-color-theme-text-primary-normal",
      dark: "$mds-color-theme-text-primary-normal"
    }
  }
};

module.exports = alert;
