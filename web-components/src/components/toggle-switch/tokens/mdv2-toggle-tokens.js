/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const toggleSwitch = {
  prefix: "mdv2",
  component: "toggle-switch",
  "bg-color": {
    common: "$mds-color-theme-button-secondary-normal"
  },
  "border-color": {
    common: "$mds-color-theme-outline-input-normal"
  },
  "bg-color--hover": {
    common: "$mds-color-theme-button-secondary-hover"
  },
  "bg-color--checked": {
    common: "$mds-color-theme-control-active-normal"
  },
  "bg-color--checked-hover": {
    common: "$mds-color-theme-control-active-hover"
  },
  "bg-color--disabled": {
    common: "$mds-color-theme-button-secondary-disabled"
  },
  "bg-color--disabled--checked": {
    common: "$mds-color-theme-button-secondary-pressed"
  },
  slider: {
    color: {
      common: "$mds-color-theme-text-primary-normal"
    },
    "color--checked": {
      common: "$mds-color-theme-inverted-text-primary-normal"
    },
    "color-disabled": {
      common: "$mds-color-theme-text-primary-disabled"
    },
    "color-disabled--checked": {
      common: "$mds-color-theme-inverted-text-primary-disabled"
    }
  },
  focus: {
    common: "$mds-color-theme-outline-theme-normal",
    dark: "$mds-color-theme-outline-theme-normal"
  }
};

module.exports = toggleSwitch;
