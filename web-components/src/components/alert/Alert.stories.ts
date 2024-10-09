/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/alert/Alert";
import { ThemeNameValues } from "@/components/theme/Theme";
import { alertTypes } from "@/utils/enums";
import { action } from "@storybook/addon-actions";
import type { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";
import "../badge/Badge";
import mdx from "./Alert.mdx";

const render = (args: Args) => html`
  <md-theme class="theme-toggle" id="alert" ?darkTheme=${args.darkTheme} theme=${args.theme}>
    <md-alert
      @alert-close=${action("dispatchEvent")}
      title=${args.title}
      message=${args.message}
      type=${args.type}
      ?closable=${args.closable}
      ?show=${args.show}
      .inline=${args.inline}
    ></md-alert>
  </md-theme>
`;

const alertWithIconRender = (args: Args) => html`
  <md-theme class="theme-toggle" id="alert" ?darkTheme=${args.darkTheme} theme=${args.theme}>
    <md-alert
      @alert-close=${action("dispatchEvent")}
      title=${args.title}
      message=${args.message}
      ?show=${args.show}
      ?closable=${args.closable}
    >
      <md-badge slot="alert-icon" color="darkmint" circle>
        <md-icon name="sms_16" color="white-100"></md-icon>
      </md-badge>
    </md-alert>
  </md-theme>
`;

const alertWithSlots = (args: Args) => html`
  <md-theme class="theme-toggle" id="alert" ?darkTheme=${args.darkTheme} theme=${args.theme}>
    <md-alert message=${args.message} show>
      <a slot="alert-body" href="/">Test</a>
      <div slot="alert-footer">
        <md-button variant="primary"><span slot="text">Blue</span></md-button>
      </div>
    </md-alert>
  </md-theme>
`;

export const Alerts: StoryObj = {
  args: {
    theme: "lumos",
    darkTheme: false,
    show: true,
    title: "Alert",
    message: "Who is awesome? You are!",
    type: "default",
    closable: true,
    inline: false
  },
  render: render
};

export const AlertWithIcon: StoryObj = {
  args: {
    show: true,
    title: "Alert",
    message: "Who is awesome? You are!",
    type: "default",
    closable: true,
    inline: false
  },
  render: alertWithIconRender
};

export const AlertWithSlots: StoryObj = {
  args: {
    show: true,
    title: "Alert",
    message: "Who is awesome? You are!",
    type: "default",
    closable: true,
    inline: false
  },
  render: alertWithSlots
};

const meta: Meta = {
  title: "Components/Alerts",
  component: "md-alert",
  argTypes: {
    renderIconTemplate: { table: { disable: true } },
    alertClassMap: { table: { disable: true } },
    hasFooterSlotContent: { table: { disable: true } },
    slottedFooterClassMap: { table: { disable: true } },
    internalClose: { description: "By default closing internally, otherwise - controlling outer via .show" },
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean" },
    type: { control: { type: "select", options: alertTypes } }
  },
  parameters: {
    a11y: {
      element: "md-alert"
    },
    docs: {
      page: mdx,
      description: {
        component: "A typical usage of Alert, with text added within the element tags or message attribute"
      }
    }
  }
};

export default meta;
