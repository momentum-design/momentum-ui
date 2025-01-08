/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const link = {
  prefix: "mdv2",
  component: "link",
  default: {
    common: "$mds-color-theme-text-accent-normal"
  },
  hover: {
    common: "$mds-color-theme-text-accent-hover"
  },
  pressed: {
    common: "$mds-color-theme-text-accent-active"
  },
  focus: {
    common: "$mds-color-theme-text-accent-normal",

    outline: {
      common: "$mds-color-theme-outline-theme-normal"
    }
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
  disabled: {
    common: "$mds-color-theme-text-primary-disabled"
  },
  inline: {
    common: "$mds-color-theme-text-error-normal",

    hover: {
      common: "$mds-color-theme-text-error-hover"
    },
    pressed: {
      common: "$mds-color-theme-text-error-active"
    },
    focus: {
      common: "$mds-color-theme-text-error-normal"
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
    common: "$mds-color-theme-text-error-normal",

    hover: {
      common: "$mds-color-theme-text-error-hover"
    },
    active: {
      common: "$mds-color-theme-text-error-active"
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
