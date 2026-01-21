/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/alert/Alert";
import { buttonColor, buttonVariant } from "@/components/button/Button";
import { alertTypes } from "@/utils/enums";
import type { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../badge/Badge";

const render = (args: Args) => html`
  <md-alert
    title=${args.title}
    message=${args.message}
    type=${args.type}
    ?closable=${args.closable}
    ?show=${args.show}
    .inline=${args.inline}
  ></md-alert>
`;

const alertWithIconRender = (args: Args) => html`
  <md-alert title=${args.title} message=${args.message} ?show=${args.show} ?closable=${args.closable}>
    <md-badge slot="alert-icon" color="darkmint" circle>
      <md-icon name="sms_16" color="white-100"></md-icon>
    </md-badge>
  </md-alert>
`;

const alertWithSlots = (args: Args) => html`
  <md-alert message=${args.message} show>
    <a slot="alert-body" href="/">Test</a>
    <div slot="alert-footer">
      <md-button variant="primary"><span slot="text">Blue</span></md-button>
    </div>
  </md-alert>
`;

export const Alerts: StoryObj = {
  args: {
    show: true,
    title: "Alert",
    message: "Who is awesome? You are!",
    type: "default",
    closable: true,
    inline: false
  },
  render: render
};

export const AlertWithIcon: StoryObj = { args: { ...Alerts.args }, render: alertWithIconRender };

export const AlertWithSlots: StoryObj = { args: { ...Alerts.args }, render: alertWithSlots };

const meta: Meta = {
  title: "Components/Alerts",
  component: "md-alert",
  argTypes: {
    renderIconTemplate: { table: { disable: true } },
    alertClassMap: { table: { disable: true } },
    hasFooterSlotContent: { table: { disable: true } },
    slottedFooterClassMap: { table: { disable: true } },
    internalClose: { description: "By default closing internally, otherwise - controlling outer via .show" },
    type: { control: { type: "select" }, options: alertTypes },
    primaryButtonVariant: { control: { type: "select" }, options: buttonVariant },
    primaryButtonColor: { control: { type: "select" }, options: buttonColor }
  },
  tags: ["autodocs"],
  parameters: {
    a11y: { element: "md-alert" },
    docs: {
      description: {
        component: "A typical usage of Alert, with text added within the element tags or message attribute"
      }
    }
  }
};

export default meta;
