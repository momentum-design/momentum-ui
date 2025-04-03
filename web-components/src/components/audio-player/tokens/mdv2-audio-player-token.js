/* eslint-disable no-undef */

const audioPlayer = {
  prefix: "mdv2",
  component: "audio-player",
  background: {
    body: {
      common: "$mds-color-theme-background-solid-secondary-normal"
    },
    "progress-bar": {
      common: "$mds-color-theme-control-active-normal"
    },
    "buffer-bar": {
      common: "$mds-color-theme-control-indicator-inactive-normal"
    },
    timeline: {
      common: "$mds-color-theme-control-indicator-inactive-normal"
    },
    "speed-popup": {
      common: "$mds-color-theme-background-solid-secondary-normal",
      hover: {
        common: "$mds-color-theme-background-primary-hover"
      }
    }
  },
  "font-color": {
    common: "$mds-color-theme-text-primary-normal"
  },
  "focus-ring": {
    color: {
      common: "$mds-color-theme-outline-theme-normal"
    }
  }
};

module.exports = audioPlayer;
