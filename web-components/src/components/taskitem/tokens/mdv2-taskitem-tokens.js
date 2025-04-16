/* eslint-disable no-undef */

const task_item = {
  prefix: "mdv2",
  component: "taskitem",
  "text-color": {
    common: "$mds-color-theme-text-secondary-normal"
  },
  "hover-bg-color": {
    common: "$mds-color-theme-background-primary-hover"
  },
  "pressed-bg-color": {
    common: "$mds-color-theme-background-primary-active"
  },
  "focus-bg-color": {
    common: "$mds-color-theme-background-primary-ghost"
  },
  "focus-border-color": {
    common: "$mds-color-theme-outline-theme-normal"
  },
  status: {
    "bg-color": {
      common: "$mds-color-theme-background-solid-secondary-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-secondary-normal"
    },
    pause: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-warning-normal"
      }
    }
  },
  selected: {
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    }
  },
  chat: {
    "text-color": {
      common: "$mds-color-theme-text-secondary-normal"
    },
    "quantity-bg-color": {
      common: "$mds-color-theme-background-accent-normal"
    },
    "quantity-text-color": {
      common: "$mds-color-theme-common-text-primary-normal"
    }
  },
  timer: {
    "text-color": {
      common: "$mds-color-theme-text-success-normal"
    }
  },
  restyle: {
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    },
    "error-text-color": {
      common: "$mds-color-theme-text-error-normal"
    }
  }
};

module.exports = task_item;
