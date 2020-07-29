const colors = require("./colors");

const button = {
  prefix: "md",
  component: "button",
  primary: {
    "bg-color": {
      light: colors.blue[60].name,
      dark: colors.blue[60].name
    },
    "text-color": {
      light: colors.gray["05"].name,
      dark: colors.gray["05"].name
    },
    hover: {
      "bg-color": {
        light: colors.blue[70].name,
        dark: colors.blue[70].name
      }
    },
    pressed: {
      "bg-color": {
        light: colors.blue[80].name,
        dark: colors.blue[80].name
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
      dark: colors.gray[60].name
    },
    "text-color": {
      light: colors.gray[100].name,
      dark: colors.gray["05"].name
    },
    hover: {
      "bg-color": {
        light: colors.gray[30].name,
        dark: colors.gray[70].name
      }
    },
    pressed: {
      "bg-color": {
        light: colors.gray[40].name,
        dark: colors.gray[80].name
      }
    },
    outline: {
      color: {
        light: colors.gray[70].name,
        dark: colors.gray[40].name
      },
      "text-color": {
        light: colors.blue[70].name,
        dark: colors.blue[40].name
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
      dark: colors.white.default.name
    },
    hover: {
      "bg-color": {
        light: colors.gray[10].name,
        dark: colors.gray[10].name
      }
    },
    pressed: {
      "bg-color": {
        light: colors.gray[20].name,
        dark: colors.gray[20].name
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
  "focus-ring": {
    color: {
      light: colors.blue[60].name,
      dark: colors.blue[40].name
    }
  }
};

module.exports = button;
