/* eslint-disable @typescript-eslint/no-require-imports */
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
      common: "$mds-color-theme-background-primary-ghost"
    },
    "text-color": {
      common: "$mds-color-theme-text-primary-disabled"
    },
    "border-color": {
      common: "$mds-color-theme-outline-primary-disabled"
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
  warning: {
    "bg-color": {
      common: "$mds-color-theme-background-alert-warning-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-warning-normal"
    },
    "icon-color": {
      common: "$mds-color-theme-text-warning-normal"
    },
    "border-color": {
      common: "$mds-color-theme-outline-warning-normal"
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
  },
  confidence: {
    default: {
      "bg-color": {
        common: "$mds-color-theme-background-label-default-normal"
      },
      "text-color": {
        common: "$mds-color-theme-text-primary-normal"
      },
      "border-color": {
        common: "$mds-color-theme-outline-button-normal"
      },
      hover: {
        "bg-color": {
          common: "$mds-color-theme-background-label-default-hover"
        }
      },
      active: {
        "bg-color": {
          common: "$mds-color-theme-background-label-default-active"
        }
      }
    },
    violet: {
      "bg-color": {
        common: "$mds-color-theme-background-label-violet-normal"
      },
      "text-color": {
        common: "$mds-color-theme-text-primary-normal"
      },
      "border-color": {
        common: "$mds-color-theme-outline-label-violet"
      },
      hover: {
        "bg-color": {
          common: "$mds-color-theme-background-label-violet-hover"
        }
      },
      active: {
        "bg-color": {
          common: "$mds-color-theme-background-label-violet-active"
        }
      }
    },
    slate: {
      "bg-color": {
        common: "$mds-color-theme-background-label-slate-normal"
      },
      "text-color": {
        common: "$mds-color-theme-text-primary-normal"
      },
      "border-color": {
        common: "$mds-color-theme-outline-label-slate"
      },
      hover: {
        "bg-color": {
          common: "$mds-color-theme-background-label-slate-hover"
        }
      },
      active: {
        "bg-color": {
          common: "$mds-color-theme-background-label-slate-active"
        }
      }
    },
    gold: {
      "bg-color": {
        common: "$mds-color-theme-background-label-gold-normal"
      },
      "text-color": {
        common: "$mds-color-theme-text-primary-normal"
      },
      "border-color": {
        common: "$mds-color-theme-outline-label-gold"
      },
      hover: {
        "bg-color": {
          common: "$mds-color-theme-background-label-gold-hover"
        }
      },
      active: {
        "bg-color": {
          common: "$mds-color-theme-background-label-gold-active"
        }
      }
    },
    mint: {
      "bg-color": {
        common: "$mds-color-theme-background-label-mint-normal"
      },
      "text-color": {
        common: "$mds-color-theme-text-primary-normal"
      },
      "border-color": {
        common: "$mds-color-theme-outline-label-mint"
      },
      hover: {
        "bg-color": {
          common: "$mds-color-theme-background-label-mint-hover"
        }
      },
      active: {
        "bg-color": {
          common: "$mds-color-theme-background-label-mint-active"
        }
      }
    },
    pink: {
      "bg-color": {
        common: "$mds-color-theme-background-label-pink-normal"
      },
      "text-color": {
        common: "$mds-color-theme-text-primary-normal"
      },
      "border-color": {
        common: "$mds-color-theme-outline-label-pink"
      },
      hover: {
        "bg-color": {
          common: "$mds-color-theme-background-label-pink-hover"
        }
      },
      active: {
        "bg-color": {
          common: "$mds-color-theme-background-label-pink-active"
        }
      }
    },
    cobalt: {
      "bg-color": {
        common: "$mds-color-theme-background-label-cobalt-normal"
      },
      "text-color": {
        common: "$mds-color-theme-text-primary-normal"
      },
      "border-color": {
        common: "$mds-color-theme-outline-theme-normal"
      },
      hover: {
        "bg-color": {
          common: "$mds-color-theme-background-label-cobalt-hover"
        }
      },
      active: {
        "bg-color": {
          common: "$mds-color-theme-background-label-cobalt-active"
        }
      }
    },
    lime: {
      "bg-color": {
        common: "$mds-color-theme-background-label-lime-normal"
      },
      "text-color": {
        common: "$mds-color-theme-text-primary-normal"
      },
      "border-color": {
        common: "$mds-color-theme-outline-label-lime"
      },
      hover: {
        "bg-color": {
          common: "$mds-color-theme-background-label-lime-hover"
        }
      },
      active: {
        "bg-color": {
          common: "$mds-color-theme-background-label-lime-active"
        }
      }
    }
  },
  notification: {
    overlay: {
      "border-color": {
        common: "$mds-color-theme-background-solid-primary-normal"
      }
    },
    primary: {
      "background-color": {
        common: "$mds-color-theme-background-accent-normal"
      },
      "foreground-color": {
        common: "$mds-color-theme-common-text-primary-normal"
      }
    },
    secondary: {
      "background-color": {
        common: "$mds-color-theme-background-alert-default-normal"
      },
      "foreground-color": {
        common: "$mds-color-theme-text-secondary-normal"
      }
    },
    success: {
      "background-color": {
        common: "$mds-color-theme-background-alert-success-normal"
      },
      "foreground-color": {
        common: "$mds-color-theme-text-success-normal"
      }
    },
    warning: {
      "background-color": {
        common: "$mds-color-theme-background-alert-warning-normal"
      },
      "foreground-color": {
        common: "$mds-color-theme-text-warning-normal"
      }
    },
    error: {
      "background-color": {
        common: "$mds-color-theme-background-alert-error-normal"
      },
      "foreground-color": {
        common: "$mds-color-theme-text-error-normal"
      }
    }
  }
};

module.exports = badge;
