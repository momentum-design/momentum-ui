/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const combobox = {
  prefix: "mdv2",
  component: "combobox",
  "bg-color": {
    light: "$mds-color-theme-background-solid-primary-normal",
    dark: "$mds-color-theme-background-solid-primary-normal"
  },
  "border-color": {
    light: "$mds-color-theme-outline-input-normal",
    dark: "$mds-color-theme-outline-input-normal"
  },
  "text-color": {
    light: "$mds-color-theme-text-primary-normal",
    dark: "$mds-color-theme-text-primary-normal"
  },
  hover: {
    "bg-color": {
      light: "$mds-color-theme-background-primary-hover",
      dark: "$mds-color-theme-background-primary-hover"
    }
  },
  pressed: {
    "bg-color": {
      light: "$mds-color-theme-background-primary-active",
      dark: "$mds-color-theme-background-primary-active"
    }
  },
  focus: {
    "border-color": {
      light: "$mds-color-theme-outline-theme-normal",
      dark: "$mds-color-theme-outline-theme-normal"
    }
  },
  disabled: {
    "bg-color": {
      light: "$mds-color-theme-background-primary-disabled",
      dark: "$mds-color-theme-background-primary-disabled"
    }
  },
  invalid: {
    "bg-color": {
      light: "$mds-color-theme-background-solid-primary-normal",
      dark: "$mds-color-theme-background-solid-primary-normal"
    },
    "border-color": {
      light: "$mds-color-theme-outline-cancel-normal",
      dark: "$mds-color-theme-outline-cancel-normal"
    }
  },
  dropdown: {
    "bg-color": {
      light: "$mds-color-theme-background-solid-primary-normal",
      dark: "$mds-color-theme-background-solid-primary-normal"
    },
    item: {
      "hover-bg-color": {
        light: "$mds-color-theme-background-primary-hover",
        dark: "$mds-color-theme-background-primary-hover"
      },
      "focus-bg-color": {
        light: "$mds-color-theme-background-primary-active",
        dark: "$mds-color-theme-background-primary-active"
      },
      "focus-border-color": {
        light: "$mds-color-theme-control-active-normal",
        dark: "$mds-color-theme-control-active-normal"
      },
      "select-bg-color": {
        light: "$mds-color-theme-background-primary-active",
        dark: "$mds-color-theme-background-primary-active"
      },
      "select-font-color": {
        light: "$mds-color-theme-text-primary-normal",
        dark: "$mds-color-theme-text-primary-normal"
      },
      "checked-bg-color": {
        light: "$mds-color-theme-control-active-normal",
        dark: "$mds-color-theme-control-active-normal"
      },
      "checked-icon-color": {
        light: "$mds-color-theme-inverted-text-primary-normal",
        dark: "$mds-color-theme-inverted-text-primary-normal"
      },
      "icon-color": {
        light: colors.gray[100].name,
        dark: colors.gray[40].name
      }
    }
  },
  group: {
    "button-bg-color": {
      light: "$mds-color-theme-background-solid-primary-normal",
      dark: "$mds-color-theme-background-solid-primary-normal"
    },
    radius: {
      light: "0.25rem",
      dark: "0.25rem"
    },
    "focus-shadow": {
      light: "0 0 4px 2px transparent",
      dark: "0 0 4px 2px transparent"
    },
    "focus-border": {
      light: "1px solid",
      dark: "1px solid"
    }
  },
  selected: {
    "bg-color": {
      light: "$mds-color-theme-background-alert-default-normal",
      dark: "$mds-color-theme-background-alert-default-normal"
    },
    "border-color": {
      light: "mds-color-theme-background-alert-default-normal",
      dark: "mds-color-theme-background-alert-default-normal"
    },
    hover: {
      light: "$mds-color-theme-background-alert-default-hover",
      dark: "$mds-color-theme-background-alert-default-hover"
    }
  },
  "group-label": {
    "bg-color": {
      light: "$mds-color-theme-background-solid-primary-normal",
      dark: "$mds-color-theme-background-solid-primary-normal"
    },
    color: {
      light: "$mds-color-theme-text-primary-normal",
      dark: "$mds-color-theme-text-primary-normal"
    },
    "border-color": {
      light: "unset",
      dark: "unset"
    }
  },
  placeholder: {
    color: {
      light: "$mds-color-theme-text-secondary-normal",
      dark: "$mds-color-theme-text-secondary-normal"
    }
  }
};

module.exports = combobox;
