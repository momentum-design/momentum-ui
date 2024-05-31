/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const radio = {
  prefix: "mdv2",
  component: "radio",
  input: {
    "bg-color": {
      light: "$mds-color-theme-neutral-text-primary",
      dark: "$mds-color-theme-neutral-text-primary"
    },
    "text-color": {
      light: "$mds-color-theme-neutral-text-primary",
      dark: "$mds-color-theme-neutral-text-primary"
    },
    "border-color": {
      light: colors.gray[50].name,
      dark: colors.gray[70].name
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-neutral-text-primary",
        dark: "$mds-color-theme-neutral-text-primary"
      },
      "border-color": {
        light: colors.gray[20].name,
        dark: colors.gray[80].name
      }
    },
    pressed: {
      "bg-color": {
        light: "$mds-color-theme-neutral-text-primary",
        dark: "$mds-color-theme-neutral-text-primary"
      },
      "border-color": {
        light: colors.gray[30].name,
        dark: colors.gray[70].name
      }
    },
    selected: {
      "bg-color": {
        light: "$mds-color-theme-accent-control-default",
        dark: "$mds-color-theme-accent-control-default"
      },
      "border-color": {
        light: colors.blue[50].name,
        dark: colors.blue[40].name
      },
      "hover-bg-color": {
        light: "$mds-color-theme-accent-control-hover",
        dark: "$mds-color-theme-accent-control-hover"
      },
      "hover-border-color": {
        light: colors.blue[60].name,
        dark: colors.blue[50].name
      },
      "pressed-bg-color": {
        light: "$mds-color-theme-accent-control-pressed",
        dark: "$mds-color-theme-accent-control-pressed"
      },
      "pressed-border-color": {
        light: colors.blue[70].name,
        dark: colors.blue[60].name
      }
    },
    focus: {
      "border-color": {
        light: "$mds-color-theme-accent-control-default",
        dark: "$mds-color-theme-accent-control-default"
      },
      "shadow-color": {
        light: "0 0 4px 2px transparent",
        dark: "0 0 4px 2px transparent"
      }
    }
  }
};

module.exports = radio;
