/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { array, boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import { action } from '@storybook/addon-actions';
import { html } from "lit-element";
import "@/components/meeting-alert/MeetingAlert";
import { MeetingAlertRole } from "./MeetingAlert"; // Keep type import as a relative path
import "@/components/theme/Theme";

export default {
  title: "Components/Meeting Alert",
  component: "md-meeting-alert",
  decorators: [withKnobs, withA11y],
  argTypes: {
    attendees: {
      description: 'Attendees story is limited, the array() only accepts and array of strings wheras the property expects and array of objects',
    },
    snoozeAriaLabel: { table: { disable: true } },
    onKeyDown: { table: { disable: true } },
    onSnooze: { table: { disable: true } },
    handleSnooze: { table: { disable: true } },
    handleClose: { table: { disable: true } },
    handleKeyDown: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-meeting-alert"
    }
  }
};

const MEETING_ALERT_SRC = "https://api.adorable.io/avatars/285/abott@adorable.png";
const defaultValue = [
    `{title: 'J $', src:${MEETING_ALERT_SRC}, alt:'Alt Text'}`,
    `{title: 'Jefe Guadelupe', src:${MEETING_ALERT_SRC}, alt:'Alt Text'}`
  ];

export const MeetingAlert = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const show = boolean("Show", true);
  const closeAriaLabel = text("Close Aria Label", "Webex Teams aria label");
  const remindAriaLabel = text("Remind Aria Label", "Webex Teams Remind");
  const message = text("Message", "Webex Teams Message");
  const src = text("Src", "https://api.adorable.io/avatars/285/abott@adorable.png");
  const status = text("Status", "Webex Teams Status");
  const title = text("Title", "Webex Teams Title");
  const role = select ("Role", MeetingAlertRole, "alert");
  const userStyles = text("UserStyles", " ");
  const withAttendees = boolean("With Attendees", false);

  if (withAttendees) {
    const attendees = array("Attendees", defaultValue);

    return html`
      <md-theme class="theme-toggle" id="meeting-alert" ?darkTheme=${darkTheme} ?lumos=${lumos}>
        <md-meeting-alert
          show
          .attendees=${attendees as any}
          status="Queue_Demo7"
          title="Jane Doe"
          src=${MEETING_ALERT_SRC}
          @close=${(action('click'))}
        >
        </md-meeting-alert>
      </md-theme>
    `;
  } else {
    return html`
      <md-theme class="theme-toggle" id="meeting-alert" ?darkTheme=${darkTheme} ?lumos=${lumos}>
        <md-meeting-alert
          .show=${show}
          .closeAriaLabel=${closeAriaLabel}
          .remindAriaLabel=${remindAriaLabel}
          .message=${message}
          .status="${status}"
          .role="${role}"
          .title="${title}"
          .src=${src}
          .userStyles=${userStyles}
          @close=${(action('click'))}
          @snooze=${(action('snooze'))}
        ></md-meeting-alert>
      </md-theme>
    `;
  }
};

