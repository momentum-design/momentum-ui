const button = require("./button");
const colors = require("./colors");

const input = {
  prefix: "md",
  component: "input",
  background: {
    color: {
      light: colors.white.default.name,
      dark: colors.gray[100].name
    },
    hover: {
      light: colors.gray[20].name,
      dark: colors.gray[80].name
    },
    pressed: {
      light: colors.gray[30].name,
      dark: colors.gray[70].name
    },
    active: {
      light: colors.gray[20].name,
      dark: colors.gray[80].name
    },
    theme: {
      color: {
        light: colors.theme[60].name,
        dark: colors.theme[40].name
      },
      hover: {
        light: colors.theme[70].name,
        dark: colors.theme[50].name
      },
      pressed: {
        light: colors.theme[80].name,
        dark: colors.theme[60].name
      },
      active: {
        light: colors.theme[80].name,
        dark: colors.theme[60].name
      },
      disabled: {
        light: colors.theme["05"].name,
        dark: colors.theme[90].name
      }
    },
    error: {
      light: colors.red["05"].name,
      dark: colors.red[90].name
    }
  },
  disabled: {
    light: colors.gray[10].name,
    dark: colors.gray[90].name
  },
  focusRing: {
    light: colors.theme[60].name,
    dark: colors.theme[40].name
  },
  outline: {
    color: {
      light: colors.gray[30].name,
      dark: colors.gray[70].name
    },
    active: {
      light: colors.gray[40].name,
      dark: colors.gray[60].name
    },
    error: {
      light: colors.red[50].name,
      dark: colors.red[50].name
    }
  },
  text: {
    primary: {
      light: colors.gray[100].name,
      dark: colors.gray["05"].name
    },
    secondary: {
      light: colors.gray[70].name,
      dark: colors.gray[70].name
    },
    disabled: {
      light: colors.gray[40].name,
      dark: colors.gray[40].name
    },
    error: {
      light: colors.red[70].name,
      dark: colors.red[40].name
    }
  }
}

const textColor = {
  prefix: "md",
  component: "textColor",
  primary: {
    light: colors.gray[100].name,
    dark: colors.gray["05"].name
  },
  secondary: {
    light: colors.gray[70].name,
    dark: colors.gray[40].name
  },
  disabled: {
    light: colors.gray[40].name,
    dark: colors.gray[70].name
  },
  highlight: {
    light: colors.gray[20].name,
    dark: colors.gray[80].name
  },
  hyperlink: {
    color: {
      light: colors.theme[70].name,
      dark: colors.theme[40].name
    },
    hover: {
      light: colors.theme[90].name,
      dark: colors.theme[20].name
    },
    focus: {
      light: colors.theme[70].name,
      dark: colors.theme[40].name
    }
  }
};

const backgrounds = {
  prefix: "md",
  component: "background",
  primary: {
    light: colors.white.default.name,
    dark: colors.gray[100].name
  },
  secondary: {
    light: colors.gray["05"].name,
    dark: colors.gray[95].name
  },
  tertiary: {
    light: colors.gray[10].name,
    dark: colors.gray[90].name
  },
  quaternary: {
    light: colors.gray[20].name,
    dark: colors.gray[80].name
  }
};

const listItem = {
  prefix: "md",
  component: "listItem",
  primary: {
    color: {
      light: 'none',
      dark: 'none'
    },
    hover: {
      light: colors.gray[10].name,
      dark: colors.gray[90].name
    },
    pressed: {
      light: colors.gray[20].name,
      dark: colors.gray[80].name
    },
    active: {
      light: colors.gray[20].name,
      dark: colors.gray[80].name
    }
  },
  secondary: {
    color: {
      light: 'none',
      dark: 'none'
    },
    hover: {
      light: colors.gray[10].name,
      dark: colors.gray[90].name
    },
    pressed: {
      light: colors.gray[20].name,
      dark: colors.gray[80].name
    },
    active: {
      light: colors.gray[20].name,
      dark: colors.gray[80].name
    }
  },
  tertiary: {
    color: {
      light: 'none',
      dark: 'none'
    },
    hover: {
      light: colors.gray[20].name,
      dark: colors.gray[80].name
    },
    pressed: {
      light: colors.gray[30].name,
      dark: colors.gray[70].name
    },
    active: {
      light: colors.gray[30].name,
      dark: colors.gray[70].name
    }
  },
  quaternary: {
    color: {
      light: 'none',
      dark: 'none'
    },
    hover: {
      light: colors.gray[30].name,
      dark: colors.gray[70].name
    },
    pressed: {
      light: colors.gray[40].name,
      dark: colors.gray[60].name
    },
    active: {
      light: colors.gray[40].name,
      dark: colors.gray[60].name
    }
  },
  disabled: {
    light: 'none',
    dark: 'none'
  },
  focusRing: {
    light: colors.blue[60].name,
    dark: colors.theme[40].name
  }
};

const presence = {
  prefix: "md",
  component: "presence",
  busy: {
    light: colors.yellow[40].name,
    dark: colors.yellow[40].name
  },
  doNotDisturb: {
    light: colors.red[60].name,
    dark: colors.red[60].name
  },
  active: {
    light: colors.green[50].name,
    dark: colors.green[50].name
  },
  away: {
    light: colors.gray[30].name,
    dark: colors.gray[30].name
  }
};

const avatars = {
  prefix: "md",
  component: "avatar",
  cobalt: {
    light: colors.cobalt[30].name,
    dark: colors.cobalt[30].name
  },
  cyan: {
    light: colors.cyan[30].name,
    dark: colors.cyan[30].name
  },
  gold: {
    light: colors.gold[30].name,
    dark: colors.gold[30].name
  },
  gray: {
    light: colors.gray[30].name,
    dark: colors.gray[30].name
  },
  lime: {
    light: colors.lime[30].name,
    dark: colors.lime[30].name
  },
  mint: {
    light: colors.mint[30].name,
    dark: colors.mint[30].name
  },
  orange: {
    light: colors.orange[30].name,
    dark: colors.orange[30].name
  },
  pink: {
    light: colors.pink[30].name,
    dark: colors.pink[30].name
  },
  purple: {
    light: colors.purple[30].name,
    dark: colors.purple[30].name
  },
  slate: {
    light: colors.slate[30].name,
    dark: colors.slate[30].name
  },
  violet: {
    light: colors.violet[30].name,
    dark: colors.violet[30].name
  }
};

const alerts = {
  prefix: "md",
  component: "alert",
  background: {
    warning: {
      light: colors.yellow[10].name,
      dark: colors.yellow[80].name
    },
    error: {
      light: colors.red[10].name,
      dark: colors.red[80].name
    },
    theme: {
      light: colors.theme[10].name,
      dark: colors.theme[80].name
    },
    success: {
      light: colors.green[10].name,
      dark: colors.green[80].name
    }
  },
  text: {
    warning: {
      light: colors.yellow[70].name,
      dark: colors.yellow[40].name
    },
    error: {
      light: colors.red[70].name,
      dark: colors.red[40].name
    },
    theme: {
      light: colors.theme[70].name,
      dark: colors.theme[40].name
    },
    success: {
      light: colors.green[70].name,
      dark: colors.green[40].name
    }
  }
};

const separator = {
  prefix: "md",
  component: "separator",
  primary: {
    light: colors.gray[30].name,
    dark: colors.gray[70].name
  },
  secondary: {
    light: colors.gray[40].name,
    dark: colors.gray[60].name
  }
};

const icons = {
  prefix: "md",
  component: "icon",
  primary: {
    light: colors.black.name,
    dark: colors.white.name
  }
};

const semanticColor = {
  buttons: button,
  inputs: input,
  textColor: textColor,
  backgrounds: backgrounds,
  presence: presence,
  alerts: alerts,
  avatars: avatars,
  separator: separator,
  icons: icons
};

module.exports = semanticColor;
