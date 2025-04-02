/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */

const colors = require("@momentum-ui/tokens/dist/colors.json");

const meetingalert = {
  prefix: "lm",
  component: "meeting-alert",
  "text-color": {
    light: colors.gray[90].name,
    dark: colors.gray[90].name
  }
};

module.exports = meetingalert;
