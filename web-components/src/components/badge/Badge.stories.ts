/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/badge/Badge";
import "@/components/icon/Icon";
import { badgeColor } from "@/utils/enums";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const render = (args: Args) => html`
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
    ${html`Badge ${args.color}`}
  </md-badge>
`;

const renderWithIconAndText = (args: Args) => html`
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
    ${html`
      <md-icon name="call-hold-filled" iconSet="momentumDesign"></md-icon>
      On hold - 00:00
    `}
  </md-badge>
`;

export const Badge: StoryObj = {
  args: {
    color: "blue"
  },
  render: render
};

export const BadgeWithIconAndText: StoryObj = {
  args: {
    color: "status-orange",
    small: true
  },
  render: renderWithIconAndText
};

const meta: Meta = {
  title: "Components/Badge",
  component: "md-badge",
  argTypes: {
    color: { control: { type: "select" }, options: badgeColor },
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
