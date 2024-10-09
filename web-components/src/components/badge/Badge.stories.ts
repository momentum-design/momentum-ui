/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/badge/Badge";
import "@/components/icon/Icon";
import { ThemeNameValues } from "@/components/theme/Theme";
import { badgeColor } from "@/utils/enums";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-element";

const render = (args: Args) => html`
  <md-theme class="theme-toggle" id="badge" ?darkTheme=${args.darkTheme} theme=${args.theme}>
    <md-badge
      .color=${args.color}
      .bgColor=${args.bgColor}
      .small=${args.small}
      .textColor=${args.textColor}
      .height=${args.height}
      .width=${args.width}
      .circle=${args.circle}
      ?disabled=${args.disabled}
    >
      ${args.icon ? html` <md-icon name="chat-active_16"></md-icon> ` : html` Badge ${args.color} `}
    </md-badge>
  </md-theme>
`;

export const Badge: StoryObj = {
  args: {
    theme: "lumos",
    darkTheme: false,
    color: "blue"
  },
  render: render
};

const meta: Meta = {
  title: "Components/Badge",
  component: "md-badge",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean" },
    color: { control: { type: "select", options: badgeColor } },
    renderBgColor: { table: { disable: true } },
    renderTextColor: { table: { disable: true } },
    renderHeight: { table: { disable: true } },
    renderWidth: { table: { disable: true } },
    getStyles: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-badge"
    }
  }
};

export default meta;
