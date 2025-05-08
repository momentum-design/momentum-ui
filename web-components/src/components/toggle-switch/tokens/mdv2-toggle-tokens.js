/* eslint-disable no-undef */

const toggleSwitch = {
  prefix: "mdv2",
  component: "toggle-switch",
  "bg-color": {
    common: "$mds-color-theme-background-secondary-hover"
  },
  "border-color": {
    common: "$mds-color-theme-outline-input-normal"
  },
  "bg-color--hover": {
    common: "$mds-color-theme-control-inactive-hover"
  },
  "bg-color--pressed": {
    common: "$mds-color-theme-control-inactive-pressed"
  },
  "bg-color--checked": {
    common: "$mds-color-theme-control-active-normal"
  },
  "bg-color--checked-hover": {
    common: "$mds-color-theme-control-active-hover"
  },
  "bg-color--checked-pressed": {
    common: "$mds-color-theme-control-active-pressed"
  },
  "bg-color--disabled": {
    common: "$mds-color-theme-control-active-disabled"
  },
  "bg-color--disabled--checked": {
    common: "$mds-color-theme-control-active-disabled"
  },
  slider: {
    color: {
      common: "$mds-color-theme-common-text-primary-normal"
    },
    "color--checked": {
      common: "$mds-color-theme-common-text-primary-normal"
    },
    "color-disabled": {
      common: "$mds-color-theme-common-text-primary-disabled"
    },
    "color-disabled--checked": {
      common: "$mds-color-theme-common-text-primary-disabled"
    }
  },
  focus: {
    common: "$mds-color-theme-outline-theme-normal",
    dark: "$mds-color-theme-outline-theme-normal"
  }
};

module.exports = toggleSwitch;
