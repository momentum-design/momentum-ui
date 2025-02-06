/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/chat-message/ChatMessage";
import { Args, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "Components/Chat Message",
  component: "md-chat-message",
  argTypes: {
    title: { control: "text" },
    message: { control: "text" },
    selfMode: { control: "boolean" },
    status: { control: "text" }
  },
  parameters: {
    a11y: {
      element: "md-chat-message"
    }
  }
};

export const ChatMessage: StoryObj = {
  args: {
    title: "John Doe",
    message: "I have issue with my silencer",
    selfMode: false,
    status: "Sent"
  },
  render: (args: Args) => {
    return html`
      <md-chat-message .self=${args.selfMode} title=${args.title} time="11:27AM" status=${args.status}>
        <md-icon slot="custom-content" name="icon-chat"></md-icon>
        <p slot="message">${args.message}</p>
      </md-chat-message>
    `;
  }
};
