/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const combobox = {
  prefix: "mdv2",
  component: "combobox",
  "bg-color": {
    common: "$mds-color-theme-background-solid-primary-normal"
  },
  "border-color": {
    common: "$mds-color-theme-outline-input-normal"
  },
  "text-color": {
    common: "$mds-color-theme-text-primary-normal"
  },
  hover: {
    "bg-color": {
      common: "$mds-color-theme-background-primary-hover"
    }
  },
  pressed: {
    "bg-color": {
      common: "$mds-color-theme-background-primary-active"
    }
  },
  focus: {
    "border-color": {
      common: "$mds-color-theme-outline-theme-normal"
    },
    "new-border-color": {
      common: "$mds-color-theme-outline-input-active"
    },
    "bg-color": {
      common: "$mds-color-theme-background-primary-active"
    }
  },
  disabled: {
    "bg-color": {
      common: "$mds-color-theme-background-primary-disabled"
    },
    "border-color": {
      common: "$mds-color-theme-outline-primary-disabled"
    }
  },
  invalid: {
    "bg-color": {
      common: "$mds-color-theme-background-solid-primary-normal"
    },
    "border-color": {
      common: "$mds-color-theme-outline-cancel-normal"
    }
  },
  dropdown: {
    "bg-color": {
      common: "$mds-color-theme-background-solid-primary-normal"
    },
    item: {
      "hover-bg-color": {
        common: "$mds-color-theme-background-primary-hover"
      },
      "focus-bg-color": {
        common: "$mds-color-theme-background-primary-active"
      },
      "focus-border-color": {
        common: "$mds-color-theme-control-active-normal"
      },
      "select-bg-color": {
        common: "$mds-color-theme-background-primary-active"
      },
      "select-font-color": {
        common: "$mds-color-theme-text-primary-normal"
      },
      "selected-bg-color": {
        common: "$mds-color-theme-background-primary-active"
      },
      "checked-bg-color": {
        common: "$mds-color-theme-control-active-normal"
      },
      "checked-icon-color": {
        common: "$mds-color-theme-inverted-text-primary-normal"
      },
      "icon-color": {
        light: colors.gray[100].name,
        dark: colors.gray[40].name
      }
    }
  },
  group: {
    "button-bg-color": {
      common: "$mds-color-theme-background-solid-primary-normal"
    },
    radius: {
      common: "0.25rem"
    },
    "focus-shadow": {
      common: "0 0 4px 2px transparent"
    },
    "focus-border": {
      common: "1px solid"
    }
  },
  selected: {
    "bg-color": {
      common: "$mds-color-theme-background-alert-default-normal"
    },
    "new-bg-color": {
      common: "$mds-color-theme-background-solid-tertiary-normal"
    },
    "border-color": {
      common: "mds-color-theme-background-alert-default-normal"
    },
    "new-border-color": {
      common: "mds-color-theme-inverted-outline-button-normal"
    },
    hover: {
      common: "$mds-color-theme-background-alert-default-hover"
    }
  },
  "group-label": {
    "bg-color": {
      common: "$mds-color-theme-background-solid-primary-normal"
    },
    color: {
      common: "$mds-color-theme-text-primary-normal"
    },
    "border-color": {
      common: "unset"
    }
  },
  placeholder: {
    color: {
      common: "$mds-color-theme-text-secondary-normal"
    }
  },
  "primary-button": {
    "bg-color": {
      common: "$mds-color-theme-background-solid-primary-normal"
    },
    test: {
      common: "$mds-color-theme-inverted-text-primary-normal"
    }
  }
};

module.exports = combobox;
