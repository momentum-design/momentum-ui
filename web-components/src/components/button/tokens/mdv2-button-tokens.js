/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const button = {
  prefix: "mdv2",
  component: "button",
  primary: {
    "bg-color": {
      light: "$mds-color-theme-button-primary-normal",
      dark: "$mds-color-theme-button-primary-normal"
    },
    "text-color": {
      light: "$mds-color-theme-inverted-text-primary-normal",
      dark: "$mds-color-theme-inverted-text-primary-normal"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-button-primary-hover",
        dark: "$mds-color-theme-button-primary-hover"
      }
    },
    pressed: {
      "bg-color": {
        light: "$mds-color-theme-button-primary-pressed",
        dark: "$mds-color-theme-button-primary-pressed"
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
  secondary: {
    "bg-color": {
      light: "$mds-color-theme-button-secondary-normal",
      dark: "$mds-color-theme-button-secondary-normal"
    },
    "text-color": {
      light: "$mds-color-theme-text-primary-normal",
      dark: "$mds-color-theme-text-primary-normal"
    },
    "border-color": {
      light: "$mds-color-theme-outline-button-normal",
      dark: "$mds-color-theme-outline-button-normal"
    },
    disabled: {
      "bg-color": {
        light: "$mds-color-theme-button-secondary-disabled",
        dark: "$mds-color-theme-button-secondary-disabled"
      },
      "text-color": {
        light: "$mds-color-theme-text-primary-disabled",
        dark: "$mds-color-theme-text-primary-disabled"
      },
      "border-color": {
        light: "$mds-color-theme-outline-disabled-normal",
        dark: "$mds-color-theme-outline-disabled-normal"
      }
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-button-secondary-hover",
        dark: "$mds-color-theme-button-secondary-hover"
      }
    },
    pressed: {
      "bg-color": {
        light: "$mds-color-theme-button-secondary-pressed",
        dark: "$mds-color-theme-button-secondary-pressed"
      }
    },
    outline: {
      color: {
        light: "$mds-color-theme-outline-button-normal",
        dark: "$mds-color-theme-outline-button-normal"
      },
      "text-color": {
        light: "$mds-color-theme-text-primary-normal",
        dark: "$mds-color-theme-text-primary-normal"
      }
    }
  },
  green: {
    "bg-color": {
      light: "$mds-color-theme-button-join-normal",
      dark: "$mds-color-theme-button-join-normal"
    },
    "text-color": {
      light: "$mds-color-theme-common-text-white",
      dark: "$mds-color-theme-common-text-white"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-button-join-hover",
        dark: "$mds-color-theme-button-join-hover"
      }
    },
    pressed: {
      "bg-color": {
        light: "$mds-color-theme-button-join-pressed",
        dark: "$mds-color-theme-button-join-pressed"
      }
    },
    outline: {
      color: {
        light: "$mds-color-theme-outline-join-normal",
        dark: "$mds-color-theme-outline-join-normal"
      },
      "text-color": {
        light: "$mds-color-theme-text-success-normal",
        dark: "$mds-color-theme-text-success-normal"
      }
    }
  },
  white: {
    "bg-color": {
      light: colors.white.default.name,
      dark: colors.gray[90].name
    },
    "text-color": {
      light: colors.gray[70].name,
      dark: colors.gray[40].name
    },
    hover: {
      "bg-color": {
        light: colors.gray[10].name,
        dark: colors.gray[90].name
      }
    },
    pressed: {
      "bg-color": {
        light: colors.gray[20].name,
        dark: colors.gray[95].name
      }
    },
    outline: {
      color: {
        light: colors.gray[30].name,
        dark: colors.gray[40].name
      },
      "text-color": {
        light: colors.gray[70].name,
        dark: colors.gray[40].name
      }
    }
  },
  "inverted-white": {
    "bg-color": {
      light: colors.gray[80].name,
      dark: colors.white.default.name
    },
    "text-color": {
      light: colors.white.default.name,
      dark: colors.gray[100].name
    },
    hover: {
      "bg-color": {
        light: colors.gray[90].name,
        dark: colors.gray[10].name
      }
    },
    pressed: {
      "bg-color": {
        light: colors.gray[95].name,
        dark: colors.gray[20].name
      }
    },
    outline: {
      color: {
        light: colors.gray[40].name,
        dark: colors.gray[30].name
      },
      "text-color": {
        light: colors.gray[40].name,
        dark: colors.gray[70].name
      }
    }
  },
  gray: {
    "bg-color": {
      light: colors.gray[60].name,
      dark: colors.gray[80].name
    },
    hover: {
      "bg-color": {
        light: colors.gray[70].name,
        dark: colors.gray[70].name
      }
    },
    pressed: {
      "bg-color": {
        light: colors.gray[80].name,
        dark: colors.gray[60].name
      }
    }
  },
  red: {
    "bg-color": {
      light: "$mds-color-theme-button-cancel-normal",
      dark: "$mds-color-theme-button-cancel-normal"
    },
    "text-color": {
      light: "$mds-color-theme-common-text-white",
      dark: "$mds-color-theme-common-text-white"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-button-cancel-hover",
        dark: "$mds-color-theme-button-cancel-hover"
      }
    },
    pressed: {
      "bg-color": {
        light: "$mds-color-theme-button-cancel-pressed",
        dark: "$mds-color-theme-button-cancel-pressed"
      }
    },
    outline: {
      color: {
        light: "$mds-color-theme-outline-cancel-normal",
        dark: "$mds-color-theme-outline-cancel-normal"
      },
      "text-color": {
        light: "$mds-color-theme-text-error-normal",
        dark: "$mds-color-theme-text-error-normal"
      }
    }
  },
  promotional: {
    "bg-color": {
      light: "$mds-color-theme-common-button-promotion-normal",
      dark: "$mds-color-theme-common-button-promotion-normal"
    },
    "text-color": {
      light: "$mds-color-theme-common-text-white",
      dark: "$mds-color-theme-common-text-white"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-common-button-promotion-hover",
        dark: "$mds-color-theme-common-button-promotion-hover"
      }
    },
    pressed: {
      "bg-color": {
        light: "$mds-color-theme-common-button-promotion-active",
        dark: "$mds-color-theme-common-button-promotion-active"
      }
    }
  },
  accent: {
    "bg-color": {
      light: "$mds-color-theme-button-accent-normal",
      dark: "$mds-color-theme-button-accent-normal"
    },
    "text-color": {
      light: "$mds-color-theme-common-text-white",
      dark: "$mds-color-theme-common-text-white"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-button-accent-hover",
        dark: "$mds-color-theme-button-accent-hover"
      }
    },
    pressed: {
      "bg-color": {
        light: "$mds-color-theme-button-accent-pressed",
        dark: "$mds-color-theme-button-accent-pressed"
      }
    }
  },
  available: {
    "bg-color": {
      light: "$mds-color-theme-background-alert-success-normal",
      dark: "$mds-color-theme-background-alert-success-normal"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-background-alert-success-hover",
        dark: "$mds-color-theme-background-alert-success-hover"
      }
    },
    pressed: {
      "bg-color": {
        light: "$mds-color-theme-background-alert-success-active",
        dark: "$mds-color-theme-background-alert-success-active"
      }
    }
  },
  engaged: {
    "bg-color": {
      light: "$mds-color-theme-background-alert-warning-normal",
      dark: "$mds-color-theme-background-alert-warning-normal"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-background-alert-warning-hover",
        dark: "$mds-color-theme-background-alert-warning-hover"
      }
    },
    pressed: {
      "bg-color": {
        light: "$mds-color-theme-background-alert-warning-active",
        dark: "$mds-color-theme-background-alert-warning-active"
      }
    }
  },
  unavailable: {
    "bg-color": {
      light: "$mds-color-theme-background-alert-error-normal",
      dark: "$mds-color-theme-background-alert-error-normal"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-background-alert-error-hover",
        dark: "$mds-color-theme-background-alert-error-hover"
      }
    },
    pressed: {
      "bg-color": {
        light: "$mds-color-theme-background-alert-error-active",
        dark: "$mds-color-theme-background-alert-error-active"
      }
    }
  },
  idle: {
    "bg-color": {
      light: "$mds-color-theme-background-alert-default-normal",
      dark: "$mds-color-theme-background-alert-default-normal"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-background-alert-default-hover",
        dark: "$mds-color-theme-background-alert-default-hover"
      }
    },
    pressed: {
      "bg-color": {
        light: "$mds-color-theme-background-alert-default-active",
        dark: "$mds-color-theme-background-alert-default-active"
      }
    }
  },
  disabled: {
    "bg-color": {
      light: "$mds-color-theme-neutral-btn-primary-disabled",
      dark: "$mds-color-theme-neutral-btn-primary-disabled"
    },
    "text-color": {
      light: "$mds-color-theme-neutral-text-disabled",
      dark: "$mds-color-theme-neutral-text-disabled"
    }
  },
  favorite: {
    "icon-color": {
      light: "$mds-color-theme-text-warning-normal",
      dark: "$mds-color-theme-text-warning-normal"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-button-secondary-hover",
        dark: "$mds-color-theme-button-secondary-hover"
      },
      "icon-color": {
        light: "$mds-color-theme-text-warning-hover",
        dark: "$mds-color-theme-text-warning-hover"
      }
    },
    pressed: {
      "bg-color": {
        light: "$mds-color-theme-button-secondary-pressed",
        dark: "$mds-color-theme-button-secondary-pressed"
      },
      "icon-color": {
        light: "$mds-color-theme-text-warning-active",
        dark: "$mds-color-theme-text-warning-active"
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
