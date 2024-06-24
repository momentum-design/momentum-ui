/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

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
        light: "$mds-color-theme-outline-disabled-normal",
        dark: "$mds-color-theme-outline-disabled-normal"
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
        light: colors.blue[70].name,
        dark: colors.blue[40].name
      },
      "text-color": {
        light: colors.blue[70].name,
        dark: colors.blue[40].name
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
  succes: {
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
    }
  },
  warning: {
    "border-color": {
      light: "$mds-color-theme-warning-border-default",
      dark: "$mds-color-theme-warning-border-default"
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
