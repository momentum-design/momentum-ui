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
import {
  CardAlert as CardAlertComponent,
  CardAlertDetailImpact,
  CardAlertSeverity,
  CardAlertStatus
} from "./CardAlert";

const defaultDetails: CardAlertComponent.DetailRow[] = [
  { label: "Agent", value: "Bob Flynn" },
  { label: "Scheduled start", value: "9:00 AM" },
  { label: "Current delay", value: "18 mins", impact: CardAlertDetailImpact.NEGATIVE }
];

const defaultArgs: Args = {
  severity: CardAlertSeverity.CRITICAL,
  category: "Adherence",
  secondaryChip: "Reforecast",
  timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
  status: CardAlertStatus.DEFAULT,
  title: "Bob has not signed in for his scheduled shift",
  queueName: "Customer Support · 9:00–17:00",
  details: defaultDetails,
  insight: "Repeated late sign-ins over the past 2 weeks (4 occurrences)",
  detailsHeading: "Shift details",
  primaryActionLabel: "Take action",
  primaryActionDropdown: true,
  expanded: false
};

const renderCard = (args: Args) => {
  return html`
    <md-card-alert
      severity=${args.severity}
      category=${args.category}
      secondaryChip=${args.secondaryChip}
      timestamp=${args.timestamp}
      status=${args.status}
      title=${args.title}
      queueName=${args.queueName}
      .details=${args.details}
      insight=${args.insight}
      detailsHeading=${args.detailsHeading}
      primaryActionLabel=${args.primaryActionLabel}
      ?primaryActionDropdown=${args.primaryActionDropdown}
      ?expanded=${args.expanded}
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

export const MetricSubvalues: StoryObj = {
  args: {
    ...defaultArgs,
    severity: CardAlertSeverity.MEDIUM,
    category: "Deficit",
    status: CardAlertStatus.PROCESSING,
    title: "Avg SL expected to drop 15% below target at 3 PM",
    queueName: "Credit Card servicing (Calls)",
    detailsHeading: "11:00–11:15 AM actual vs plan",
    details: [
      { label: "Volume:", value: "+22%", subvalue: "(+18 interactions)", impact: CardAlertDetailImpact.NEGATIVE },
      { label: "AHT:", value: "+14%", subvalue: "(+48s)", impact: CardAlertDetailImpact.NEGATIVE },
      { label: "Staffing gap:", value: "-2 agents", impact: CardAlertDetailImpact.NEGATIVE }
    ] satisfies CardAlertComponent.DetailRow[],
    insight: "",
    primaryActionLabel: "Hide details",
    expanded: true
  },
  render
};

const meta: Meta = {
  title: "Components/Card Alert",
  component: "md-card-alert",
  argTypes: {
    severity: { control: "select", options: Object.values(CardAlertSeverity) },
    category: { control: "text" },
    secondaryChip: { control: "text" },
    timestamp: { control: "text" },
    status: { control: "select", options: Object.values(CardAlertStatus) },
    title: { control: "text" },
    queueName: { control: "text" },
    detailsHeading: { control: "text" },
    insight: { control: "text" },
    primaryActionLabel: { control: "text" },
    primaryActionDropdown: { control: "boolean" },
    expanded: { control: "boolean" }
  },
  parameters: {
    a11y: {
      element: "md-card-alert"
    }
  }
};

export default meta;
