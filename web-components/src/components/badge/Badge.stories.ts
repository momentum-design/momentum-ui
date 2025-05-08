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

export const StatusBadges: StoryObj = {
  render: () => {
    return html`
      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
        <md-badge color="status-positive" small>
          <md-icon name="participant-filled" size="16" iconSet="momentumDesign"></md-icon>
          Agent name - 00:00
        </md-badge>
        <md-badge color="status-negative" small suppress-default-max-width>
          <md-icon name="alert-active-filled" size="16" iconSet="momentumDesign"></md-icon>
          %Wrap-up alert% - 00:00
        </md-badge>
        <md-badge color="status-accent" small>
          <md-icon name="archive-filled" size="16" iconSet="momentumDesign"></md-icon>
          Wrap-up - 00:00
        </md-badge>
        <md-badge color="status-warning" small>
          <md-icon name="call-barge-filled" size="16" iconSet="momentumDesign"></md-icon>
          Barged - 00:00
        </md-badge>
        <md-badge color="status-orange" small>
          <md-icon name="call-hold-filled" size="16" iconSet="momentumDesign"></md-icon>
          On hold - 00:00
        </md-badge>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: "Status badges display agent and call states with appropriate status colors and icons."
      }
    }
  }
};

export const CircleBadges: StoryObj = {
  render: () => {
    return html`
      <md-badge color="blue" circle circle-size="24">
        <md-icon name="chat-filled" iconSet="momentumDesign" size="16"></md-icon>
      </md-badge>
      <h3>24</h3>
      <md-badge color="blue" circle circle-size="32">
        <md-icon name="chat-filled" iconSet="momentumDesign" size="20"></md-icon>
      </md-badge>
      <h3>32</h3>
      <md-badge color="blue" circle circle-size="40">
        <md-icon name="chat-filled" iconSet="momentumDesign" size="24"></md-icon>
      </md-badge>
      <h3>40</h3>
      <md-badge color="blue" circle circle-size="48">
        <md-icon name="chat-filled" iconSet="momentumDesign" size="28"></md-icon>
      </md-badge>
      <h3>48</h3>
      <md-badge color="blue" circle circle-size="64">
        <md-icon name="chat-filled" iconSet="momentumDesign" size="36"></md-icon>
      </md-badge>
      <h3>64</h3>
      <md-badge color="blue" circle circle-size="72">
        <md-icon name="chat-filled" iconSet="momentumDesign" size="40"></md-icon>
      </md-badge>
      <h3>72</h3>
      <md-badge color="blue" circle circle-size="88">
        <md-icon name="chat-filled" iconSet="momentumDesign" size="52"></md-icon>
      </md-badge>
      <h3>88</h3>
      <md-badge color="blue" circle circle-size="124">
        <md-icon name="chat-filled" iconSet="momentumDesign" size="73"></md-icon>
      </md-badge>
      <h3>124</h3>
    `;
  }
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
