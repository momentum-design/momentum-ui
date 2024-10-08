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

export const Alert: StoryObj = {
  args: {
    theme: "lumos",
    darkTheme: false,
    show: true,
    title: "Alert",
    message: "Who is awesome? You are!",
    type: "default",
    closable: true,
    inline: false
  }
};

export const AlertWithIcon: StoryObj = {
  render: alertWithIconRender
};

export const AlertWithSlots: StoryObj = {
  render: alertWithSlots
};

const meta: Meta = {
  title: "Components/Alerts",
  component: "md-alert",
  render,
  argTypes: {
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
  },
  args: Alert.args
};

export default meta;
