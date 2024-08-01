/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const checkbox = {
  prefix: "mdv2",
  component: "checkbox",
  "bg-color": {
    common: "$mds-color-theme-button-secondary-normal"
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
      common: "$mds-color-theme-inverted-button-secondary-hover"
    },
    "border-color": {
      common: "$mds-color-theme-outline-input-normal"
    }
  },
  pressed: {
    "bg-color": {
      common: "$mds-color-theme-inverted-button-secondary-pressed"
    },
    "border-color": {
      common: "$mds-color-theme-outline-input-normal"
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
      common: "$mds-color-theme-control-active-hover"
    },
    "pressed-border-color": {
      common: "$mds-color-theme-control-active-hover"
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
};

module.exports = checkbox;
