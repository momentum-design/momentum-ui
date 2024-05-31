/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const button = {
  prefix: "mdv2",
  component: "button",
  primary: {
    "bg-color": {
      light: "$mds-color-theme-neutral-btn-primary-default",
      dark: "$mds-color-theme-neutral-btn-primary-default"
    },
    "text-color": {
      light: "$mds-color-theme-inverse-neutral-text-primary",
      dark: "$mds-color-theme-inverse-neutral-text-primary"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-neutral-btn-primary-hover",
        dark: "$mds-color-theme-neutral-btn-primary-hover"
      }
    },
    pressed: {
      "bg-color": {
        light: "$mds-color-theme-neutral-btn-primary-pressed",
        dark: "$mds-color-theme-neutral-btn-primary-pressed"
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
      light: colors.gray[20].name,
      dark: colors.gray[80].name
    },
    "text-color": {
      light: colors.gray[100].name,
      dark: colors.gray["05"].name
    },
    hover: {
      "bg-color": {
        light: colors.gray[30].name,
        dark: colors.gray[90].name
      }
    },
    pressed: {
      "bg-color": {
        light: colors.gray[40].name,
        dark: colors.gray[100].name
      }
    },
    outline: {
      color: {
        light: colors.gray[70].name,
        dark: colors.gray[40].name
      },
      "text-color": {
        light: colors.gray[70].name,
        dark: colors.gray[40].name
      }
    }
  },
  green: {
    "bg-color": {
      light: colors.green[60].name,
      dark: colors.green[60].name
    },
    hover: {
      "bg-color": {
        light: colors.green[70].name,
        dark: colors.green[70].name
      }
    },
    pressed: {
      "bg-color": {
        light: colors.green[80].name,
        dark: colors.green[80].name
      }
    },
    outline: {
      color: {
        light: colors.green[70].name,
        dark: colors.green[40].name
      },
      "text-color": {
        light: colors.green[70].name,
        dark: colors.green[40].name
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
      light: colors.red[60].name,
      dark: colors.red[60].name
    },
    hover: {
      "bg-color": {
        light: colors.red[70].name,
        dark: colors.red[70].name
      }
    },
    pressed: {
      "bg-color": {
        light: colors.red[80].name,
        dark: colors.red[80].name
      }
    },
    outline: {
      color: {
        light: colors.red[70].name,
        dark: colors.red[40].name
      },
      "text-color": {
        light: colors.red[70].name,
        dark: colors.red[40].name
      }
    }
  },
  available: {
    "bg-color": {
      light: colors.green["05"].name,
      dark: colors.green[90].name
    },
    hover: {
      "bg-color": {
        light: colors.green[10].name,
        dark: colors.green[80].name
      }
    },
    pressed: {
      "bg-color": {
        light: colors.green[10].name,
        dark: colors.green[80].name
      }
    }
  },
  engaged: {
    "bg-color": {
      light: colors.yellow["05"].name,
      dark: colors.yellow[90].name
    },
    hover: {
      "bg-color": {
        light: colors.yellow[10].name,
        dark: colors.yellow[80].name
      }
    },
    pressed: {
      "bg-color": {
        light: colors.yellow[20].name,
        dark: colors.yellow[70].name
      }
    }
  },
  unavailable: {
    "bg-color": {
      light: colors.red["05"].name,
      dark: colors.red[90].name
    },
    hover: {
      "bg-color": {
        light: colors.red[10].name,
        dark: colors.red[80].name
      }
    },
    pressed: {
      "bg-color": {
        light: colors.red[10].name,
        dark: colors.red[80].name
      }
    }
  },
  idle: {
    "bg-color": {
      light: colors.gray["05"].name,
      dark: colors.gray[90].name
    },
    hover: {
      "bg-color": {
        light: colors.gray[10].name,
        dark: colors.gray[80].name
      }
    },
    pressed: {
      "bg-color": {
        light: colors.gray[10].name,
        dark: colors.gray[80].name
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
    hover: {
      "bg-color": {
        light: colors.gray[10].name,
        dark: colors.gray[90].name
      }
    },
    pressed: {
      "bg-color": {
        light: colors.gray[20].name,
        dark: colors.gray[80].name
      }
    }
  },
  "focus-ring": {
    color: {
      light: colors.blue[60].name,
      dark: colors.blue[40].name
    }
  }
};

module.exports = button;
