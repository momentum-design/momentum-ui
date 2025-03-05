/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AvatarSize, AvatarType } from "@/components/avatar/Avatar.constants";
import "@/components/chat-message/ChatMessage";
import { avatarColorOptions } from "@/utils/enums";
import { Args, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined";

export default {
  title: "Components/Chat Message",
  component: "md-chat-message",
  argTypes: {
    title: { control: "text" },
    message: { control: "text" },
    selfMode: { control: "boolean" },
    status: { control: "text" },
    selfLabel: { control: "text" },
    avatarType: { control: { type: "select" }, options: AvatarType },
    avatarColor: { control: { type: "select" }, options: avatarColorOptions },
    avatarSize: { control: { type: "select" }, options: AvatarSize }
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
      <md-chat-message
        ?self=${args.selfMode}
        title=${args.title}
        time="11:27AM"
        status=${args.status}
        avatar-type=${ifDefined(args.avatarType)}
        avatar-color=${ifDefined(args.avatarColor)}
        avatar-size=${ifDefined(args.size)}
        self-label=${ifDefined(args.selfLabel)}
      >
        <md-icon slot="custom-content" name="icon-chat"></md-icon>
        <p slot="message">${args.message}</p>
      </md-chat-message>
    `;
  }
};
