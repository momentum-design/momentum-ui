/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const list = {
  prefix: "mdv2",
  component: "list",
  "text-color": {
    light: "$mds-color-theme-neutral-text-primary",
    dark: "$mds-color-theme-neutral-text-primary"
  },
  hover: {
    background: {
      light: "$mds-color-theme-neutral-surface-secondary-hover",
      dark: "$mds-color-theme-neutral-surface-secondary-hover"
    },
    "text-color": {
      light: "$mds-color-theme-neutral-text-primary",
      dark: "$mds-color-theme-neutral-text-primary"
    }
  },
  disabled: {
    "text-color": {
      light: "$mds-color-theme-neutral-text-primary",
      dark: "$mds-color-theme-neutral-text-primary"
    }
  },
  active: {
    background: {
      light: "$mds-color-theme-neutral-surface-primary-active",
      dark: "$mds-color-theme-neutral-surface-primary-active"
    },
    "text-color": {
      light: "$mds-color-theme-neutral-text-primary",
      dark: "$mds-color-theme-neutral-text-primary"
    }
  },
  focus: {
    "border-color": {
      light: "$mds-color-theme-accent-text-default",
      dark: "$mds-color-theme-accent-text-default"
    }
  }
};

module.exports = list;
