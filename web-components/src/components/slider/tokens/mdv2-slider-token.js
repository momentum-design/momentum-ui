/* eslint-disable no-undef */

const slider = {
  prefix: "mdv2",
  component: "slider",
  background: {
    selection: {
      common: "$mds-color-theme-control-active-normal"
    },
    pointer: {
      common: "$mds-color-theme-background-solid-primary-normal"
    },
    pointerBorder: {
      common: "$mds-color-theme-outline-primary-normal"
    },
    bar: {
      common: "$mds-color-theme-outline-input-normal"
    },

    hover: {
      pointer: {
        common: "$mds-color-theme-background-solid-primary-normal"
      }
    },

    disabled: {
      bar: {
        common: "$mds-color-theme-control-inactive-disabled"
      },
      selection: {
        common: "$mds-color-theme-control-active-disabled"
      },
      pointer: {
        common: "$mds-color-theme-background-solid-primary-normal"
      }
    },

    focus: {
      shadow: {
        common: "none"
      }
    },
    label: {
      common: "$mds-color-theme-text-secondary-normal"
    }
  }
};

module.exports = slider;
