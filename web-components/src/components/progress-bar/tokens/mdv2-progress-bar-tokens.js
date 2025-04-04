/* eslint-disable no-undef */

const progressbar = {
  prefix: "mdv2",
  component: "progress-bar",
  track: {
    "bg-color": {
      common: "$mds-color-theme-control-indicator-inactive-normal"
    }
  },
  indicator: {
    "in-progress": {
      common: "$mds-color-theme-control-active-normal"
    },
    failed: {
      common: "$mds-color-theme-indicator-attention"
    },
    complete: {
      common: "$mds-color-theme-indicator-stable"
    },
    caution: {
      common: "$mds-color-theme-indicator-caution"
    }
  },
  "border-radius": {
    common: "12px"
  },
  label: {
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    }
  }
};

module.exports = progressbar;
