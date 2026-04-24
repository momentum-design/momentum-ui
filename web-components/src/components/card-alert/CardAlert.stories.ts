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
import { CardAlert } from "./CardAlert";

const defaultDetails: CardAlert.DetailRow[] = [
  { label: "Agent", value: "Bob Flynn" },
  { label: "Scheduled start", value: "9:00 AM" },
  { label: "Current delay", value: "18 mins", highlighted: true }
];

const render = (args: Args) => {
  return html`
    <md-card-alert
      severity=${args.severity}
      category=${args.category}
      timestamp=${args.timestamp}
      ?live=${args.live}
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

export const CardAlertDefault: StoryObj = {
  args: {
    severity: "Critical",
    category: "Adherence",
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    live: false,
    title: "Bob has not signed in for his scheduled shift",
    queueName: "Customer Support · 9:00–17:00",
    details: defaultDetails,
    insight: "Repeated late sign-ins over the past 2 weeks (4 occurrences)",
    detailsHeading: "Shift details",
    primaryActionLabel: "Take action",
    primaryActionDropdown: true,
    expanded: false,
    showDismiss: true
  },
  render
};

export const CardAlertNoInsight: StoryObj = {
  args: {
    ...CardAlertDefault.args,
    insight: ""
  },
  render
};

export const CardAlertNoDismiss: StoryObj = {
  args: {
    ...CardAlertDefault.args,
    showDismiss: false
  },
  render
};

export const CardAlertLive: StoryObj = {
  args: {
    ...CardAlertDefault.args,
    live: true
  },
  render
};

export const CardAlertStandardButton: StoryObj = {
  args: {
    ...CardAlertDefault.args,
    primaryActionDropdown: false
  },
  render
};

const meta: Meta = {
  title: "Components/Card Alert",
  component: "md-card-alert",
  argTypes: {
    severity: { control: "text" },
    category: { control: "text" },
    timestamp: { control: "text" },
    live: { control: "boolean" },
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
