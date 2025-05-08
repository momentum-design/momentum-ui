/* eslint-disable no-undef */

const radio = {
  prefix: "mdv2",
  component: "radio",
  input: {
    "bg-color": {
      common: "$mds-color-theme-control-inactive-normal"
    },
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    },
    "border-color": {
      common: "$mds-color-theme-outline-input-normal"
    },
    "icon-color": {
      common: "$mds-color-theme-inverted-text-primary-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-control-inactive-hover"
      },
      "border-color": {
        common: "$mds-color-theme-outline-input-normal"
      }
    },
    pressed: {
      "bg-color": {
        common: "$mds-color-theme-control-inactive-pressed"
      },
      "border-color": {
        common: "$mds-color-theme-outline-input-normal"
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
        common: "$mds-color-theme-control-active-normal"
      },
      "border-color": {
        common: "$mds-color-theme-control-active-normal"
      },
      "hover-bg-color": {
        common: "$mds-color-theme-control-active-hover"
      },
      "hover-border-color": {
        common: "$mds-color-theme-control-active-hover"
      },
      "pressed-bg-color": {
        common: "$mds-color-theme-control-active-pressed"
      },
      "pressed-border-color": {
        common: "$mds-color-theme-control-active-pressed"
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
        common: "$mds-color-theme-control-active-normal"
      },
      "shadow-color": {
        common: "0 0 4px 2px transparent"
      }
    }
  }
};

module.exports = radio;
