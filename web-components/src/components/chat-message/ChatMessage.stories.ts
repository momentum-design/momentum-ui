/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AvatarSize, AvatarType } from "@/components/avatar/Avatar.constants";
import "@/components/chat-message/ChatMessage";
import "@/components/tooltip/Tooltip";
import { avatarColorOptions } from "@/utils/enums";
import { Args, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

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
    avatarSize: { control: { type: "select" }, options: AvatarSize },
    iconName: { control: "text" },
    newMomentum: { control: "boolean" },
    isSelected: { control: "boolean" },
    // Disable auto-inferred color control for avatar-color attribute
    "avatar-color": { control: { type: "select" }, options: avatarColorOptions },
    "avatar-size": { control: { type: "select" }, options: AvatarSize },
    "avatar-type": { control: { type: "select" }, options: AvatarType },
    "icon-name": { control: "text" },
    "self-label": { control: "text" }
  },
  parameters: { a11y: { context: "md-chat-message" } }
};

export const ChatMessage: StoryObj = {
  args: {
    title: "John Doe",
    message: "I have issue with my silencer",
    selfMode: false,
    status: "Sent",
    avatarSize: "32",
    isSelected: false
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
        avatar-size=${ifDefined(args.avatarSize)}
        icon-name=${ifDefined(args.iconName)}
        ?newMomentum=${args.newMomentum}
        self-label=${ifDefined(args.selfLabel)}
        ?isSelected=${args.isSelected}
      >
        <span slot="custom-content">
          <md-tooltip message="Content restricted as it violates the company data security policy" placement="top">
            <md-icon name="icon-priority_12"></md-icon>
          </md-tooltip>
        </span>
        <p slot="message">${args.message}</p>
      </md-chat-message>
    `;
  }
};

export const IconAvatar: StoryObj = {
  args: {
    title: "Virtual Agent",
    message: "Hi! I'm your virtual agent. How can I help you today?",
    status: "Sent",
    iconName: "icon-bot-customer-assistant_16",
    newMomentum: false,
    avatarSize: "32"
  },

  render: (args: Args) => {
    return html`
      <md-chat-message
        title=${args.title}
        time="11:27AM"
        status=${args.status}
        icon-name=${ifDefined(args.iconName)}
        ?newMomentum=${args.newMomentum}
        avatar-size=${ifDefined(args.avatarSize)}
      >
        <p slot="message">${args.message}</p>
      </md-chat-message>
    `;
  }
};
