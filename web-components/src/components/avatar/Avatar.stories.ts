/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/avatar/Avatar";
import { Avatar as AvatarComponent } from "@/components/avatar/Avatar";
import "@/components/avatar/CompositeAvatar";
import { avatarColorOptions } from "@/utils/enums";
import type { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { AvatarSize, AvatarState, AvatarStyle, AvatarType } from "./Avatar.constants";

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
          state=${args.state}
          avatar-style=${args.avatarStyle}
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
    state: { control: { type: "select" }, options: AvatarState },
    avatarStyle: { control: { type: "select" }, options: AvatarStyle }
  },
  tags: ["autodocs"],
  parameters: {
    a11y: {
      element: "md-avatar"
    }
  }
};

export default meta;

export const ChannelRenderTypes: StoryObj = {
  render: () => {
    const channelTypes: AvatarComponent.Type[] = [
      "channel-chat",
      "channel-sms-inbound",
      "channel-sms-outbound",
      "channel-email-inbound",
      "channel-email-outbound",
      "channel-call",
      "channel-social",
      "channel-callback",
      "channel-headset",
      "channel-campaign",
      "channel-emoji",
      "channel-webex",
      "channel-fb-messenger",
      "channel-apple-chat",
      "channel-line",
      "channel-twitter-x",
      "channel-viber",
      "channel-whats-app",
      "channel-monitoring",
      "channel-we-chat",
      "channel-spam"
    ];

    return html`
      <div>
        <h3>Icon Avatar Channel with style:table (no Background Color)</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
          ${channelTypes.map((type) => html` <md-avatar title=${type} type=${type} avatar-style="table"></md-avatar> `)}
        </div>

        <h3>Icon Avatar Channel with style:default and state:active (Background Color:white)</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
          ${channelTypes.map(
            (type) => html` <md-avatar title=${type} type=${type} avatar-style="default" state="active"></md-avatar> `
          )}
        </div>

        <h3>Icon Avatar Channel with style:default state:rest (Background Color:dark gray)</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
          ${channelTypes.map(
            (type) => html` <md-avatar title=${type} type=${type} avatar-style="default" state="rest"></md-avatar> `
          )}
        </div>

        <h3>Icon Avatar Channel with Custom Icon</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
          <md-avatar title="Custom Channel" type="channel-custom" avatar-style="table" state="rest">
            <md-icon name="placeholder-filled" iconSet="momentumDesign"></md-icon>
          </md-avatar>
          <md-avatar title="Custom Channel" type="channel-custom" avatar-style="default" state="active">
            <md-icon name="placeholder-filled" iconSet="momentumDesign"></md-icon>
          </md-avatar>
          <md-avatar title="Custom Channel" type="channel-custom" avatar-style="default" state="rest">
            <md-icon name="placeholder-filled" iconSet="momentumDesign"></md-icon>
          </md-avatar>
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: "Renders all channel types in table and default styles, with rest and active states."
      }
    }
  }
};

export const PresenceTypes: StoryObj = {
  render: () => {
    const presenceTypes: AvatarComponent.Type[] = [
      "active",
      "meeting",
      "schedule",
      "call",
      "dnd",
      "presenting",
      "quiet-hours",
      "away",
      "ooo",
      "busy",
      "on-mobile",
      "on-device",
      "on-hold",
      "away-calling",
      "engaged",
      "rona",
      "idle",
      "inactive"
    ];

    return html`
      <div>
        <h3>Presence Types at Size 32</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
          ${presenceTypes.map(
            (type) => html`
              <div style="text-align: center;">
                <md-avatar title=${type} size="32" type=${type} newMomentum></md-avatar>
                <div>${type}</div>
              </div>
            `
          )}
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: "Renders all presence types at size 32 with the `newMomentum` style."
      }
    }
  }
};

export const AvailabilityAvatars: StoryObj = {
  render: () => {
    const channelTypes: AvatarComponent.Type[] = [
      "channel-chat",
      "channel-email-inbound",
      "channel-call",
      "channel-social"
    ];

    return html`
      <div>
        <h3>Channel availability at size 24</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
          ${channelTypes.map(
            (type) => html`
              <div style="text-align: center;">
                <md-avatar title=${type} size="24" type=${type} presence-type=${"active"} newMomentum></md-avatar>
                <div>${type}</div>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
};
