/* eslint-disable @typescript-eslint/no-require-imports */
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
  white: {
    "bg-color": {
      common: "$mds-color-theme-avatar-glass-active"
    }
  },
  darkgray: {
    "bg-color": {
      common: "$mds-color-theme-avatar-glass-normal"
    }
  },
  self: {
    "bg-color": {
      common: "$mds-color-theme-background-primary-ghost"
    },
    "icon-color": {
      common: "$mds-color-theme-control-active-normal"
    },
    "border-color": {
      common: "$mds-color-theme-outline-primary-normal"
    }
  },
  sms: {
    "icon-color": {
      common: "$mds-color-theme-common-control-share-content-inactive"
    }
  },
  email: {
    "icon-color": {
      common: "$mds-color-theme-common-touchbar-background-violet-normal"
    }
  },
  call: {
    "icon-color": {
      common: "$mds-color-theme-indicator-stable"
    }
  },
  headset: {
    "icon-color": {
      common: "$mds-color-theme-common-whiteboard-pen-purple"
    }
  },
  campaign: {
    "icon-color": {
      common: "$mds-color-theme-common-whiteboard-pen-purple"
    }
  },
  chat: {
    "icon-color": {
      common: "$mds-color-theme-control-active-normal"
    }
  },
  emoji: {
    "icon-color": {
      common: "$mds-color-theme-control-active-normal"
    }
  },
  spam: {
    "bg-color": {
      common: "$mds-color-theme-background-alert-warning-normal"
    },
    "icon-color": {
      common: "$mds-color-theme-indicator-caution"
    }
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
