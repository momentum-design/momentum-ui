/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");
const { inherits } = require("util");

const datepicker = {
  prefix: "mdv2",
  component: "datepicker",
  default: {
    navigation: {
      label: {
        light: "$mds-color-theme-text-primary-normal",
        dark: "$mds-color-theme-text-primary-normal"
      },
      button: {
        light: "$mds-color-theme-text-primary-normal",
        dark: "$mds-color-theme-text-primary-normal"
      }
    },
    days: {
      light: "$mds-color-theme-text-secondary-normal",
      dark: "$mds-color-theme-text-secondary-normal"
    },
    number: {
      color: {
        light: "$mds-color-theme-text-primary-normal",
        dark: "$mds-color-theme-text-primary-normal"
      },
      "bg-color": {
        light: "$mds-color-theme-button-secondary-normal",
        dark: "$mds-color-theme-button-secondary-normal"
      }
    },
    hover: {
      "bg-color": {
        light: "$mds-color-theme-button-secondary-hover",
        dark: "$mds-color-theme-button-secondary-hover"
      }
    }
  },
  invalid: {
    "text-color": {
      light: "$mds-color-theme-text-primary-disabled",
      dark: "$mds-color-theme-text-primary-disabled"
    }
  },
  selected: {
    "text-color": {
      light: "$mds-color-theme-common-text-primary-normal",
      dark: "$mds-color-theme-common-text-primary-normal"
    },
    today: {
      border: {
        light: "1px solid $mds-color-theme-outline-button-normal",
        dark: "1px solid $mds-color-theme-outline-button-normal"
      }
    },
    "bg-color": {
      light: "$mds-color-theme-background-accent-normal",
      dark: "$mds-color-theme-background-accent-normal"
    }
  },
  hover: {
    "bg-color": {
      light: "$mds-color-theme-button-secondary-hover",
      dark: "$mds-color-theme-button-secondary-hover"
    }
  },
  pressed: {
    "bg-color": {
      light: "$mds-color-theme-button-secondary-pressed",
      dark: "$mds-color-theme-button-secondary-pressed"
    }
  },
  range: {
    hover: {
      "bg-color": {
        light: "$mds-color-theme-button-secondary-normal",
        dark: "$mds-color-theme-button-secondary-normal"
      }
    }
  }
};

module.exports = datepicker;
