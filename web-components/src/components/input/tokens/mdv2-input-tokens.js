/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const button = {
  prefix: "mdv2",
  component: "input",
  default: {
    "bg-color": {
      light: "$mds-color-theme-neutral-surface-primary-default",
      dark: "$mds-color-theme-neutral-surface-primary-default"
    },
    "text-color": {
      light: "$mds-color-theme-neutral-text-primary",
      dark: "$mds-color-theme-neutral-text-primary"
    },
    "border-color": {
      light: "$mds-color-theme-neutral-border-default",
      dark: "$mds-color-theme-neutral-border-default"
    },
    "placeholder-color": {
      light: "$mds-color-theme-neutral-text-secondary-default",
      dark: "$mds-color-theme-neutral-text-secondary-default"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-neutral-surface-primary-active",
        dark: "$mds-color-theme-neutral-surface-primary-active"
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
        light: "$mds-color-theme-accent-border-default",
        dark: "$mds-color-theme-accent-border-default"
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
      light: "$mds-color-theme-negative-border-default",
      dark: "$mds-color-theme-negative-border-default"
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
  succes: {
    "border-color": {
      light: "$mds-color-theme-positive-border-default",
      dark: "$mds-color-theme-positive-border-default"
    }
  },
  warning: {
    "border-color": {
      light: "$mds-color-theme-warning-border-default",
      dark: "$mds-color-theme-warning-border-default",
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

module.exports = button;
