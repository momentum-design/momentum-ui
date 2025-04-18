/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/meeting-alert/MeetingAlert";
import { action } from "@storybook/addon-actions";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { MeetingAlertRole } from "./MeetingAlert"; // Keep type import as a relative path
import mdx from "./MeetingAlert.mdx";

const MEETING_ALERT_SRC = "https://api.adorable.io/avatars/285/abott@adorable.png";
const defaultAttendee = [
  `{title: 'J $', src:${MEETING_ALERT_SRC}, alt:'Alt Text'}`,
  `{title: 'Jefe Guadelupe', src:${MEETING_ALERT_SRC}, alt:'Alt Text'}`
];

const meta: Meta = {
  title: "Components/Meeting Alerts",
  component: "md-meeting-alert",
  argTypes: {
    attendees: {
      description:
        "Attendees story is limited, the array() only accepts and array of strings where as the property expects an array of objects"
    },
    snoozeAriaLabel: { table: { disable: true } },
    onKeyDown: { table: { disable: true } },
    onSnooze: { table: { disable: true } },
    handleSnooze: { table: { disable: true } },
    handleClose: { table: { disable: true } },
    handleKeyDown: { table: { disable: true } },
    role: { control: { type: "select" }, options: MeetingAlertRole },
    userStyles: { control: "text" },
    withAttendees: { control: "boolean" }
  },
  parameters: {
    a11y: { element: "md-meeting-alert" },
    docs: {
      page: mdx,
      description: { component: "A typical usage of Meeting Alert, with different variations as individual stories" }
    }
  }
};

export default meta;

export const MeetingAlert: StoryObj = {
  args: {
    show: true,
    status: "Webex Teams Status",
    title: "Webex Teams Title",
    attendees: defaultAttendee,
    src: "https://st2.depositphotos.com/4967775/11323/v/950/depositphotos_113235752-stock-illustration-avatar-girls-icon-vector-woman.jpg"
  },
  render: (args: Args) => {
    if (args.withAttendees) {
      return html`
        <md-meeting-alert
          show
          .attendees=${args.attendees}
          status="Queue_Demo7"
          title="Jane Doe"
          src=${MEETING_ALERT_SRC}
          @close=${action("click")}
        >
        </md-meeting-alert>
      `;
    } else {
      return html`
        <md-meeting-alert
          .show=${args.show}
          .closeAriaLabel=${args.closeAriaLabel}
          .snoozeAriaLabel=${args.remindAriaLabel}
          .message=${args.message}
          .status="${args.status}"
          .role="${args.role}"
          .title="${args.title}"
          src=${args.src}
          .userStyles=${args.userStyles}
          @close=${action("click")}
          @snooze=${action("snooze")}
        ></md-meeting-alert>
      `;
    }
  }
};

export const MeetingAlertActionThroughSlot: StoryObj = {
  args: { ...MeetingAlert.args },
  render: (args: Args) => {
    return html`
      <h3>md-meeting-alert action through slot</h3>
      <md-meeting-alert .show=${args.show} .status="${args.status}" .title="${args.title}">
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
    `;
  }
};

export const MeetingAlertImageThroughSlot: StoryObj = {
  args: { ...MeetingAlert.args },
  render: (args: Args) => {
    return html`
      <h3>md-meeting-alert image through slot</h3>
      <md-meeting-alert
        .show=${args.show}
        .status="${args.status}"
        .title="${args.title}"
        userStyles=":host .md-alert { background: red; color: white }"
      >
        <span slot="custom-avatar">
          <img width="40" src=${args.src} />
        </span>
      </md-meeting-alert>
    `;
  }
};

export const MeetingAlertSrcThroughSlot: StoryObj = {
  args: { ...MeetingAlert.args },
  render: (args: Args) => {
    return html`
      <h3>md-meeting-alert src through slot</h3>
      <md-meeting-alert .show=${args.show} .status="${args.status}" .title="${args.title}">
        <span slot="custom-avatar">
          <img width="40'" height="40'" src=${args.src} />
        </span>
      </md-meeting-alert>
    `;
  }
};

export const MeetingAlertThroughSrc: StoryObj = {
  args: { ...MeetingAlert.args },
  render: (args: Args) => {
    return html`
      <h3>md-meeting-alert image through src</h3>
      <md-meeting-alert
        .show=${args.show}
        .status="${args.status}"
        .title="${args.title}"
        .onKeyDown=${() => console.log("passed onKeyDown Func")}
        src=${args.src}
      >
      </md-meeting-alert>
    `;
  }
};
