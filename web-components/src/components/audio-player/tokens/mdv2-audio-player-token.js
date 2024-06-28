/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const audioPlayer = {
  prefix: "mdv2",
  component: "audio-player",
  background: {
    body: {
      light: "$mds-color-theme-background-solid-secondary-normal",
      dark: "$mds-color-theme-background-solid-secondary-normal"
    },
    "progress-bar": {
      light: "$mds-color-theme-control-active-normal",
      dark: "$mds-color-theme-control-active-normal"
    },
    "buffer-bar": {
      light: "$mds-color-theme-control-indicator-inactive-normal",
      dark: "$mds-color-theme-control-indicator-inactive-normal"
    },
    timeline: {
      light: "$mds-color-theme-control-indicator-inactive-normal",
      dark: "$mds-color-theme-control-indicator-inactive-normal"
    },
    "speed-popup": {
      light: "$mds-color-theme-background-solid-secondary-normal",
      dark: "$mds-color-theme-background-solid-secondary-normal",
      hover: {
        light: "$mds-color-theme-background-primary-hover",
        dark: "$mds-color-theme-background-primary-hover"
      }
    }
  },
  "font-color": {
    light: "$mds-color-theme-text-primary-normal",
    dark: "$mds-color-theme-text-primary-normal"
  },
  "focus-ring": {
    color: {
      light: "$mds-color-theme-outline-theme-normal",
      dark: "$mds-color-theme-outline-theme-normal"
    }
  }
};

module.exports = audioPlayer;
