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
        light: "$mds-color-theme-outline-theme-normal",
        dark: "$mds-color-theme-outline-theme-normal"
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
        light: colors.blue[50].name,
        dark: colors.blue[50].name
      },
      "checked-icon-color": {
        light: colors.white[60].name,
        dark: colors.white[100].name
      },
      "icon-color": {
        light: colors.gray[100].name,
        dark: colors.gray[40].name
      }
    }
  },
  group: {
    "button-bg-color": {
      light: colors.gray[60].name,
      dark: colors.gray[40].name
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
      light: colors.gray[20].name,
      dark: colors.gray[80].name
    },
    "border-color": {
      light: colors.gray[30].name,
      dark: colors.gray[70].name
    },
    hover: {
      light: colors.gray[40].name,
      dark: colors.gray[80].name
    }
  },
  "group-label": {
    "bg-color": {
      light: colors.white[100].name,
      dark: colors.gray[90].name
    },
    color: {
      light: colors.gray[70].name,
      dark: colors.gray[40].name
    },
    "border-color": {
      light: colors.gray[20].name,
      dark: colors.gray[80].name
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
