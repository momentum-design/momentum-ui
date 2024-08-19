/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

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
        common: "$mds-color-theme-text-primary-normal"
      },
      "bg-color": {
        common: "$mds-color-theme-button-secondary-normal"
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
    hover: {
      "bg-color": {
        common: "$mds-color-theme-button-secondary-normal"
      }
    }
  }
};

module.exports = datepicker;
