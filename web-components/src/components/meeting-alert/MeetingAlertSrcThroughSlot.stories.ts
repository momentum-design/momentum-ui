/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/meeting-alert/MeetingAlert";
import "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Components/Meeting Alerts",
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

export const MeetingAlertSrcThroughSlot = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const show = boolean("Show", true);
  const src = text("Src", "https://st2.depositphotos.com/4967775/11323/v/950/depositphotos_113235752-stock-illustration-avatar-girls-icon-vector-woman.jpg");
  const status = text("Status", "Webex Teams Status");
  const title = text("Title", "Webex Teams Title");
  
  return html`
    <md-theme class="theme-toggle" id="meeting-alert" ?darkTheme=${darkTheme} ?lumos=${lumos}>
      <h3>md-meeting-alert src through slot</h3>
        <md-meeting-alert 
          .show=${show}
          .status="${status}"
          .title="${title}">
          <span slot="custom-avatar">
            <img width="40'" height="40'" src=${src} />
          </span>
        </md-meeting-alert>
    </md-theme>
  `;
};

