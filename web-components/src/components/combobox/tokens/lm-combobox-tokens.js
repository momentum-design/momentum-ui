/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const combobox = {
  prefix: "lm",
  component: "combobox",
  "bg-color": {
    light: colors.white[100].name,
    dark: colors.gray[100].name
  },
  "border-color": {
    light: colors.gray[40].name,
    dark: colors.gray[80].name
  },
  "text-color": {
    light: colors.gray[70].name,
    dark: colors.gray[40].name
  },
  hover: {
    "bg-color": {
      light: colors.gray[20].name,
      dark: colors.gray[90].name
    }
  },
  pressed: {
    "bg-color": {
      light: colors.gray[30].name,
      dark: colors.gray[80].name
    }
  },
  focus: {
    "border-color": {
      light: colors.theme[70].name,
      dark: colors.theme[50].name
    }
  },
  disabled: {
    "bg-color": {
      light: colors.gray[10].name,
      dark: colors.gray[90].name
    }
  },
  invalid: {
    "bg-color": {
      light: colors.red[10].name,
      dark: colors.red[90].name
    },
    "border-color": {
      light: colors.red[50].name,
      dark: colors.red[50].name
    }
  },
  dropdown: {
    "bg-color": {
      light: colors.white[100].name,
      dark: colors.gray[90].name
    },
    item: {
      "hover-bg-color": {
        light: "#f44336",
        dark: "#f44336"
      },
      "focus-bg-color": {
        light: "#f44336",
        dark: "#f44336"
      },
      "select-bg-color": {
        light: colors.white[100].name,
        dark: colors.gray[100].name
      },
      "checked-bg-color": {
        light: colors.blue[70].name,
        dark: colors.blue[70].name
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
      light: colors.gray[70].name,
      dark: colors.gray[40].name
    }
  }
};

module.exports = combobox;
