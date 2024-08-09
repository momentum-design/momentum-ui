/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const slider = {
  prefix: "mdv2",
  component: "scrollbar",
  background: {
    track: {
      common: "$mds-color-theme-background-primary-active"
    },
    indicator: {
      common: "$mds-color-theme-scrollbar-button-normal"
    },
    hover: {
      indicator: {
        common: "$mds-color-theme-scrollbar-button-hover"
      }
    },
    active: {
      indicator: {
        common: "$mds-color-theme-scrollbar-button-pressed"
      }
    },
    disabled: {
      indicator: {
        common: "$mds-color-theme-scrollbar-background-secondary-normal"
      }
    }
  }
};

module.exports = slider;
