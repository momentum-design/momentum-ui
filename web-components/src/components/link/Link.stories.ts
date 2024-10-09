/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import "@/components/link/Link";
import { ThemeNameValues } from "@/components/theme/Theme";
import type { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-element";
import { linkColor, linkRole, linkTag } from "./Link"; // Keep type import as a relative path

const render = (args: Args) => html`
  <md-theme class="theme-toggle" id="link" ?darkTheme=${args.darkTheme} theme=${args.theme}>
    <md-link
      .href=${args.href}
      .ariaLabel=${args.ariaLabel}
      .ariaRole=${args.role as any}
      .tag=${args.tag as any}
      .target="${args.target}"
      .color="${args.color}"
      ?disabled=${args.disabled}
      ?inline=${args.inline}
      >Default Link</md-link
    >
  </md-theme>
`;

export const Link: StoryObj = {
  args: {
    theme: "lumos",
    darkTheme: false,
    href: "http://google.com",
    tag: "",
    disabled: false,
    inline: false,
    target: "_self",
    color: "blue",
    ariaLabel: "Link Storybook",
    role: ""
  },
  render: render
};

const meta: Meta = {
  title: "Components/Link",
  component: "md-link",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean" },
    tag: { control: { type: "select", options: linkTag } },
    color: { control: { type: "select", options: linkColor } },
    role: { control: { type: "select", options: linkRole } }
  },
  parameters: {
    a11y: {
      element: "md-link"
    }
  }
};

export default meta;
