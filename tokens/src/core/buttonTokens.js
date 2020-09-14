const colors = require("./colors");

const buttonTokens = {
  primary: {
    baseTokenName: "button-primary",
    light: {
      normal: {
        name: colors.blue[60].name,
        hex: colors.blue[60].hex
      },
      hover: {
        name: colors.blue[70].name,
        hex: colors.blue[70].hex
      },
      pressed: {
        name: colors.blue[80].name,
        hex: colors.blue[80].hex
      },
      outline: {
        name: colors.blue[70].name,
        hex: colors.blue[70].hex
      },
      "outline-text": {
        name: colors.blue[70].name,
        hex: colors.blue[70].hex
      },
      text: {
        name: colors.gray["05"].name,
        hex: colors.gray["05"].hex
      }
    },
    dark: {
      normal: {
        name: colors.blue[60].name,
        hex: colors.blue[60].hex
      },
      hover: {
        name: colors.blue[70].name,
        hex: colors.blue[70].hex
      },
      pressed: {
        name: colors.blue[80].name,
        hex: colors.blue[80].hex
      },
      outline: {
        name: colors.blue[40].name,
        hex: colors.blue[40].hex
      },
      "outline-text": {
        name: colors.blue[40].name,
        hex: colors.blue[40].hex
      },
      text: {
        name: colors.gray["05"].name,
        hex: colors.gray["05"].hex
      }
    },
  },
  secondary: {
    baseTokenName: "button-secondary",
    light: {
      normal: {
        name: colors.gray[20].name,
        hex: colors.gray[20].hex
      },
      hover: {
        name: colors.gray[30].name,
        hex: colors.gray[30].hex
      },
      pressed: {
        name: colors.gray[40].name,
        hex: colors.gray[40].hex
      },
      outline: {
        name: colors.gray[70].name,
        hex: colors.gray[70].hex
      },
      "outline-text": {
        name: colors.blue[70].name,
        hex: colors.blue[70].hex
      },
      text: {
        name: colors.gray[100].name,
        hex: colors.gray[100].hex
      }
    },
    dark: {
      normal: {
        name: colors.gray[60].name,
        hex: colors.gray[60].hex
      },
      hover: {
        name: colors.gray[70].name,
        hex: colors.gray[70].hex
      },
      pressed: {
        name: colors.gray[80].name,
        hex: colors.gray[80].hex
      },
      outline: {
        name: colors.gray[40].name,
        hex: colors.gray[40].hex
      },
      "outline-text": {
        name: colors.blue[40].name,
        hex: colors.blue[40].hex
      },
      text: {
        name: colors.gray["05"].name,
        hex: colors.gray["05"].hex
      }
    },
  },
  join: {
    baseTokenName: "button-join",
    light: {
      normal: {
        name: colors.green[60].name,
        hex: colors.green[60].hex
      },
      hover: {
        name: colors.green[70].name,
        hex: colors.green[70].hex
      },
      pressed: {
        name: colors.green[80].name,
        hex: colors.green[80].hex
      },
      outline: {
        name: colors.green[70].name,
        hex: colors.green[70].hex
      },
      "outline-text": {
        name: colors.green[70].name,
        hex: colors.green[70].hex
      },
      text: {
        name: colors.green["05"].name,
        hex: colors.green["05"].hex
      }
    },
    dark: {
      normal: {
        name: colors.green[60].name,
        hex: colors.green[60].hex
      },
      hover: {
        name: colors.green[70].name,
        hex: colors.green[70].hex
      },
      pressed: {
        name: colors.green[80].name,
        hex: colors.green[80].hex
      },
      outline: {
        name: colors.green[40].name,
        hex: colors.green[40].hex
      },
      "outline-text": {
        name: colors.green[40].name,
        hex: colors.green[40].hex
      },
      text: {
        name: colors.green["05"].name,
        hex: colors.green["05"].hex
      }
    },
  },
  cancel: {
    baseTokenName: "button-cancel",
    light: {
      normal: {
        name: colors.red[60].name,
        hex: colors.red[60].hex
      },
      hover: {
        name: colors.red[70].name,
        hex: colors.red[70].hex
      },
      pressed: {
        name: colors.red[80].name,
        hex: colors.red[80].hex
      },
      outline: {
        name: colors.red[70].name,
        hex: colors.red[70].hex
      },
      "outline-text": {
        name: colors.red[70].name,
        hex: colors.red[70].hex
      },
      text: {
        name: colors.red["05"].name,
        hex: colors.red["05"].hex
      }
    },
    dark: {
      normal: {
        name: colors.red[60].name,
        hex: colors.red[60].hex
      },
      hover: {
        name: colors.red[70].name,
        hex: colors.red[70].hex
      },
      pressed: {
        name: colors.red[80].name,
        hex: colors.red[80].hex
      },
      outline: {
        name: colors.red[40].name,
        hex: colors.red[40].hex
      },
      "outline-text": {
        name: colors.red[40].name,
        hex: colors.red[40].hex
      },
      text: {
        name: colors.red["05"].name,
        hex: colors.red["05"].hex
      }
    },
  },
  ghost: {
    baseTokenName: "button-ghost",
    light: {
      normal: {
        name: "",
        hex: ""
      },
      hover: {
        name: colors.gray[30].name,
        hex: colors.gray[30].hex
      },
      pressed: {
        name: colors.gray[40].name,
        hex: colors.gray[40].hex
      },
      text: {
        name: colors.gray[100].name,
        hex: colors.gray[100].hex
      }
    },
    dark: {
      normal: {
        name: "",
        hex: ""
      },
      hover: {
        name: colors.gray[70].name,
        hex: colors.gray[70].hex
      },
      pressed: {
        name: colors.gray[80].name,
        hex: colors.gray[80].hex
      },
      text: {
        name: colors.gray["05"].name,
        hex: colors.gray["05"].hex
      }
    },
  },
  disabled: {
    baseTokenName: "button-disabled",
    light: {
      normal: {
        name: colors.blue[20].name,
        hex: colors.blue[20].hex
      },
      text: {
        name: colors.gray[40].name,
        hex: colors.gray[40].hex
      }
    },
    dark: {
      normal: {
        name: colors.blue[90].name,
        hex: colors.blue[90].hex
      },
      text: {
        name: colors.gray[70].name,
        hex: colors.gray[70].hex
      }
    },
  },
  focusRing: {
    baseTokenName: "button-focusRing",
    light: {
      normal: {
        name: colors.blue[60].name,
        hex: colors.blue[60].hex
      }
    },
    dark: {
      normal: {
        name: colors.blue[40].name,
        hex: colors.blue[40].hex
      }
    },
  },
};

module.exports = buttonTokens;