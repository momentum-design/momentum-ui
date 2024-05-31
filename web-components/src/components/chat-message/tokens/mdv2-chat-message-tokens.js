/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const chatMessage = {
  prefix: "mdv2",
  component: "chat-message",
  color: {
    light: colors.gray[100].name,
    dark: colors.gray[40].name
  },
  "color-heading": {
    light: colors.gray[70].name,
    dark: colors.gray[30].name
  }
};

module.exports = chatMessage;
