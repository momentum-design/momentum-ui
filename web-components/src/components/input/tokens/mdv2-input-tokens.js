/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const input = {
  prefix: "mdv2",
  component: "input",
  default: {
    "bg-color": {
      common: "$mds-color-theme-background-solid-primary-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    },
    "border-color": {
      common: "$mds-color-theme-outline-primary-normal"
    },
    "placeholder-color": {
      common: "$mds-color-theme-text-secondary-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-background-primary-hover"
      }
    },
    "read-only": {
      "bg-color": {
        common: "$mds-color-theme-background-primary-disabled"
      },
      "border-color": {
        common: "$mds-color-theme-outline-primary-disabled"
      }
    },
    focus: {
      "border-color": {
        common: "$mds-color-theme-outline-theme-normal"
      },
      "background-color": {
        common: "$mds-color-theme-background-primary-active"
      }
    },
    pressed: {
      "bg-color": {
        common: "$mds-color-theme-background-primary-active"
      },
      "border-color": {
        common: "$mds-color-theme-outline-primary-normal"
      }
    },
    outline: {
      color: {
        common: "$mds-color-theme-outline-theme-normal"
      },
      "text-color": {
        common: "$mds-color-theme-text-accent-normal"
      }
    },
    new: {
      "bg-color": {
        common: "$mds-color-theme-background-primary-ghost"
      },
      "border-color": {
        common: "$mds-color-theme-outline-input-normal"
      },
      "focus-border-color": {
        common: "$mds-color-theme-outline-input-active"
      },
      "disabled-color": {
        common: "$mds-color-theme-button-primary-disabled"
      }
    }
  },
  disabled: {
    "bg-color": {
      common: "$mds-color-theme-background-primary-disabled"
    },
    "text-color": {
      common: "$mds-color-theme-text-primary-disabled"
    }
  },
  error: {
    "bg-color": {
      common: "$mds-color-theme-background-solid-primary-normal"
    },
    "border-color": {
      common: "$mds-color-theme-outline-cancel-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    },
    "message-text-color": {
      common: "$mds-color-theme-text-error-normal"
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
    }
  },
  success: {
    "border-color": {
      common: "$mds-color-theme-outline-join-normal"
    },
    "bg-color": {
      common: "$mds-color-theme-background-solid-primary-normal"
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
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    }
  },
  warning: {
    "border-color": {
      common: "$mds-color-theme-text-warning-normal"
    },
    "bg-color": {
      common: "$mds-color-theme-background-solid-primary-normal"
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
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    }
  },
  filled: {
    "bg-color": {
      common: "$mds-color-theme-background-solid-secondary-normal"
    },
    disabled: {
      "bg-color": {
        common: "$mds-color-theme-background-primary-disabled"
      }
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-background-secondary-hover"
      }
    }
  },
  "focus-ring": {
    color: {
      common: "$mds-color-theme-outline-theme-normal"
    }
  },
  "border-radius": {
    common: "8px"
  }
};

module.exports = input;
