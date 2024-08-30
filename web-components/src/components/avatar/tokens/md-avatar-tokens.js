/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const avatar = {
  prefix: "md",
  component: "avatar",
  letter: {
    "bg-color": {
      light: colors.gray[10].name,
      dark: colors.gray[80].name
    },
    "text-color": {
      light: colors.gray[80].name,
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
  orange: {
    "bg-color": {
      light: colors.orange[50].name,
      dark: colors.orange[50].name
    },
    "text-color": {
      light: colors.gray["05"].name,
      dark: colors.orange[20].name
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
  slate: {
    "bg-color": {
      light: colors.slate[50].name,
      dark: colors.slate[50].name
    },
    "text-color": {
      light: colors.gray["05"].name,
      dark: colors.slate[20].name
    }
  },
  pink: {
    "bg-color": {
      light: colors.pink[50].name,
      dark: colors.pink[80].name
    },
    "text-color": {
      light: colors.gray["05"].name,
      dark: colors.pink[20].name
    }
  },
  cobalt: {
    "bg-color": {
      light: colors.cobalt[50].name,
      dark: colors.cobalt[50].name
    },
    "text-color": {
      light: colors.gray["05"].name,
      dark: colors.cobalt[20].name
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
    }
  },
  "inactive-opacity": {
    common: 0.55
  },
  presence: {
    active: {
      common: colors.green[60].name
    },
    inactive: {
      common: colors.gray[60].name
    },
    engaged: {
      common: colors.yellow[60].name
    },
    dnd: {
      common: colors.red[60].name
    },
    rona: {
      common: colors.red[60].name
    },
    unstable: {
      common: colors.orange[60].name
    }
  }
};

module.exports = avatar;
