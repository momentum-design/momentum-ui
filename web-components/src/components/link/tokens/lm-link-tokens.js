/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const colors = require("@momentum-ui/tokens/dist/colors.json");

const link = {
  prefix: "lm",
  component: "link",
  default: {
    light: colors.blue[70].name,
    dark: colors.blue[40].name
  },
  hover: {
    light: colors.blue[70].name,
    dark: colors.blue[20].name
  },
  pressed: {
    light: colors.blue[80].name,
    dark: colors.blue[10].name
  },
  focus: {
    light: colors.blue[70].name,
    dark: colors.blue[40].name,

    outline: {
      light: colors.blue[60].name,
      dark: colors.blue[60].name
    }
  },
  disabled: {
    light: colors.gray[40].name,
    dark: colors.gray[70].name
  },
  inverted: {
    common: "$mds-color-theme-inverted-text-accent-normal",

    hover: {
      common: "$mds-color-theme-inverted-text-accent-hover"
    },
    pressed: {
      common: "$mds-color-theme-inverted-text-accent-active"
    },
    focus: {
      common: "$mds-color-theme-inverted-text-accent-normal",

      outline: {
        common: "$mds-color-theme-inverted-text-accent-normal"
      }
    }
  },
  inline: {
    light: colors.red[70].name,
    dark: colors.red[50].name,

    hover: {
      light: colors.red[80].name,
      dark: colors.red[40].name
    },
    pressed: {
      light: colors.red[90].name,
      dark: colors.red[30].name
    },
    focus: {
      light: colors.red[70].name,
      dark: colors.red[50].name
    },
    "font-size__inline": {
      common: "12px"
    }
  },
  "font-size": {
    common: "14px"
  },
  blue: {
    light: colors.blue[50].name,
    dark: colors.blue[50].name,

    hover: {
      light: colors.blue[60].name,
      dark: colors.blue[60].name
    },

    active: {
      light: colors.blue[70].name,
      dark: colors.blue[70].name
    }
  },
  red: {
    light: colors.red[50].name,
    dark: colors.red[50].name,

    hover: {
      light: colors.red[60].name,
      dark: colors.red[60].name
    },

    active: {
      light: colors.red[70].name,
      dark: colors.red[70].name
    }
  },
  green: {
    light: colors.green[50].name,
    dark: colors.green[50].name,

    hover: {
      light: colors.green[60].name,
      dark: colors.green[60].name
    },

    active: {
      light: colors.green[70].name,
      dark: colors.green[70].name
    }
  },
  yellow: {
    light: colors.yellow[50].name,
    dark: colors.yellow[50].name,

    hover: {
      light: colors.yellow[60].name,
      dark: colors.yellow[60].name
    },

    active: {
      light: colors.yellow[70].name,
      dark: colors.yellow[70].name
    }
  },
  orange: {
    light: colors.orange[50].name,
    dark: colors.orange[50].name,

    hover: {
      light: colors.orange[60].name,
      dark: colors.orange[60].name
    },

    active: {
      light: colors.orange[70].name,
      dark: colors.orange[70].name
    }
  }
};

module.exports = link;
