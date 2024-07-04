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
        light: "$mds-color-theme-outline-theme-normal",
        dark: "$mds-color-theme-outline-theme-normal"
      },
      "text-color": {
        light: "$mds-color-theme-text-accent-normal",
        dark: "$mds-color-theme-text-accent-normal"
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
        light: "$mds-color-theme-outline-primary-disabled",
        dark: "$mds-color-theme-outline-primary-disabled"
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
  "secondary-active": {
    normal: {
      "bg-color": {
        light: "$mds-color-theme-button-secondary-active-normal",
        dark: "$mds-color-theme-button-secondary-active-normal"
      }
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-button-secondary-active-hover",
        dark: "$mds-color-theme-button-secondary-active-hover"
      }
    },
    pressed: {
      "bg-color": {
        light: "$mds-color-theme-button-secondary-active-pressed",
        dark: "$mds-color-theme-button-secondary-active-pressed"
      }
    }
  },
  green: {
    "bg-color": {
      light: "$mds-color-theme-button-join-normal",
      dark: "$mds-color-theme-button-join-normal"
    },
    "text-color": {
      light: "$mds-color-theme-common-text-primary-normal",
      dark: "$mds-color-theme-common-text-primary-normal"
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
      light: "$mds-color-theme-common-text-primary-normal",
      dark: "$mds-color-theme-common-text-primary-normal"
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
      light:
        "linear-gradient(46deg, $mds-color-theme-common-button-promotion-normal-0 -0.03%, $mds-color-theme-common-button-promotion-normal-1 99.99%)",
      dark:
        "linear-gradient(46deg, $mds-color-theme-common-button-promotion-normal-0 -0.03%, $mds-color-theme-common-button-promotion-normal-1 99.99%)"
    },
    "text-color": {
      light: "$mds-color-theme-common-text-primary-normal",
      dark: "$mds-color-theme-common-text-primary-normal"
    },
    hover: {
      "bg-color": {
        light:
          "linear-gradient(46deg, $mds-color-theme-common-button-promotion-hover-0 -0.03%, $mds-color-theme-common-button-promotion-hover-1 99.99%)",
        dark:
          "linear-gradient(46deg, $mds-color-theme-common-button-promotion-hover-0 -0.03%, $mds-color-theme-common-button-promotion-hover-1 99.99%)"
      }
    },
    pressed: {
      "bg-color": {
        light:
          "linear-gradient(46deg, $mds-color-theme-common-button-promotion-active-0 -0.03%, $mds-color-theme-common-button-promotion-active-1 99.99%)",
        dark:
          "linear-gradient(46deg, $mds-color-theme-common-button-promotion-active-0 -0.03%, $mds-color-theme-common-button-promotion-active-1 99.99%)"
      }
    }
  },
  accent: {
    "bg-color": {
      light: "$mds-color-theme-button-accent-normal",
      dark: "$mds-color-theme-button-accent-normal"
    },
    "text-color": {
      light: "$mds-color-theme-common-text-primary-normal",
      dark: "$mds-color-theme-common-text-primary-normal"
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
      light: "$mds-color-theme-button-primary-disabled",
      dark: "$mds-color-theme-button-primary-disabled"
    },
    "text-color": {
      light: "$mds-color-theme-text-primary-disabled",
      dark: "$mds-color-theme-text-primary-disabled"
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
  },
  font: {
    weight: {
      regular: {
        light: "550",
        dark: "550"
      },
      large: {
        light: "450",
        dark: "450"
      }
    },
    size: {
      "extra-small": {
        light: "0.75rem",
        dark: "0.75rem"
      },
      small: {
        light: "0.875rem",
        dark: "0.875rem"
      },
      medium: {
        light: "1rem",
        dark: "1rem"
      }
    }
  },
  padding: {
    28: {
      light: "0rem 0.625rem 0rem 0.625rem",
      dark: "0rem 0.625rem 0rem 0.625rem"
    },
    32: {
      light: "0rem 0.75rem 0rem 0.75rem",
      dark: "0rem 0.75rem 0rem 0.75rem"
    },
    36: {
      light: "0rem 0.875rem 0rem 0.875rem",
      dark: "0rem 0.875rem 0rem 0.875rem"
    },
    40: {
      light: "0rem 1rem 0rem 1rem",
      dark: "0rem 1rem 0rem 1rem"
    },
    52: {
      light: "0rem 1.125rem 0rem 1.125rem",
      dark: "0rem 1.125rem 0rem 1.25rem"
    }
  }
};

module.exports = button;
