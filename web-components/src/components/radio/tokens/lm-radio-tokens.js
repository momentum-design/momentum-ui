/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const radio = {
  prefix: "lm",
  component: "radio",
  input: {
    "bg-color": {
      light: colors.white[100].name,
      dark: colors.gray[100].name
    },
    "text-color": {
      light: colors.gray[100].name,
      dark: colors.gray["05"].name
    },
    "border-color": {
      light: colors.gray[70].name,
      dark: colors.gray[40].name
    },
    "icon-color": {
      light: colors.white[100].name,
      dark: colors.white[100].name
    },
    hover: {
      "bg-color": {
        light: colors.gray[10].name,
        dark: colors.gray[90].name
      },
      "border-color": {
        light: colors.gray[70].name,
        dark: colors.gray[40].name
      }
    },
    pressed: {
      "bg-color": {
        light: colors.gray[20].name,
        dark: colors.gray[80].name
      },
      "border-color": {
        light: colors.gray[30].name,
        dark: colors.gray[70].name
      }
    },
    disabled: {
      "bg-color": {
        common: "$mds-color-theme-control-inactive-disabled"
      },
      "border-color": {
        common: "$mds-color-theme-outline-primary-disabled"
      },
      "text-color": {
        common: "$mds-color-theme-text-primary-disabled"
      }
    },
    selected: {
      "bg-color": {
        light: colors.blue[50].name,
        dark: colors.blue[40].name
      },
      "border-color": {
        light: colors.blue[50].name,
        dark: colors.blue[40].name
      },
      "hover-bg-color": {
        light: colors.blue[60].name,
        dark: colors.blue[50].name
      },
      "hover-border-color": {
        light: colors.blue[60].name,
        dark: colors.blue[50].name
      },
      "pressed-bg-color": {
        light: colors.blue[70].name,
        dark: colors.blue[60].name
      },
      "pressed-border-color": {
        light: colors.blue[70].name,
        dark: colors.blue[60].name
      }
    },
    "selected-disabled": {
      "bg-color": {
        common: "$mds-color-theme-control-active-disabled"
      },
      "border-color": {
        common: "$mds-color-theme-inverted-text-primary-disabled"
      }
    },
    focus: {
      "border-color": {
        light: colors.theme[70].name,
        dark: colors.theme[70].name
      },
      "shadow-color": {
        light: "0 0 4px 2px transparent",
        dark: "0 0 4px 2px transparent"
      }
    }
  }
};

module.exports = radio;
