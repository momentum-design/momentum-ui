/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { action } from "storybook/actions";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { CardAlert as CardAlertComponent, CardAlertSeverity } from "./CardAlert";

const defaultDetails: CardAlertComponent.DetailRow[] = [
  { label: "Agent", value: "Bob Flynn" },
  { label: "Scheduled start", value: "9:00 AM" },
  { label: "Current delay", value: "18 mins", highlighted: true }
];

const defaultArgs: Args = {
  severity: CardAlertSeverity.CRITICAL,
  category: "Adherence",
  timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
  title: "Bob has not signed in for his scheduled shift",
  queueName: "Customer Support · 9:00–17:00",
  details: defaultDetails,
  insight: "Repeated late sign-ins over the past 2 weeks (4 occurrences)",
  detailsHeading: "Shift details",
  primaryActionLabel: "Take action",
  primaryActionDropdown: true,
  expanded: false,
  showDismiss: false
};

const renderCard = (args: Args) => {
  return html`
    <md-card-alert
      severity=${args.severity}
      category=${args.category}
      timestamp=${args.timestamp}
      title=${args.title}
      queueName=${args.queueName}
      .details=${args.details}
      insight=${args.insight}
      detailsHeading=${args.detailsHeading}
      primaryActionLabel=${args.primaryActionLabel}
      ?primaryActionDropdown=${args.primaryActionDropdown}
      ?expanded=${args.expanded}
      .showDismiss=${args.showDismiss}
      @primary-action-clicked=${() => action("primary-action-clicked")()}
      @dismiss-clicked=${() => action("dismiss-clicked")()}
    >
    </md-card-alert>
  `;
};

const render = (args: Args) => {
  return html`
    <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-start;">${renderCard(args)}</div>
  `;
};

export const CardAlert: StoryObj = {
  args: defaultArgs,
  render
};

const meta: Meta = {
  title: "Components/Card Alert",
  component: "md-card-alert",
  argTypes: {
    severity: { control: "select", options: Object.values(CardAlertSeverity) },
    category: { control: "text" },
    timestamp: { control: "text" },
    title: { control: "text" },
    queueName: { control: "text" },
    detailsHeading: { control: "text" },
    insight: { control: "text" },
    primaryActionLabel: { control: "text" },
    primaryActionDropdown: { control: "boolean" },
    expanded: { control: "boolean" },
    showDismiss: { control: "boolean" }
  },
  parameters: {
    a11y: {
      element: "md-card-alert"
    }
  }
};

export default meta;
