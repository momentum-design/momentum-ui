/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/badge/Badge";
import "@/components/taskitem/TaskItem";
import { action } from "@storybook/addon-actions";
import { Args, StoryObj } from "@storybook/web-components";
import { html } from "lit";

export default {
  title: "Components/Task Item",
  component: "md-task-item",
  argTypes: {
    title: { control: "text" },
    quantity: { control: "number" },
    mediaType: { control: "text" },
    status: { control: "text" },
    queue: { control: "text" },
    message: { control: "text" },
    time: { control: "text" },
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

const render = (args: Args) => {
  return html`
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
        <md-icon name="sms-filled" size="20" iconSet="momentumDesign" color="white-100"></md-icon>
      </md-badge>
      <div>${args.time}</div>
    </md-task-item>
  `;
};

export const TaskItem: StoryObj = {
  args: {
    title: "Mihael Varificantare",
    quantitiy: 12,
    mediaType: "voice",
    status: "conference",
    queue: "IRV_quelle_11",
    time: "00:00"
  },
  render: render
};
