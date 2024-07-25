/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const badge = {
  prefix: "mdv2",
  component: "badge",
  default: {
    "bg-color": {
      common: "$mds-color-theme-background-alert-default-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-default-hover"
      }
    },
    active: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-default-active"
      }
    }
  },
  blue: {
    "bg-color": {
      common: "$mds-color-theme-background-alert-theme-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-accent-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-theme-hover"
      }
    },
    active: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-theme-active"
      }
    }
  },
  gray: {
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
    active: {
      "bg-color": {
        common: "$mds-color-theme-button-primary-pressed"
      }
    }
  },
  green: {
    "bg-color": {
      common: "$mds-color-theme-background-alert-success-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-success-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-success-hover"
      }
    },
    active: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-success-active"
      }
    }
  },
  lime: {
    "bg-color": {
      common: "$mds-color-theme-text-team-lime-normal"
    },
    "text-color": {
      common: "$mds-color-theme-inverted-text-primary-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-text-team-lime-hover"
      }
    },
    active: {
      "bg-color": {
        common: "$mds-color-theme-text-team-lime-active"
      }
    }
  },
  pink: {
    "bg-color": {
      common: "$mds-color-theme-text-team-pink-normal"
    },
    "text-color": {
      common: "$mds-color-theme-inverted-text-primary-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-text-team-pink-hover"
      }
    },
    active: {
      "bg-color": {
        common: "$mds-color-theme-text-team-pink-active"
      }
    }
  },
  purple: {
    "bg-color": {
      common: "$mds-color-theme-background-alert-purple-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-alert-purple-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-purple-hover"
      }
    },
    active: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-purple-active"
      }
    }
  },
  violet: {
    "bg-color": {
      common: "$mds-color-theme-text-team-violet-normal"
    },
    "text-color": {
      common: "$mds-color-theme-inverted-text-primary-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-text-team-violet-hover"
      }
    },
    active: {
      "bg-color": {
        common: "$mds-color-theme-text-team-violet-active"
      }
    }
  },
  mint: {
    "bg-color": {
      common: "$mds-color-theme-text-team-mint-normal"
    },
    "text-color": {
      common: "$mds-color-theme-inverted-text-primary-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-text-team-mint-hover"
      }
    },
    active: {
      "bg-color": {
        common: "$mds-color-theme-text-team-mint-active"
      }
    }
  },
  darkmint: {
    "bg-color": {
      common: colors.mint[50].name
    },
    "text-color": {
      common: colors.gray["05"].name
    }
  },
  yellow: {
    "bg-color": {
      common: "$mds-color-theme-background-alert-warning-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-warning-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-warning-hover"
      }
    },
    active: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-warning-active"
      }
    }
  },
  gold: {
    "bg-color": {
      common: "$mds-color-theme-text-team-gold-normal"
    },
    "text-color": {
      common: "$mds-color-theme-inverted-text-primary-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-text-team-gold-hover"
      }
    },
    active: {
      "bg-color": {
        common: "$mds-color-theme-text-team-gold-active"
      }
    }
  },
  red: {
    "bg-color": {
      common: "$mds-color-theme-background-alert-error-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-error-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-error-hover"
      }
    },
    active: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-error-active"
      }
    }
  },
  darkred: {
    "bg-color": {
      common: colors.red[60].name
    },
    "text-color": {
      light: colors.red[90].name,
      dark: colors.red[30].name
    }
  },
  orange: {
    "bg-color": {
      common: "$mds-color-theme-background-alert-orange-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-warning-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-orange-hover"
      }
    },
    active: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-orange-active"
      }
    }
  },
  cyan: {
    "bg-color": {
      common: "$mds-color-theme-text-team-cyan-normal"
    },
    "text-color": {
      common: "$mds-color-theme-inverted-text-primary-normal"
    }
  },
  unreadcount: {
    "bg-color": {
      common: "$mds-color-theme-background-accent-normal"
    },
    "text-color": {
      common: "$mds-color-theme-common-text-primary-normal"
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
