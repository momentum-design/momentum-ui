/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const avatar = {
  prefix: "lm",
  component: "avatar",
  letter: {
    "bg-color": {
      light: colors.gray[10].name,
      dark: colors.gray[80].name
    },
    "text-color": {
      light: colors.gray[90].name,
      dark: colors.gray[10].name
    }
  },
  blue: {
    "bg-color": {
      light: colors.cobalt[20].name,
      dark: colors.cobalt[80].name
    },
    "text-color": {
      light: colors.cobalt[70].name,
      dark: colors.cobalt[20].name
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
      dark: colors.violet[80].name
    },
    "text-color": {
      light: colors.violet[70].name,
      dark: colors.violet[20].name
    }
  },
  mint: {
    "bg-color": {
      light: colors.mint[20].name,
      dark: colors.mint[80].name
    },
    "text-color": {
      light: colors.mint[70].name,
      dark: colors.mint[20].name
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
  orange: {
    "bg-color": {
      light: colors.orange[20].name,
      dark: colors.orange[80].name
    },
    "text-color": {
      light: colors.orange[70].name,
      dark: colors.orange[20].name
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
  slate: {
    "bg-color": {
      light: colors.slate[20].name,
      dark: colors.slate[80].name
    },
    "text-color": {
      light: colors.slate[70].name,
      dark: colors.slate[20].name
    }
  },
  pink: {
    "bg-color": {
      light: colors.pink[20].name,
      dark: colors.pink[80].name
    },
    "text-color": {
      light: colors.pink[70].name,
      dark: colors.pink[20].name
    }
  },
  cobalt: {
    "bg-color": {
      light: colors.cobalt[20].name,
      dark: colors.cobalt[80].name
    },
    "text-color": {
      light: colors.cobalt[70].name,
      dark: colors.cobalt[20].name
    }
  },
  gold: {
    "bg-color": {
      light: colors.gold[20].name,
      dark: colors.gold[80].name
    },
    "text-color": {
      light: colors.gold[70].name,
      dark: colors.gold[20].name
    }
  },
  lime: {
    "bg-color": {
      light: colors.lime[20].name,
      dark: colors.lime[80].name
    },
    "text-color": {
      light: colors.lime[70].name,
      dark: colors.lime[20].name
    }
  },
  "inactive-opacity": {
    common: 0.55
  },
  presence: {
    active: {
      light: colors.green[50].name,
      dark: colors.green[70].name
    },
    inactive: {
      light: colors.gray[50].name,
      dark: colors.gray[80].name
    },
    engaged: {
      light: colors.yellow[50].name,
      dark: colors.yellow[70].name
    },
    dnd: {
      light: colors.red[50].name,
      dark: colors.red[60].name
    },
    rona: {
      light: colors.gray[50].name,
      dark: colors.gray[80].name
    },
    unstable: {
      light: colors.red[50].name,
      dark: colors.red[70].name
    }
  }
};

module.exports = avatar;
