/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/avatar/Avatar";
import "@/components/avatar/CompositeAvatar";
import { ThemeNameValues } from "@/components/theme/Theme";
import type { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-element";
import { AvatarSize, AvatarType } from "./Avatar.constants";
import mdx from "./Avatar.mdx";

const options = {
  Purple: "purple",
  Mint: "mint",
  Slate: "slate",
  Gold: "gold",
  Lime: "lime",
  Darkmint: "darkmint",
  Green: "green",
  Yellow: "yellow",
  Red: "red",
  Orange: "orange",
  Violet: "violet",
  Cyan: "cyan",
  Cobalt: "cobalt",
  Pink: "pink"
};

const compositeAvatarSize = [0, 18, 24, 28, 36, 40, 44, 52, 56, 72, 80, 84] as const;

const render = (args: Args) => {
  if (args.composite) {
    return html`
      <md-theme class="theme-toggle" id="avatar" ?darkTheme=${args.darkTheme} theme=${args.theme}>
        <md-composite-avatar .size=${args.sizeComos}>
          <md-avatar title="Anthony Russell" type="dnd" has-notification alt="Avatar"></md-avatar>
          <md-avatar type="typing" title="Alyson Hoagland Pace" alt="Avatar"></md-avatar>
        </md-composite-avatar>
      </md-theme>
    `;
  } else {
    return html`
      <md-theme class="theme-toggle" id="avatar" ?darkTheme=${args.darkTheme} theme=${args.theme}>
        <md-avatar
          title=${args.title}
          alt=${args.title}
          icon-name=${args.iconName}
          label=${args.label}
          type=${args.type}
          src="${args.customUrl ? `${args.url}` : ""}"
          color=${args.preDefinedColor}
          size=${args.size}
          ?has-notification=${args.hasNotification}
          ?newMomentum=${args.newMomentum}
        >
          ${args.customImage ? html` <img width="100" height="100" src=${args.url} /> ` : ``}
        </md-avatar>
      </md-theme>
    `;
  }
};

export const Primary: StoryObj = {
  args: {
    theme: "lumos",
    darkTheme: false,
    title: "Rachell Harris",
    label: "Avatar",
    size: 32,
    url: "https://4b4dc97add6b1dcc891a-54bf3b4e4579920861d23cc001530c2a.ssl.cf1.rackcdn.com/V1~b33cb17c-42e3-41ac-a045-497e4002646c~b18d4572b17a4e98a16708797343ee7a~1600"
  }
};

const meta: Meta = {
  title: "Components/Avatar",
  component: "md-avatar",
  render,
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues } },
    darkTheme: { control: "boolean" },
    type: { control: { type: "select", options: AvatarType } },
    preDefinedColor: { control: { type: "select", options } },
    size: { control: { type: AvatarSize } },
    sizeComos: { control: { type: compositeAvatarSize } }
  },
  parameters: {
    a11y: {
      element: "md-avatar"
    },
    docs: {
      page: mdx
    }
  },
  args: Primary.args
};

export default meta;
