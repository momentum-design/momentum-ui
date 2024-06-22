/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const task_item = {
  prefix: "mdv2",
  component: "taskitem",
  "text-color": {
    light: "$mds-color-theme-text-secondary-normal",
    dark: "$mds-color-theme-text-secondary-normal"
  },
  "hover-bg-color": {
    light: "$mds-color-theme-background-primary-hover",
    dark: "$mds-color-theme-background-primary-hover"
  },
  "pressed-bg-color": {
    light: "$mds-color-theme-background-primary-active",
    dark: "$mds-color-theme-background-primary-active"
  },
  "focus-bg-color": {
    light: "$mds-color-theme-background-primary-ghost",
    dark: "$mds-color-theme-background-primary-ghost"
  },
  "focus-border-color": {
    light: "$mds-color-theme-outline-theme-normal",
    dark: "$mds-color-theme-outline-theme-normal"
  },
  status: {
    "bg-color": {
      light: "$mds-color-theme-background-solid-secondary-normal",
      dark: "$mds-color-theme-background-solid-secondary-normal"
    },
    "text-color": {
      light: "$mds-color-theme-text-secondary-normal",
      dark: "$mds-color-theme-text-secondary-normal"
    },
    pause: {
      "bg-color": {
        light: "$mds-color-theme-background-alert-warning-normal",
        dark: "$mds-color-theme-background-alert-warning-normal"
      }
    }
  },
  selected: {
    "text-color": {
      light: "$mds-color-theme-text-primary-normal",
      dark: "$mds-color-theme-text-primary-normal"
    }
  },
  chat: {
    "text-color": {
      light: "$mds-color-theme-text-secondary-normal",
      dark: "$mds-color-theme-text-secondary-normal"
    },
    "quantity-bg-color": {
      light: "$mds-color-theme-background-accent-normal",
      dark: "$mds-color-theme-background-accent-normal"
    },
    "quantity-text-color": {
      light: "$mds-color-theme-common-text-white",
      dark: "$mds-color-theme-common-text-white"
    }
  },
  timer: {
    "text-color": {
      light: "$mds-color-theme-text-success-normal",
      dark: "$mds-color-theme-text-success-normal"
    }
  }
};

module.exports = task_item;
