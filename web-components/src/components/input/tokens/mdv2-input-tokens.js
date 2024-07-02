/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const button = {
  prefix: "mdv2",
  component: "input",
  default: {
    "bg-color": {
      light: "$mds-color-theme-background-solid-primary-normal",
      dark: "$mds-color-theme-background-solid-primary-normal"
    },
    "text-color": {
      light: "$mds-color-theme-text-primary-normal",
      dark: "$mds-color-theme-text-primary-normal"
    },
    "border-color": {
      light: "$mds-color-theme-outline-primary-normal",
      dark: "$mds-color-theme-outline-primary-normal"
    },
    "placeholder-color": {
      light: "$mds-color-theme-text-secondary-normal",
      dark: "$mds-color-theme-text-secondary-normal"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-background-primary-hover",
        dark: "$mds-color-theme-background-primary-hover"
      }
    },
    "read-only": {
      "bg-color": {
        light: "$mds-color-theme-background-primary-disabled",
        dark: "$mds-color-theme-background-primary-disabled"
      },
      "border-color": {
        light: "$mds-color-theme-outline-primary-disabled",
        dark: "$mds-color-theme-outline-primary-disabled"
      }
    },
    focus: {
      "border-color": {
        light: "$mds-color-theme-outline-theme-normal",
        dark: "$mds-color-theme-outline-theme-normal"
      },
      "background-color": {
        light: "$mds-color-theme-background-primary-active",
        dark: "$mds-color-theme-background-primary-active"
      }
    },
    pressed: {
      "bg-color": {
        light: "$mds-color-theme-background-primary-active",
        dark: "$mds-color-theme-background-primary-active"
      },
      "border-color": {
        light: "$mds-color-theme-outline-primary-normal",
        dark: "$mds-color-theme-outline-primary-normal"
      }
    },
    outline: {
      color: {
        light: "$mds-color-theme-outline-theme-normal",
        dark: "$mds-color-theme-outline-theme-normal"
      },
      "text-color": {
        light: "$mds-color-theme-text-accent-normal",
        dark: "$mds-color-theme-text-accent-normal"
      }
    }
  },
  disabled: {
    "bg-color": {
      light: "$mds-color-theme-background-primary-disabled",
      dark: "$mds-color-theme-background-primary-disabled"
    },
    "text-color": {
      light: "$mds-color-theme-text-primary-disabled",
      dark: "$mds-color-theme-text-primary-disabled"
    }
  },
  error: {
    "bg-color": {
      light: "$mds-color-theme-background-solid-primary-normal",
      dark: "$mds-color-theme-background-solid-primary-normal"
    },
    "border-color": {
      light: "$mds-color-theme-outline-cancel-normal",
      dark: "$mds-color-theme-outline-cancel-normal"
    },
    "text-color": {
      light: "$mds-color-theme-text-primary-normal",
      dark: "$mds-color-theme-text-primary-normal"
    },
    "message-text-color": {
      light: "$mds-color-theme-text-error-normal",
      dark: "$mds-color-theme-text-error-normal"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-background-primary-hover",
        dark: "$mds-color-theme-background-primary-hover"
      }
    },
    pressed: {
      "bg-color": {
        light: "$mds-color-theme-background-primary-active",
        dark: "$mds-color-theme-background-primary-active"
      }
    }
  },
  success: {
    "border-color": {
      light: "$mds-color-theme-outline-join-normal",
      dark: "$mds-color-theme-outline-join-normal"
    },
    "bg-color": {
      light: "$mds-color-theme-background-solid-primary-normal",
      dark: "$mds-color-theme-background-solid-primary-normal"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-background-primary-hover",
        dark: "$mds-color-theme-background-primary-hover"
      }
    },
    pressed: {
      "bg-color": {
        light: "$mds-color-theme-background-primary-active",
        dark: "$mds-color-theme-background-primary-active"
      }
    },
    "text-color": {
      light: "$mds-color-theme-text-primary-normal",
      dark: "$mds-color-theme-text-primary-normal"
    }
  },
  warning: {
    "border-color": {
      light: "$mds-color-theme-text-warning-normal",
      dark: "$mds-color-theme-text-warning-normal"
    },
    "bg-color": {
      light: "$mds-color-theme-background-solid-primary-normal",
      dark: "$mds-color-theme-background-solid-primary-normal"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-background-primary-hover",
        dark: "$mds-color-theme-background-primary-hover"
      }
    },
    pressed: {
      "bg-color": {
        light: "$mds-color-theme-background-primary-active",
        dark: "$mds-color-theme-background-primary-active"
      }
    },
    "text-color": {
      light: "$mds-color-theme-text-primary-normal",
      dark: "$mds-color-theme-text-primary-normal"
    }
  },
  filled: {
    "bg-color": {
      light: "$mds-color-theme-background-solid-secondary-normal",
      dark: "$mds-color-theme-background-solid-secondary-normal"
    },
    disabled: {
      "bg-color": {
        light: "$mds-color-theme-background-primary-disabled",
        dark: "$mds-color-theme-background-primary-disabled"
      }
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-background-secondary-hover",
        dark: "$mds-color-theme-background-secondary-hover"
      }
    }
  },
  "focus-ring": {
    color: {
      light: "$mds-color-theme-outline-theme-normal",
      dark: "$mds-color-theme-outline-theme-normal"
    }
  }
};

module.exports = button;
