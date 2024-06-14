/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const progressbar = {
  prefix: "mdv2",
  component: "progress-bar",
  track: {
    "bg-color": {
      light: "$mds-color-theme-control-inactive-normal",
      dark: "$mds-color-theme-inverted-control-inactive-normal"
    }
  },
  indicator: {
    "in-progress": {
      light: "$mds-color-theme-control-active-normal",
      dark: "$mds-color-theme-control-active-normal"
    },
    failed: {
      light: "$mds-color-theme-indicator-attention",
      dark: "$mds-color-theme-indicator-attention"
    },
    complete: {
      light: "$mds-color-theme-indicator-stable",
      dark: "$mds-color-theme-indicator-stable"
    },
    caution: {
      light: "$mds-color-theme-indicator-caution",
      dark: "$mds-color-theme-indicator-caution"
    }
  },
  "border-radius": {
    light: "12px",
    dark: "12px"
  },
  label: {
    "text-color": {
      light: "$mds-color-theme-text-primary-normal",
      dark: "$mds-color-theme-text-primary-normal"
    }
  }
};

module.exports = progressbar;
