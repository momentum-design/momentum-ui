const colors = require("./colors");

const button = {
    primary: {
        lightUi: colors.blue[60].hex,
        darkUi: colors.blue[60].hex,
        hover: {
            lightUi: colors.blue[70].hex,
            darkUi: colors.blue[70].hex,
        },
        pressed: {
            lightUi: colors.blue[80].hex,
            darkUi: colors.blue[80].hex,  
        },
        outline: {
            lightUi: colors.blue[70].hex,
            darkUi: colors.blue[40].hex,
        },
    },
    secondary: {
        lightUi: colors.gray[20].hex,
        darkUi: colors.gray[60].hex,
        hover: {
            lightUi: colors.gray[30].hex,
            darkUi: colors.gray[70].hex,
        },
        pressed: {
            lightUi: colors.gray[40].hex,
            darkUi: colors.gray[80].hex,  
        },
        outline: {
            lightUi: colors.gray[70].hex,
            darkUi: colors.gray[40].hex,
        },
    },
    green: {
        lightUi: colors.green[60].hex,
        darkUi: colors.green[60].hex,
        hover: {
            lightUi: colors.green[70].hex,
            darkUi: colors.green[70].hex,
        },
        pressed: {
            lightUi: colors.green[80].hex,
            darkUi: colors.green[80].hex,  
        },
        outline: {
            lightUi: colors.green[70].hex,
            darkUi: colors.green[40].hex,
        },
    },
    white: {
        lightUi: colors.white.default.hex,
        hover: {
            lightUi: colors.gray['05'].hex,
        },
        pressed: {
            lightUi: colors.gray[10].hex,
        },
    },
    darkGray: {
        darkUi: colors.gray[80].hex,
        hover: {
            darkUi: colors.gray[90].hex,
        },
        pressed: {
            darkUi: colors.gray[95].hex,  
        },
    },
    red: {
        lightUi: colors.red[60].hex,
        darkUi: colors.red[60].hex,
        hover: {
            lightUi: colors.red[70].hex,
            darkUi: colors.red[70].hex,
        },
        pressed: {
            lightUi: colors.red[80].hex,
            darkUi: colors.red[80].hex,  
        },
        outline: {
            lightUi: colors.red[70].hex,
            darkUi: colors.red[40].hex,
        },
    },
    disabled: {
        lightUi: colors.gray[20].hex,
        darkUi: colors.gray[90].hex,
    },
    focusRing: {
        lightUi: colors.blue[60].hex,
        darkUi: colors.blue[40].hex,
    },
    text: {
        primary: {
            lightUi: colors.gray['05'].hex,
            darkUi: colors.gray['05'].hex,  
            outline: {
                lightUi: colors.blue[70].hex,
                darkUi: colors.blue[40].hex,  
            },
        },
        secondary: {
            lightUi: colors.gray[100].hex,
            darkUi: colors.gray[100].hex,  
            outline: {
                lightUi: colors.blue[70].hex,
                darkUi: colors.blue[40].hex,  
            },
        },
        green: {
            outline: {
                lightUi: colors.green[70].hex,
                darkUi: colors.green[40].hex,  
            },
        },
        red: {
            outline: {
                lightUi: colors.red[70].hex,
                darkUi: colors.red[40].hex,  
            },
        },
        disabled: {
            lightUi: colors.gray[40].hex,
            darkUi: colors.gray[70].hex,
        },
    },
};
  
  module.exports = button;
  