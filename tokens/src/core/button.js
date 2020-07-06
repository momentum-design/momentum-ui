const colors = require("./colors");

const button = {
    primary: {
        lightUi: colors.blue[60].name,
        darkUi: colors.blue[60].name,
        hover: {
            lightUi: colors.blue[70].name,
            darkUi: colors.blue[70].name,
        },
        pressed: {
            lightUi: colors.blue[80].name,
            darkUi: colors.blue[80].name,
        },
        outline: {
            lightUi: colors.blue[70].name,
            darkUi: colors.blue[40].name,
        },
    },
    secondary: {
        lightUi: colors.gray[20].name,
        darkUi: colors.gray[60].name,
        hover: {
            lightUi: colors.gray[30].name,
            darkUi: colors.gray[70].name,
        },
        pressed: {
            lightUi: colors.gray[40].name,
            darkUi: colors.gray[80].name,
        },
        outline: {
            lightUi: colors.gray[70].name,
            darkUi: colors.gray[40].name,
        },
    },
    green: {
        lightUi: colors.green[60].name,
        darkUi: colors.green[60].name,
        hover: {
            lightUi: colors.green[70].name,
            darkUi: colors.green[70].name,
        },
        pressed: {
            lightUi: colors.green[80].name,
            darkUi: colors.green[80].name,
        },
        outline: {
            lightUi: colors.green[70].name,
            darkUi: colors.green[40].name,
        },
    },
    white: {
        lightUi: colors.white.default.name,
        hover: {
            lightUi: colors.gray['05'].name,
        },
        pressed: {
            lightUi: colors.gray[10].name,
        },
    },
    darkGray: {
        darkUi: colors.gray[80].name,
        hover: {
            darkUi: colors.gray[90].name,
        },
        pressed: {
            darkUi: colors.gray[95].name,
        },
    },
    red: {
        lightUi: colors.red[60].name,
        darkUi: colors.red[60].name,
        hover: {
            lightUi: colors.red[70].name,
            darkUi: colors.red[70].name,
        },
        pressed: {
            lightUi: colors.red[80].name,
            darkUi: colors.red[80].name,
        },
        outline: {
            lightUi: colors.red[70].name,
            darkUi: colors.red[40].name,
        },
    },
    disabled: {
        lightUi: colors.gray[20].name,
        darkUi: colors.gray[90].name,
    },
    focusRing: {
        lightUi: colors.blue[60].name,
        darkUi: colors.blue[40].name,
    },
    text: {
        primary: {
            lightUi: colors.gray['05'].name,
            darkUi: colors.gray['05'].name,
            outline: {
                lightUi: colors.blue[70].name,
                darkUi: colors.blue[40].name,
            },
        },
        secondary: {
            lightUi: colors.gray[100].name,
            darkUi: colors.gray['05'].name,
            outline: {
                lightUi: colors.blue[70].name,
                darkUi: colors.blue[40].name,
            },
        },
        green: {
            lightUi: colors.gray['05'].name,
            darkUi: colors.gray['05'].name,
            outline: {
                lightUi: colors.green[70].name,
                darkUi: colors.green[40].name,
            },
        },
        red: {
            lightUi: colors.gray['05'].name,
            darkUi: colors.gray['05'].name,
            outline: {
                lightUi: colors.red[70].name,
                darkUi: colors.red[40].name,
            },
        },
        disabled: {
            lightUi: colors.gray[40].name,
            darkUi: colors.gray[70].name,
        },
    },
};
  
  module.exports = button;
  