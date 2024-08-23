/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const button = {
  prefix: "mdv2",
  component: "button",
  primary: {
    "bg-color": {
      common: "$mds-color-theme-button-primary-normal"
    },
    "text-color": {
      common: "$mds-color-theme-inverted-text-primary-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-button-primary-hover"
      }
    },
    pressed: {
      "bg-color": {
        common: "$mds-color-theme-button-primary-pressed"
      }
    },
    outline: {
      color: {
        common: "$mds-color-theme-outline-theme-normal"
      },
      "text-color": {
        common: "$mds-color-theme-text-accent-normal"
      }
    }
  },
  secondary: {
    "bg-color": {
      common: "$mds-color-theme-button-secondary-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    },
    "border-color": {
      common: "$mds-color-theme-outline-button-normal"
    },
    disabled: {
      "bg-color": {
        common: "$mds-color-theme-button-secondary-disabled"
      },
      "text-color": {
        common: "$mds-color-theme-text-primary-disabled"
      },
      "border-color": {
        common: "$mds-color-theme-outline-primary-disabled"
      }
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-button-secondary-hover"
      }
    },
    pressed: {
      "bg-color": {
        common: "$mds-color-theme-button-secondary-pressed"
      }
    },
    outline: {
      color: {
        common: "$mds-color-theme-outline-button-normal"
      },
      "text-color": {
        common: "$mds-color-theme-text-primary-normal"
      }
    }
  },
  "secondary-active": {
    normal: {
      "bg-color": {
        common: "$mds-color-theme-button-secondary-active-normal"
      }
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-button-secondary-active-hover"
      }
    },
    pressed: {
      "bg-color": {
        common: "$mds-color-theme-button-secondary-active-pressed"
      }
    }
  },
  green: {
    "bg-color": {
      common: "$mds-color-theme-button-join-normal"
    },
    "text-color": {
      common: "$mds-color-theme-common-text-primary-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-button-join-hover"
      }
    },
    pressed: {
      "bg-color": {
        common: "$mds-color-theme-button-join-pressed"
      }
    },
    outline: {
      color: {
        common: "$mds-color-theme-outline-join-normal"
      },
      "text-color": {
        common: "$mds-color-theme-text-success-normal"
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
      common: "$mds-color-theme-button-cancel-normal"
    },
    "text-color": {
      common: "$mds-color-theme-common-text-primary-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-button-cancel-hover"
      }
    },
    pressed: {
      "bg-color": {
        common: "$mds-color-theme-button-cancel-pressed"
      }
    },
    outline: {
      color: {
        common: "$mds-color-theme-outline-cancel-normal"
      },
      "text-color": {
        common: "$mds-color-theme-text-error-normal"
      }
    }
  },
  ghost: {
    "bg-color": {
      common: "$mds-color-theme-button-secondary-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    },
    disabled: {
      "bg-color": {
        common: "$mds-color-theme-button-secondary-disabled"
      },
      "text-color": {
        common: "$mds-color-theme-text-primary-disabled"
      }
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-button-secondary-hover"
      }
    },
    pressed: {
      "bg-color": {
        common: "$mds-color-theme-button-secondary-pressed"
      }
    }
  },
  "ghost-active": {
    "bg-color": {
      common: "$mds-color-theme-button-secondary-active-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    },
    disabled: {
      "bg-color": {
        common: "$mds-color-theme-button-secondary-active-disabled"
      },
      "text-color": {
        common: "$mds-color-theme-text-primary-disabled"
      }
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-button-secondary-active-hover"
      }
    },
    pressed: {
      "bg-color": {
        common: "$mds-color-theme-button-secondary-active-pressed"
      }
    }
  },
  promotional: {
    "bg-color": {
      common: "$mds-color-theme-common-button-promotion-normal"
    },
    "text-color": {
      common: "$mds-color-theme-common-text-primary-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-common-button-promotion-hover"
      }
    },
    pressed: {
      "bg-color": {
        common: "$mds-color-theme-common-button-promotion-active"
      }
    }
  },
  accent: {
    "bg-color": {
      common: "$mds-color-theme-button-accent-normal"
    },
    "text-color": {
      common: "$mds-color-theme-common-text-primary-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-button-accent-hover"
      }
    },
    pressed: {
      "bg-color": {
        common: "$mds-color-theme-button-accent-pressed"
      }
    }
  },
  available: {
    "bg-color": {
      common: "$mds-color-theme-background-alert-success-normal"
    },
    "border-color": {
      common: "$mds-color-theme-outline-join-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-success-hover"
      }
    },
    pressed: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-success-active"
      }
    }
  },
  engaged: {
    "bg-color": {
      common: "$mds-color-theme-background-alert-warning-normal"
    },
    "border-color": {
      common: "$mds-color-theme-text-warning-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-warning-hover"
      }
    },
    pressed: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-warning-active"
      }
    }
  },
  unavailable: {
    "bg-color": {
      common: "$mds-color-theme-background-alert-error-normal"
    },
    "border-color": {
      common: "$mds-color-theme-outline-cancel-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-error-hover"
      }
    },
    pressed: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-error-active"
      }
    }
  },
  idle: {
    "bg-color": {
      common: "$mds-color-theme-background-alert-default-normal"
    },
    "border-color": {
      common: "$mds-color-theme-outline-primary-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-default-hover"
      }
    },
    pressed: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-default-active"
      }
    }
  },
  "state-selector": {
    "border-radius": {
      common: "8px"
    }
  },
  disabled: {
    "bg-color": {
      common: "$mds-color-theme-button-primary-disabled"
    },
    "text-color": {
      common: "$mds-color-theme-text-primary-disabled"
    }
  },
  favorite: {
    "icon-color": {
      common: "$mds-color-theme-text-warning-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-button-secondary-hover"
      },
      "icon-color": {
        common: "$mds-color-theme-text-warning-hover"
      }
    },
    pressed: {
      "bg-color": {
        common: "$mds-color-theme-button-secondary-pressed"
      },
      "icon-color": {
        common: "$mds-color-theme-text-warning-active"
      }
    },
    "border-radius": {
      common: "100%"
    }
  },
  "focus-ring": {
    color: {
      common: "$mds-color-theme-outline-theme-normal"
    }
  },
  font: {
    size: {
      "extra-small": {
        common: "0.75rem"
      },
      small: {
        common: "0.875rem"
      },
      medium: {
        common: "1rem"
      }
    }
  },
  padding: {
    24: {
      common: "0rem 0.5rem 0rem 0.5rem"
    },
    28: {
      common: "0rem 0.625rem 0rem 0.625rem"
    },
    32: {
      common: "0rem 0.75rem 0rem 0.75rem"
    },
    36: {
      common: "0rem 0.875rem 0rem 0.875rem"
    },
    40: {
      common: "0rem 1rem 0rem 1rem"
    },
    52: {
      common: "0rem 1.125rem 0rem 1.125rem"
    }
  }
};

module.exports = button;
