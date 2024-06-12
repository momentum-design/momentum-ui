/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const badge = {
  prefix: "mdv2",
  component: "badge",
  default: {
    "bg-color": {
      light: "$mds-color-theme-background-alert-default-normal",
      dark: "$mds-color-theme-background-alert-default-normal"
    },
    "text-color": {
      light: "$mds-color-theme-text-primary-normal",
      dark: "$mds-color-theme-text-primary-normal"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-background-alert-default-hover",
        dark: "$mds-color-theme-background-alert-default-hover"
      }
    },
    active: {
      "bg-color": {
        light: "$mds-color-theme-background-alert-default-active",
        dark: "$mds-color-theme-background-alert-default-active"
      }
    }
  },
  blue: {
    "bg-color": {
      light: "$mds-color-theme-background-alert-theme-normal",
      dark: "$mds-color-theme-background-alert-theme-normal"
    },
    "text-color": {
      light: "$mds-color-theme-text-accent-normal",
      dark: "$mds-color-theme-text-accent-normal"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-background-alert-theme-hover",
        dark: "$mds-color-theme-background-alert-theme-hover"
      }
    },
    active: {
      "bg-color": {
        light: "$mds-color-theme-background-alert-theme-active",
        dark: "$mds-color-theme-background-alert-theme-active"
      }
    }
  },
  gray: {
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
    active: {
      "bg-color": {
        light: "$mds-color-theme-button-primary-pressed",
        dark: "$mds-color-theme-button-primary-pressed"
      }
    }
  },
  green: {
    "bg-color": {
      light: "$mds-color-theme-background-alert-success-normal",
      dark: "$mds-color-theme-background-alert-success-normal"
    },
    "text-color": {
      light: "$mds-color-theme-text-success-normal",
      dark: "$mds-color-theme-text-success-normal"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-background-alert-success-hover",
        dark: "$mds-color-theme-background-alert-success-hover"
      }
    },
    active: {
      "bg-color": {
        light: "$mds-color-theme-background-alert-success-active",
        dark: "$mds-color-theme-background-alert-success-active"
      }
    }
  },
  lime: {
    "bg-color": {
      light: "$mds-color-theme-text-team-lime-normal",
      dark: "$mds-color-theme-text-team-lime-normal"
    },
    "text-color": {
      light: "$mds-color-theme-inverted-text-primary-normal",
      dark: "$mds-color-theme-inverted-text-primary-normal"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-text-team-lime-hover",
        dark: "$mds-color-theme-text-team-lime-hover"
      }
    },
    active: {
      "bg-color": {
        light: "$mds-color-theme-text-team-lime-active",
        dark: "$mds-color-theme-text-team-lime-active"
      }
    }
  },
  pink: {
    "bg-color": {
      light: "$mds-color-theme-text-team-pink-normal",
      dark: "$mds-color-theme-text-team-pink-normal"
    },
    "text-color": {
      light: "$mds-color-theme-inverted-text-primary-normal",
      dark: "$mds-color-theme-inverted-text-primary-normal"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-text-team-pink-hover",
        dark: "$mds-color-theme-text-team-pink-hover"
      }
    },
    active: {
      "bg-color": {
        light: "$mds-color-theme-text-team-pink-active",
        dark: "$mds-color-theme-text-team-pink-active"
      }
    }
  },
  purple: {
    "bg-color": {
      light: "$mds-color-theme-background-alert-purple-normal",
      dark: "$mds-color-theme-background-alert-purple-normal"
    },
    "text-color": {
      light: "$mds-color-theme-text-alert-purple-normal",
      dark: "$mds-color-theme-text-alert-purple-normal"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-background-alert-purple-hover",
        dark: "$mds-color-theme-background-alert-purple-hover"
      }
    },
    active: {
      "bg-color": {
        light: "$mds-color-theme-background-alert-purple-active",
        dark: "$mds-color-theme-background-alert-purple-active"
      }
    }
  },
  violet: {
    "bg-color": {
      light: "$mds-color-theme-text-team-violet-normal",
      dark: "$mds-color-theme-text-team-violet-normal"
    },
    "text-color": {
      light: "$mds-color-theme-inverted-text-primary-normal",
      dark: "$mds-color-theme-inverted-text-primary-normal"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-text-team-violet-hover",
        dark: "$mds-color-theme-text-team-violet-hover"
      }
    },
    active: {
      "bg-color": {
        light: "$mds-color-theme-text-team-violet-active",
        dark: "$mds-color-theme-text-team-violet-active"
      }
    }
  },
  mint: {
    "bg-color": {
      light: "$mds-color-theme-text-team-mint-normal",
      dark: "$mds-color-theme-text-team-mint-normal"
    },
    "text-color": {
      light: "$mds-color-theme-inverted-text-primary-normal",
      dark: "$mds-color-theme-inverted-text-primary-normal"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-text-team-mint-hover",
        dark: "$mds-color-theme-text-team-mint-hover"
      }
    },
    active: {
      "bg-color": {
        light: "$mds-color-theme-text-team-mint-active",
        dark: "$mds-color-theme-text-team-mint-active"
      }
    }
  },
  darkmint: {
    "bg-color": {
      light: colors.mint[50].name,
      dark: colors.mint[50].name
    },
    "text-color": {
      light: colors.gray["05"].name,
      dark: colors.gray["05"].name
    }
  },
  yellow: {
    "bg-color": {
      light: "$mds-color-theme-background-alert-warning-normal",
      dark: "$mds-color-theme-background-alert-warning-normal"
    },
    "text-color": {
      light: "$mds-color-theme-text-warning-normal",
      dark: "$mds-color-theme-text-warning-normal"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-background-alert-warning-hover",
        dark: "$mds-color-theme-background-alert-warning-hover"
      }
    },
    active: {
      "bg-color": {
        light: "$mds-color-theme-background-alert-warning-active",
        dark: "$mds-color-theme-background-alert-warning-active"
      }
    }
  },
  gold: {
    "bg-color": {
      light: "$mds-color-theme-text-team-gold-normal",
      dark: "$mds-color-theme-text-team-gold-normal"
    },
    "text-color": {
      light: "$mds-color-theme-inverted-text-primary-normal",
      dark: "$mds-color-theme-inverted-text-primary-normal"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-text-team-gold-hover",
        dark: "$mds-color-theme-text-team-gold-hover"
      }
    },
    active: {
      "bg-color": {
        light: "$mds-color-theme-text-team-gold-active",
        dark: "$mds-color-theme-text-team-gold-active"
      }
    }
  },
  red: {
    "bg-color": {
      light: "$mds-color-theme-background-alert-error-normal",
      dark: "$mds-color-theme-background-alert-error-normal"
    },
    "text-color": {
      light: "$mds-color-theme-text-error-normal",
      dark: "$mds-color-theme-text-error-normal"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-background-alert-error-hover",
        dark: "$mds-color-theme-background-alert-error-hover"
      }
    },
    active: {
      "bg-color": {
        light: "$mds-color-theme-background-alert-error-active",
        dark: "$mds-color-theme-background-alert-error-active"
      }
    }
  },
  darkred: {
    "bg-color": {
      light: colors.red[60].name,
      dark: colors.red[60].name
    },
    "text-color": {
      light: colors.red[90].name,
      dark: colors.red[30].name
    }
  },
  orange: {
    "bg-color": {
      light: "$mds-color-theme-background-alert-orange-normal",
      dark: "$mds-color-theme-background-alert-orange-normal"
    },
    "text-color": {
      light: "$mds-color-theme-text-warning-normal",
      dark: "$mds-color-theme-text-warning-normal"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-background-alert-orange-hover",
        dark: "$mds-color-theme-background-alert-orange-hover"
      }
    },
    active: {
      "bg-color": {
        light: "$mds-color-theme-background-alert-orange-active",
        dark: "$mds-color-theme-background-alert-orange-active"
      }
    }
  },
  cyan: {
    "bg-color": {
      light: "$mds-color-theme-text-team-cyan-normal",
      dark: "$mds-color-theme-text-team-cyan-normal"
    },
    "text-color": {
      light: "$mds-color-theme-inverted-text-primary-normal",
      dark: "$mds-color-theme-inverted-text-primary-normal"
    }
  },
  hold: {
    "bg-color": {
      light: colors.yellow[10].name,
      dark: colors.yellow[80].name
    },
    "text-color": {
      light: colors.gray[100].name,
      dark: colors.gray["05"].name
    }
  },
  outline: {
    color: {
      light: colors.gray[40].name,
      dark: colors.gray[20].name
    },
    "text-color": {
      light: colors.gray[50].name,
      dark: colors.gray["05"].name
    }
  },
  disabled: {
    "bg-color": {
      light: colors.gray[20].name,
      dark: colors.gray[90].name
    },
    "text-color": {
      light: colors.gray[40].name,
      dark: colors.gray[70].name
    }
  }
};

module.exports = badge;
