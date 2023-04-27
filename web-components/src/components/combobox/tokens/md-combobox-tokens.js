/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const combobox = {
  prefix: "md",
  component: "combobox",
  "bg-color": {
    light: colors.white[100].name,
    dark: colors.gray[100].name
  },
  "border-color": {
    light: colors.gray[30].name,
    dark: colors.gray[70].name
  },
  "text-color": {
    light: colors.gray[80].name,
    dark: colors.gray[30].name
  },
  hover: {
    "bg-color": {
      light: colors.gray[10].name,
      dark: colors.gray[80].name
    }
  },
  pressed: {
    "bg-color": {
      light: colors.gray[20].name,
      dark: colors.gray[80].name
    }
  },
  focus: {
    "border-color": {
      light: colors.theme[50].name,
      dark: colors.theme[60].name
    }
  },
  disabled: {
    "bg-color": {
      light: colors.gray[10].name,
      dark: colors.gray[80].name
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
      light: colors.white[60].name,
      dark: colors.gray[90].name
    },
    item: {
      "hover-bg-color": {
        light: "#e6f9fc",
        dark: colors.theme[90].name
      },
      "focus-bg-color": {
        light: "#b8f2ff",
        dark: colors.theme[60].name
      },
      "select-bg-color": {
        light: colors.white[60].name,
        dark: colors.gray[90].name
      },
      "checked-bg-color": {
        light: colors.theme[50].name,
        dark: colors.theme[60].name
      },
      "checked-icon-color": {
        light: colors.white[100].name,
        dark: colors.white[60].name
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
      light: "0 0 4px 2px #00a0d1",
      dark: "0 0 4px 2px #00a0d1"
    },
    "focus-border": {
      light: "0px solid",
      dark: "0px solid"
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
    "color": {
      light: colors.gray[70].name,
      dark: colors.gray[40].name
    },
    "border-color": {
      light: colors.gray[20].name,
      dark: colors.gray[80].name
    },
  }
};

module.exports = combobox;
