/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { withA11y } from "@storybook/addon-a11y";
import { number, select, text, boolean, withKnobs } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';
import { html } from "lit-element";
import "@/components/badge/Badge";
import "@/components/taskitem/TaskItem";
import { ThemeNameValues } from "@/components/theme/Theme";

export default {
  title: "Components/Task Item",
  component: "md-task-item",
  decorators: [withKnobs, withA11y],
  argTypes: {
    selected: { table: { disable: true } },
    renderTaskType: { table: { disable: true } },
    renderStatus: { table: { disable: true } },
    onCornerMove: { table: { disable: true } },
    resizeStyleMap: { table: { disable: true } },
    fullScreen: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-task-item"
    }
  }
};

export const TaskItem = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const theme = select("Theme name", ThemeNameValues, "");
  const title = text("Task Title", "Mihael Varificantare");
  const quantity = number("New Chat Quantity", 12);
  const mediaType = text("type", "voice");
  const status = text("status", "conference");
  const queue = text("queue text", "IRV_quelle_11");
  const message = text("Chat Message", "");
  const time = text("Timer", "00:00");

  return html`
    <md-theme class="theme-toggle" id="taskitem" ?darkTheme=${darkTheme} ?lumos=${lumos} theme=${theme}>
      <md-task-item
        mediaType="${mediaType}"
        status="${status}"
        title="${title}"
        queue="${queue}"
        quantity="${quantity}"
        lastmessage="${message}"
        @taskitem-click=${(action('click'))}
        @taskitem-keydown=${(action('keydown'))}
      >
        <md-badge slot="task-type" color="darkmint" circle>
          <md-icon name="sms_16" color="white-100"></md-icon>
        </md-badge>
        <div>${time}</div>
      </md-task-item>
    </md-theme>
  `;
};
