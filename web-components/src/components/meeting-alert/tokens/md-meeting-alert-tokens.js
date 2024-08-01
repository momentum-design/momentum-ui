/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const colors = require("@momentum-ui/tokens/dist/colors.json");

const meetingalert = {
  prefix: "md",
  component: "meeting-alert",
  "text-color": {
    light: colors.gray[90].name,
    dark: colors.gray[90].name
  }
};

module.exports = meetingalert;
