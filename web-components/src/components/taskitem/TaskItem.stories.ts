/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/badge/Badge";
import "@/components/taskitem/TaskItem";
import { ThemeNameValues } from "@/components/theme/Theme";
import { action } from "@storybook/addon-actions";
import { Args } from "@storybook/web-components";
import { html } from "lit-element";

export default {
  title: "Components/Task Item",
  component: "md-task-item",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean" },
    title: { control: "text", defaultValue: "Mihael Varificantare" },
    quantity: { control: "number", defaultValue: 12 },
    mediaType: { control: "text", defaultValue: "voice" },
    status: { control: "text", defaultValue: "conference" },
    queue: { control: "text", defaultValue: "IRV_quelle_11" },
    message: { control: "text", defaultValue: "" },
    time: { control: "text", defaultValue: "00:00" },
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

export const TaskItem = (args: Args) => {
  return html`
    <md-theme class="theme-toggle" id="taskitem" ?darkTheme=${args.darkTheme} theme=${args.theme}>
      <md-task-item
        mediaType="${args.mediaType}"
        status="${args.status}"
        title="${args.title}"
        queue="${args.queue}"
        quantity="${args.quantity}"
        lastmessage="${args.message}"
        @taskitem-click=${action("click")}
        @taskitem-keydown=${action("keydown")}
      >
        <md-badge slot="task-type" color="darkmint" circle>
          <md-icon name="social-sms" size="20" iconSet="momentumDesign" color="white-100"></md-icon>
        </md-badge>
        <div>${args.time}</div>
      </md-task-item>
    </md-theme>
  `;
};
