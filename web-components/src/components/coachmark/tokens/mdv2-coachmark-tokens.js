/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const coachmark = {
  prefix: "mdv2",
  component: "coachmark",
  default: {
    "bg-color": {
      light: colors.gray["05"].name,
      dark: colors.gray[80].name
    },
    "text-color": {
      light: colors.gray[70].name,
      dark: colors.gray["05"].name
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
  darkred: {
    "bg-color": {
      light: colors.red[60].name,
      dark: colors.red[60].name
    },
    "text-color": {
      light: colors.red[90].name,
      dark: colors.red[30].name
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
  outline: {
    color: {
      light: colors.gray[40].name,
      dark: colors.gray[20].name
    },
    "text-color": {
      light: colors.gray[50].name,
      dark: colors.gray["05"].name
    }
  }
};

module.exports = coachmark;
