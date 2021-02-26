/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const chatMessage = {
  prefix: "md",
  component: "chat-message",
  color: {
    light: colors.gray[95].name,
    dark: colors.gray[30].name
  },
  "color-heading": {
    light: colors.gray[80].name,
    dark: colors.gray[20].name
  }
};

module.exports = chatMessage;
