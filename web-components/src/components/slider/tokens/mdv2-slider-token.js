/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const slider = {
  prefix: "mdv2",
  component: "slider",
  background: {
    selection: {
      light: "$mds-color-theme-control-active-normal",
      dark: "$mds-color-theme-control-active-normal"
    },
    pointer: {
      light: "$mds-color-theme-background-solid-primary-normal",
      dark: "$mds-color-theme-background-solid-primary-normal"
    },
    pointerBorder: {
      light: "$mds-color-theme-outline-primary-normal",
      dark: "$mds-color-theme-outline-primary-normal"
    },
    bar: {
      light: "$mds-color-theme-outline-input-normal",
      dark: "$mds-color-theme-outline-input-normal"
    },

    hover: {
      pointer: {
        light: "$mds-color-theme-background-solid-primary-normal",
        dark: "$mds-color-theme-background-solid-primary-normal"
      }
    },

    disabled: {
      bar: {
        light: "$mds-color-theme-control-inactive-disabled",
        dark: "$mds-color-theme-control-inactive-disabled"
      },
      selection: {
        light: "$mds-color-theme-control-inactive-pressed",
        dark: "$mds-color-theme-control-inactive-pressed"
      },
      pointer: {
        light: "$mds-color-theme-background-solid-tertiary-normal",
        dark: "$mds-color-theme-background-solid-tertiary-normal"
      }
    },

    focus: {
      shadow: {
        light: "none",
        dark: "none"
      }
    },
    label: {
      light: "$mds-color-theme-text-secondary-normal",
      dark: "$mds-color-theme-text-secondary-normal"
    }
  }
};

module.exports = slider;
