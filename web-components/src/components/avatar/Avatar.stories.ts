/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/avatar/Avatar";
import "@/components/avatar/CompositeAvatar";
import { avatarColorOptions } from "@/utils/enums";
import type { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { AvatarSize, AvatarType, ChannelState, ChannelStyle } from "./Avatar.constants";
import mdx from "./Avatar.mdx";

const compositeAvatarSize = [0, 18, 24, 28, 36, 40, 44, 52, 56, 72, 80, 84] as const;

export const Avatar: StoryObj = {
  args: {
    size: 32,
    title: "Rachell Harris",
    label: "Avatar",
    src: "https://4b4dc97add6b1dcc891a-54bf3b4e4579920861d23cc001530c2a.ssl.cf1.rackcdn.com/V1~b33cb17c-42e3-41ac-a045-497e4002646c~b18d4572b17a4e98a16708797343ee7a~1600",
    customUrl: false,
    iconName: "bot-bold",
    customImage: false,
    newMomentum: true
  },
  render: (args: Args) => {
    if (args.composite) {
      return html`
        <md-composite-avatar .size=${args.compositeAvatarSizes}>
          <md-avatar title="Anthony Russell" type="dnd" has-notification alt="Avatar"></md-avatar>
          <md-avatar type="typing" title="Alyson Hoagland Pace" alt="Avatar"></md-avatar>
        </md-composite-avatar>
      `;
    } else {
      return html`
        <md-avatar
          title=${args.title}
          alt=${args.title}
          icon-name=${args.iconName}
          label=${args.label}
          type=${args.type}
          src="${args.customUrl ? `${args.src}` : ""}"
          color=${args.color}
          size=${args.size}
          channelState=${args.channelState}
          channelStyle=${args.channelStyle}
          ?has-notification=${args.hasNotification}
          ?newMomentum=${args.newMomentum}
        >
          ${args.customImage ? html` <img width="100" height="100" src=${args.src} /> ` : ``}
        </md-avatar>
      `;
    }
  }
};

const meta: Meta = {
  title: "Components/Avatar",
  component: "md-avatar",
  argTypes: {
    renderIsTyping: { table: { disable: true } },
    avatarContent: { table: { disable: true } },
    type: { control: { type: "select" }, options: AvatarType },
    color: { control: { type: "select" }, options: avatarColorOptions },
    size: { control: { type: "select" }, options: AvatarSize, defaultValue: 40 },
    compositeAvatarSizes: { control: { type: "select" }, options: compositeAvatarSize },
    customUrl: { control: "boolean" },
    customImage: { control: "boolean" },
    channelState: { control: { type: "select" }, options: ChannelState },
    channelStyle: { control: { type: "select" }, options: ChannelStyle }
  },
  parameters: {
    a11y: {
      element: "md-avatar"
    },
    docs: {
      page: mdx
    }
  }
};

export default meta;
