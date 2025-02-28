/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const badge = {
  prefix: "lm",
  component: "badge",
  default: {
    "bg-color": {
      light: colors.gray["05"].name,
      dark: colors.gray[80].name
    },
    "text-color": {
      light: colors.gray[70].name,
      dark: colors.gray["05"].name
    }
  },
  blue: {
    "bg-color": {
      light: colors.cobalt[20].name,
      dark: colors.cobalt[70].name
    },
    "text-color": {
      light: colors.cobalt[70].name,
      dark: colors.cobalt[20].name
    },
    hover: {
      "bg-color": {
        light: colors.cobalt[30].name,
        dark: colors.cobalt[60].name
      }
    },
    active: {
      "bg-color": {
        light: colors.cobalt[40].name,
        dark: colors.cobalt[50].name
      }
    }
  },
  gray: {
    "bg-color": {
      light: colors.gray[20].name,
      dark: colors.gray[70].name
    },
    "text-color": {
      light: colors.gray[100].name,
      dark: colors.gray["05"].name
    },
    hover: {
      "bg-color": {
        light: colors.gray[30].name,
        dark: colors.gray[60].name
      }
    },
    active: {
      "bg-color": {
        light: colors.gray[30].name,
        dark: colors.gray[50].name
      }
    }
  },
  green: {
    "bg-color": {
      light: colors.green[20].name,
      dark: colors.green[80].name
    },
    "text-color": {
      light: colors.green[70].name,
      dark: colors.green[20].name
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
      light: colors.purple[20].name,
      dark: colors.purple[80].name
    },
    "text-color": {
      light: colors.purple[70].name,
      dark: colors.purple[20].name
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
      light: colors.yellow[20].name,
      dark: colors.yellow[80].name
    },
    "text-color": {
      light: colors.yellow[70].name,
      dark: colors.yellow[20].name
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
      light: colors.red[20].name,
      dark: colors.red[80].name
    },
    "text-color": {
      light: colors.red[70].name,
      dark: colors.red[20].name
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
      light: colors.orange[20].name,
      dark: colors.orange[70].name
    },
    "text-color": {
      light: colors.orange[70].name,
      dark: colors.orange[20].name
    },
    hover: {
      "bg-color": {
        light: colors.orange[30].name,
        dark: colors.orange[60].name
      }
    },
    active: {
      "bg-color": {
        light: colors.orange[40].name,
        dark: colors.orange[50].name
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
      light: colors.red[60].name,
      dark: colors.red[60].name
    },
    "text-color": {
      light: colors.gray["05"].name,
      dark: colors.gray["05"].name
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
