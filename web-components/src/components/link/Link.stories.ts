/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import "@/components/link/Link";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { linkColor, linkRole, linkTag } from "./Link"; // Keep type import as a relative path

const render = (args: Args) => html`
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
`;

export const Link: StoryObj = {
  args: {
    href: "http://google.com",
    tag: "a",
    disabled: false,
    inline: false,
    target: "_self",
    color: "blue",
    ariaLabel: "Link Storybook",
    role: "link"
  },
  render: render
};

const meta: Meta = {
  title: "Components/Link",
  component: "md-link",
  argTypes: {
    tag: { control: { type: "select" }, options: linkTag },
    color: { control: { type: "select" }, options: linkColor },
    role: { control: { type: "select" }, options: linkRole }
  },
  parameters: {
    a11y: {
      context: "md-link"
    }
  }
};

export default meta;
