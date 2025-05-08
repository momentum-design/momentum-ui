/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const datepicker = {
  prefix: "mdv2",
  component: "datepicker",
  default: {
    navigation: {
      label: {
        common: "$mds-color-theme-text-primary-normal"
      },
      button: {
        common: "$mds-color-theme-text-primary-normal"
      }
    },
    days: {
      common: "$mds-color-theme-text-secondary-normal"
    },
    number: {
      color: {
        common: "$mds-color-theme-text-secondary-normal"
      }
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-button-secondary-hover"
      }
    }
  },
  invalid: {
    "text-color": {
      common: "$mds-color-theme-text-primary-disabled"
    }
  },
  selected: {
    "text-color": {
      common: "$mds-color-theme-common-text-primary-normal"
    },
    today: {
      border: {
        common: "1px solid $mds-color-theme-outline-button-normal"
      }
    },
    "bg-color": {
      common: "$mds-color-theme-background-accent-normal"
    },
    hover: {
      "bg-color": {
        common: "$mds-color-theme-button-accent-hover"
      }
    },
    pressed: {
      "bg-color": {
        common: "$mds-color-theme-button-accent-pressed"
      }
    }
  },
  hover: {
    "bg-color": {
      common: "$mds-color-theme-button-secondary-hover"
    }
  },
  pressed: {
    "bg-color": {
      common: "$mds-color-theme-button-secondary-pressed"
    }
  },
  range: {
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    },
    "bg-color": {
      light: colors.gray[30].name,
      dark: colors.gray[70].name
    },
    hover: {
      "bg-color": {
        light: colors.gray[30].name,
        dark: colors.gray[70].name
      }
    },
    edge: {
      "bg-color": {
        common: "$mds-color-theme-background-accent-normal"
      }
    }
  }
};

module.exports = datepicker;
