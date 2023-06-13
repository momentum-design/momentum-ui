/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const audioPlayer = {
  prefix: "lm",
  component: "audio-player",
  background: {
    body: {
      light: colors.gray[10].name,
      dark: colors.gray[80].name
    },
    "progress-bar": {
      light: colors.gray[80].name,
      dark: colors.gray["05"].name
    },
    timeline: {
      light: colors.gray[30].name,
      dark: colors.gray[60].name
    },
    "speed-popup": {
      light: colors.white[100].name,
      dark: colors.gray[90].name,
      hover: {
        light: colors.gray["05"].name,
        dark: colors.gray[70].name
      }
    }
  },
  "font-color": {
    light: colors.gray[100].name,
    dark: colors.gray["05"].name
  },
  "focus-ring": {
    color: {
      light: colors.blue[60].name,
      dark: colors.blue[40].name
    }
  }
};

module.exports = audioPlayer;
