/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const input = {
  prefix: "lm",
  component: "input",
  default: {
    "bg-color": {
      light: colors.white[100].name,
      dark: colors.gray[100].name
    },
    "text-color": {
      light: colors.gray[100].name,
      dark: colors.gray["05"].name
    },
    "border-color": {
      light: colors.gray[30].name,
      dark: colors.gray[80].name
    },
    "placeholder-color": {
      light: colors.gray[70].name,
      dark: colors.gray[40].name
    },
    hover: {
      "bg-color": {
        light: colors.gray[20].name,
        dark: colors.gray[90].name
      }
    },
    "read-only": {
      "bg-color": {
        light: colors.gray[10].name,
        dark: colors.gray[90].name
      }
    },
    focus: {
      "border-color": {
        light: colors.blue[60].name,
        dark: colors.blue[40].name
      }
    },
    pressed: {
      "bg-color": {
        light: colors.gray[30].name,
        dark: colors.gray[80].name
      },
      "border-color": {
        light: colors.gray[40].name,
        dark: colors.gray[70].name
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
    },
    new: {
      "border-color": {
        light: colors.gray[30].name,
        dark: colors.gray[80].name
      },
      "focus-border-color": {
        light: colors.gray[30].name,
        dark: colors.gray[80].name
      },
      "disabled-color": {
        light: colors.gray[20].name,
        dark: colors.gray[90].name
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
  error: {
    "bg-color": {
      light: colors.red[10].name,
      dark: colors.red[90].name
    },
    "border-color": {
      light: colors.red[50].name,
      dark: colors.red[50].name
    },
    "text-color": {
      light: colors.gray[100].name,
      dark: colors.gray["05"].name
    },
    "message-text-color": {
      light: colors.red[70].name,
      dark: colors.red[50].name
    },
    hover: {
      "bg-color": {
        light: colors.red[20].name,
        dark: colors.red[80].name
      }
    },
    pressed: {
      "bg-color": {
        light: colors.red[30].name,
        dark: colors.red[70].name
      }
    }
  },
  success: {
    "border-color": {
      light: colors.green[50].name,
      dark: colors.green[40].name
    }
  },
  warning: {
    "border-color": {
      light: colors.yellow[50].name,
      dark: colors.yellow[40].name
    }
  },
  filled: {
    "bg-color": {
      light: colors.gray[10].name,
      dark: colors.gray[90].name
    },
    disabled: {
      "bg-color": {
        light: colors.gray[10].name,
        dark: colors.gray[90].name
      }
    },
    hover: {
      "bg-color": {
        light: colors.gray[20].name,
        dark: colors.gray[70].name
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

module.exports = input;
