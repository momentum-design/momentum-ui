/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/meeting-alert/MeetingAlert";
import { ThemeNameValues } from "@/components/theme/Theme";
import { action } from "@storybook/addon-actions";
import { array, boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { MeetingAlertRole } from "./MeetingAlert"; // Keep type import as a relative path
import mdx from "./MeetingAlert.mdx";

export default {
  title: "Components/Meeting Alerts",
  component: "md-meeting-alert",
  decorators: [withKnobs],
  argTypes: {
    attendees: {
      description:
        "Attendees story is limited, the array() only accepts and array of strings wheras the property expects and array of objects"
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
    },
    docs: {
      page: mdx,
      description: {
        component: "A typical usage of Meeting Alert, with different variations as individual stories"
      }
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
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const show = boolean("Show", true);
  const closeAriaLabel = text("Close Aria Label", "Webex Teams aria label");
  const remindAriaLabel = text("Remind Aria Label", "Webex Teams Remind");
  const message = text("Message", "Webex Teams Message");
  const src = text("Src", "https://api.adorable.io/avatars/285/abott@adorable.png");
  const status = text("Status", "Webex Teams Status");
  const title = text("Title", "Webex Teams Title");
  const role = select("Role", MeetingAlertRole, "alert");
  const userStyles = text("UserStyles", " ");
  const withAttendees = boolean("With Attendees", false);

  if (withAttendees) {
    const attendees = array("Attendees", defaultValue);

    return html`
      <md-theme class="theme-toggle" id="meeting-alert" ?darkTheme=${darkTheme} theme=${theme}>
        <md-meeting-alert
          show
          .attendees=${attendees as any}
          status="Queue_Demo7"
          title="Jane Doe"
          src=${MEETING_ALERT_SRC}
          @close=${action("click")}
        >
        </md-meeting-alert>
      </md-theme>
    `;
  } else {
    return html`
      <md-theme class="theme-toggle" id="meeting-alert" ?darkTheme=${darkTheme} theme=${theme}>
        <md-meeting-alert
          .show=${show}
          .closeAriaLabel=${closeAriaLabel}
          .remindAriaLabel=${remindAriaLabel}
          .message=${message}
          .status="${status}"
          .role="${role}"
          .title="${title}"
          src=${src}
          .userStyles=${userStyles}
          @close=${action("click")}
          @snooze=${action("snooze")}
        ></md-meeting-alert>
      </md-theme>
    `;
  }
};

export const MeetingAlertActionThroughSlot = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const show = boolean("Show", true);
  const src = text(
    "Src",
    "https://st2.depositphotos.com/4967775/11323/v/950/depositphotos_113235752-stock-illustration-avatar-girls-icon-vector-woman.jpg"
  );
  const status = text("Status", "Webex Teams Status");
  const title = text("Title", "Webex Teams Title");

  return html`
    <md-theme class="theme-toggle" id="meeting-alert" ?darkTheme=${darkTheme} theme=${theme}>
      <h3>md-meeting-alert action through slot</h3>
      <md-meeting-alert .show=${show} .status="${status}" .title="${title}">
        <md-button
          slot="custom-action"
          ariaLabel="Action"
          circle
          @click=${(e: Event) => {
            console.log("Custom action passed via slot");
            e.stopPropagation();
          }}
          size=${44}
          role="button"
        >
          <md-icon name="icon-alarm_16"></md-icon>
        </md-button>
      </md-meeting-alert>
    </md-theme>
  `;
};

export const MeetingAlertImageThroughSlot = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const show = boolean("Show", true);
  const src = text(
    "Src",
    "https://st2.depositphotos.com/4967775/11323/v/950/depositphotos_113235752-stock-illustration-avatar-girls-icon-vector-woman.jpg"
  );
  const status = text("Status", "Webex Teams Status");
  const title = text("Title", "Webex Teams Title");

  return html`
    <md-theme class="theme-toggle" id="meeting-alert" ?darkTheme=${darkTheme} theme=${theme}>
      <h3>md-meeting-alert image through slot</h3>
      <md-meeting-alert
        .show=${show}
        .status="${status}"
        .title="${title}"
        userStyles=":host .md-alert { background: red; color: white }"
      >
        <span slot="custom-avatar">
          <img width="40" src=${src} />
        </span>
      </md-meeting-alert>
    </md-theme>
  `;
};

export const MeetingAlertSrcThroughSlot = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const show = boolean("Show", true);
  const src = text(
    "Src",
    "https://st2.depositphotos.com/4967775/11323/v/950/depositphotos_113235752-stock-illustration-avatar-girls-icon-vector-woman.jpg"
  );
  const status = text("Status", "Webex Teams Status");
  const title = text("Title", "Webex Teams Title");

  return html`
    <md-theme class="theme-toggle" id="meeting-alert" ?darkTheme=${darkTheme} theme=${theme}>
      <h3>md-meeting-alert src through slot</h3>
      <md-meeting-alert .show=${show} .status="${status}" .title="${title}">
        <span slot="custom-avatar">
          <img width="40'" height="40'" src=${src} />
        </span>
      </md-meeting-alert>
    </md-theme>
  `;
};

export const MeetingAlertThroughSrc = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const show = boolean("Show", true);
  const src = text(
    "Src",
    "https://st2.depositphotos.com/4967775/11323/v/950/depositphotos_113235752-stock-illustration-avatar-girls-icon-vector-woman.jpg"
  );
  const status = text("Status", "Webex Teams Status");
  const title = text("Title", "Webex Teams Title");

  return html`
    <md-theme class="theme-toggle" id="meeting-alert" ?darkTheme=${darkTheme} theme=${theme}>
      <h3>md-meeting-alert image through src</h3>
      <md-meeting-alert
        .show=${show}
        .status="${status}"
        .title="${title}"
        .onKeyDown=${() => console.log("passed onKeyDown Func")}
        src=${src}
      >
      </md-meeting-alert>
    </md-theme>
  `;
};
