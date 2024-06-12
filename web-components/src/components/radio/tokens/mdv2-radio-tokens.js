/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const radio = {
  prefix: "mdv2",
  component: "radio",
  input: {
    "bg-color": {
      light: "$mds-color-theme-neutral-btn-secondary-default",
      dark: "$mds-color-theme-neutral-btn-secondary-default"
    },
    "text-color": {
      light: "$mds-color-theme-neutral-text-primary",
      dark: "$mds-color-theme-neutral-text-primary"
    },
    "border-color": {
      light: "$mds-color-theme-neutral-indicator-default",
      dark: "$mds-color-theme-neutral-indicator-default"
    },
    "icon-color": {
      light: "$mds-color-theme-inverse-neutral-text-primary",
      dark: "$mds-color-theme-inverse-neutral-text-primary"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-neutral-btn-secondary-pressed", //should be hover needs momentum-design/tokesn fix
        dark: "$mds-color-theme-neutral-btn-secondary-pressed"
      },
      "border-color": {
        light: "$mds-color-theme-neutral-indicator-default",
        dark: "$mds-color-theme-neutral-indicator-default"
      }
    },
    pressed: {
      "bg-color": {
        light: "$mds-color-theme-neutral-btn-secondary-pressed",
        dark: "$mds-color-theme-neutral-btn-secondary-pressed"
      },
      "border-color": {
        light: "$mds-color-theme-neutral-indicator-default",
        dark: "$mds-color-theme-neutral-indicator-default"
      }
    },
    selected: {
      "bg-color": {
        light: "$mds-color-theme-accent-control-default",
        dark: "$mds-color-theme-accent-control-default"
      },
      "border-color": {
        light: "$mds-color-theme-accent-control-default",
        dark: "$mds-color-theme-accent-control-default"
      },
      "hover-bg-color": {
        light: "$mds-color-theme-accent-control-hover",
        dark: "$mds-color-theme-accent-control-hover"
      },
      "hover-border-color": {
        light: "$mds-color-theme-accent-control-hover",
        dark: "$mds-color-theme-accent-control-hover"
      },
      "pressed-bg-color": {
        light: "$mds-color-theme-accent-control-pressed",
        dark: "$mds-color-theme-accent-control-pressed"
      },
      "pressed-border-color": {
        light: "$mds-color-theme-accent-control-pressed",
        dark: "$mds-color-theme-accent-control-pressed"
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
