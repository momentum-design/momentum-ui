/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const badge = {
  prefix: "md",
  component: "badge",
  default: {
    "bg-color": {
      light: colors.gray[50].name,
      dark: colors.gray[50].name
    },
    "text-color": {
      light: colors.gray["05"].name,
      dark: colors.gray["05"].name
    }
  },
  blue: {
    "bg-color": {
      light: colors.cobalt[50].name,
      dark: colors.cobalt[50].name
    },
    "text-color": {
      light: colors.gray["05"].name,
      dark: colors.cobalt[20].name
    },
    hover: {
      "bg-color": {
        light: colors.cobalt[40].name,
        dark: colors.cobalt[60].name
      }
    },
    active: {
      "bg-color": {
        light: colors.cobalt[30].name,
        dark: colors.cobalt[70].name
      }
    }
  },
  gray: {
    "bg-color": {
      light: colors.gray[50].name,
      dark: colors.gray[50].name
    },
    "text-color": {
      light: colors.gray[100].name,
      dark: colors.gray["05"].name
    },
    hover: {
      "bg-color": {
        light: colors.gray[40].name,
        dark: colors.gray[60].name
      }
    },
    active: {
      "bg-color": {
        light: colors.gray[30].name,
        dark: colors.gray[70].name
      }
    }
  },
  green: {
    "bg-color": {
      light: colors.green[50].name,
      dark: colors.green[50].name
    },
    "text-color": {
      light: colors.gray["05"].name,
      dark: colors.green[20].name
    }
  },
  lime: {
    "bg-color": {
      light: colors.lime[50].name,
      dark: colors.lime[50].name
    },
    "text-color": {
      light: colors.gray["05"].name,
      dark: colors.lime[20].name
    },
    hover: {
      "bg-color": {
        light: colors.lime[40].name,
        dark: colors.lime[60].name
      }
    },
    active: {
      "bg-color": {
        light: colors.lime[30].name,
        dark: colors.lime[70].name
      }
    }
  },
  pink: {
    "bg-color": {
      light: colors.pink[50].name,
      dark: colors.pink[50].name
    },
    "text-color": {
      light: colors.gray["05"].name,
      dark: colors.pink[20].name
    },
    hover: {
      "bg-color": {
        light: colors.pink[40].name,
        dark: colors.pink[60].name
      }
    },
    active: {
      "bg-color": {
        light: colors.pink[30].name,
        dark: colors.pink[70].name
      }
    }
  },
  purple: {
    "bg-color": {
      light: colors.purple[50].name,
      dark: colors.purple[50].name
    },
    "text-color": {
      light: colors.gray["05"].name,
      dark: colors.purple[20].name
    }
  },
  violet: {
    "bg-color": {
      light: colors.violet[50].name,
      dark: colors.violet[50].name
    },
    "text-color": {
      light: colors.gray["05"].name,
      dark: colors.violet[20].name
    },
    hover: {
      "bg-color": {
        light: colors.violet[40].name,
        dark: colors.violet[60].name
      }
    },
    active: {
      "bg-color": {
        light: colors.violet[30].name,
        dark: colors.violet[70].name
      }
    }
  },
  mint: {
    "bg-color": {
      light: colors.mint[50].name,
      dark: colors.mint[50].name
    },
    "text-color": {
      light: colors.gray["05"].name,
      dark: colors.mint[20].name
    },
    hover: {
      "bg-color": {
        light: colors.mint[40].name,
        dark: colors.mint[60].name
      }
    },
    active: {
      "bg-color": {
        light: colors.mint[30].name,
        dark: colors.mint[70].name
      }
    }
  },
  yellow: {
    "bg-color": {
      light: colors.yellow[50].name,
      dark: colors.yellow[50].name
    },
    "text-color": {
      light: colors.gray["05"].name,
      dark: colors.yellow[20].name
    }
  },
  gold: {
    "bg-color": {
      light: colors.gold[50].name,
      dark: colors.gold[50].name
    },
    "text-color": {
      light: colors.gray["05"].name,
      dark: colors.gold[20].name
    },
    hover: {
      "bg-color": {
        light: colors.gold[40].name,
        dark: colors.gold[60].name
      }
    },
    active: {
      "bg-color": {
        light: colors.gold[30].name,
        dark: colors.gold[70].name
      }
    }
  },
  red: {
    "bg-color": {
      light: colors.red[50].name,
      dark: colors.red[50].name
    },
    "text-color": {
      light: colors.gray["05"].name,
      dark: colors.red[20].name
    }
  },
  darkred: {
    "bg-color": {
      light: colors.red[60].name,
      dark: colors.red[70].name
    },
    "text-color": {
      light: colors.gray["05"].name,
      dark: colors.gray[10].name
    }
  },
  orange: {
    "bg-color": {
      light: colors.orange[50].name,
      dark: colors.orange[50].name
    },
    "text-color": {
      light: colors.gray["05"].name,
      dark: colors.orange[20].name
    },
    hover: {
      "bg-color": {
        light: colors.orange[40].name,
        dark: colors.orange[60].name
      }
    },
    active: {
      "bg-color": {
        light: colors.orange[30].name,
        dark: colors.orange[70].name
      }
    }
  },
  cyan: {
    "bg-color": {
      light: colors.cyan[50].name,
      dark: colors.cyan[50].name
    },
    "text-color": {
      light: colors.gray["05"].name,
      dark: colors.cyan[20].name
    }
  },
  unreadcount: {
    "bg-color": {
      light: colors.red[60].name,
      dark: colors.red[70].name
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
      light: colors.gray[50].name,
      dark: colors.gray[50].name
    },
    "text-color": {
      light: colors.gray["05"].name,
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
