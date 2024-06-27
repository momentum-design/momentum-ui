/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const radio = {
  prefix: "mdv2",
  component: "radio",
  input: {
    "bg-color": {
      light: "$mds-color-theme-button-secondary-normal",
      dark: "$mds-color-theme-button-secondary-normal"
    },
    "text-color": {
      light: "$mds-color-theme-text-primary-normal",
      dark: "$mds-color-theme-text-primary-normal"
    },
    "border-color": {
      light: "$mds-color-theme-outline-input-normal",
      dark: "$mds-color-theme-outline-input-normal"
    },
    "icon-color": {
      light: "$mds-color-theme-inverted-text-primary-normal",
      dark: "$mds-color-theme-inverted-text-primary-normal"
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-inverted-button-secondary-hover",
        dark: "$mds-color-theme-inverted-button-secondary-hover"
      },
      "border-color": {
        light: "$mds-color-theme-outline-input-normal",
        dark: "$mds-color-theme-outline-input-normal"
      }
    },
    pressed: {
      "bg-color": {
        light: "$mds-color-theme-inverted-button-secondary-pressed",
        dark: "$mds-color-theme-inverted-button-secondary-pressed"
      },
      "border-color": {
        light: "$mds-color-theme-outline-input-normal",
        dark: "$mds-color-theme-outline-input-normal"
      }
    },
    selected: {
      "bg-color": {
        light: "$mds-color-theme-control-active-normal",
        dark: "$mds-color-theme-control-active-normal"
      },
      "border-color": {
        light: "$mds-color-theme-control-active-normal",
        dark: "$mds-color-theme-control-active-normal"
      },
      "hover-bg-color": {
        light: "$mds-color-theme-control-active-hover",
        dark: "$mds-color-theme-control-active-hover"
      },
      "hover-border-color": {
        light: "$mds-color-theme-control-active-hover",
        dark: "$mds-color-theme-control-active-hover"
      },
      "pressed-bg-color": {
        light: "$mds-color-theme-control-active-hover",
        dark: "$mds-color-theme-control-active-hover"
      },
      "pressed-border-color": {
        light: "$mds-color-theme-control-active-hover",
        dark: "$mds-color-theme-control-active-hover"
      }
    },
    focus: {
      "border-color": {
        light: "$mds-color-theme-control-active-normal",
        dark: "$mds-color-theme-control-active-normal"
      },
      "shadow-color": {
        light: "0 0 4px 2px transparent",
        dark: "0 0 4px 2px transparent"
      }
    }
  }
};

module.exports = radio;
