/* eslint-disable @typescript-eslint/no-require-imports */
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
      light: colors.lime[20].name,
      dark: colors.lime[70].name
    },
    "text-color": {
      light: colors.lime[70].name,
      dark: colors.lime[20].name
    },
    hover: {
      "bg-color": {
        light: colors.lime[30].name,
        dark: colors.lime[60].name
      }
    },
    active: {
      "bg-color": {
        light: colors.lime[40].name,
        dark: colors.lime[50].name
      }
    }
  },
  pink: {
    "bg-color": {
      light: colors.pink[20].name,
      dark: colors.pink[70].name
    },
    "text-color": {
      light: colors.pink[70].name,
      dark: colors.pink[20].name
    },
    hover: {
      "bg-color": {
        light: colors.pink[30].name,
        dark: colors.pink[60].name
      }
    },
    active: {
      "bg-color": {
        light: colors.pink[40].name,
        dark: colors.pink[50].name
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
      light: colors.violet[20].name,
      dark: colors.violet[70].name
    },
    "text-color": {
      light: colors.violet[70].name,
      dark: colors.violet[20].name
    },
    hover: {
      "bg-color": {
        light: colors.violet[30].name,
        dark: colors.violet[60].name
      }
    },
    active: {
      "bg-color": {
        light: colors.violet[40].name,
        dark: colors.violet[50].name
      }
    }
  },
  mint: {
    "bg-color": {
      light: colors.mint[20].name,
      dark: colors.mint[70].name
    },
    "text-color": {
      light: colors.mint[70].name,
      dark: colors.mint[20].name
    },
    hover: {
      "bg-color": {
        light: colors.mint[30].name,
        dark: colors.mint[60].name
      }
    },
    active: {
      "bg-color": {
        light: colors.mint[40].name,
        dark: colors.mint[50].name
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
      light: colors.gold[20].name,
      dark: colors.gold[70].name
    },
    "text-color": {
      light: colors.gold[70].name,
      dark: colors.gold[20].name
    },
    hover: {
      "bg-color": {
        light: colors.gold[30].name,
        dark: colors.gold[60].name
      }
    },
    active: {
      "bg-color": {
        light: colors.gold[40].name,
        dark: colors.gold[50].name
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
      light: colors.cyan[20].name,
      dark: colors.cyan[80].name
    },
    "text-color": {
      light: colors.cyan[70].name,
      dark: colors.cyan[20].name
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
  },
  positive: {
    "bg-color": {
      common: "$mds-color-theme-background-alert-success-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    },
    "border-color": {
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
  negative: {
    "bg-color": {
      common: "$mds-color-theme-background-alert-error-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    },
    "border-color": {
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
  neutral: {
    "bg-color": {
      common: "$mds-color-theme-background-alert-default-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    },
    "border-color": {
      common: "$mds-color-theme-outline-button-normal"
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
  status: {
    positive: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-success-active"
      },
      "text-color": {
        common: "$mds-color-theme-text-success-normal"
      }
    },
    negative: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-error-active"
      },
      "text-color": {
        common: "$mds-color-theme-text-error-normal"
      }
    },
    accent: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-theme-active"
      },
      "text-color": {
        common: "$mds-color-theme-text-accent-normal"
      }
    },
    orange: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-orange-active"
      },
      "text-color": {
        common: "$mds-color-theme-text-alert-orange-normal"
      }
    },
    warning: {
      "bg-color": {
        common: "$mds-color-theme-background-alert-warning-active"
      },
      "text-color": {
        common: "$mds-color-theme-text-warning-normal"
      }
    }
  }
};

module.exports = badge;
