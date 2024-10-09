/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/alert-banner/AlertBanner";
import "@/components/icon/Icon";
import { ThemeNameValues } from "@/components/theme/Theme";
import { action } from "@storybook/addon-actions";
import type { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";
import mdx from "./AlertBanner.mdx";

const render = (args: Args) => html`
  <md-theme class="theme-toggle" id="alert-banner" ?darkTheme=${args.darkTheme} theme=${args.theme}>
    <md-alert-banner
      @alertBanner-hide=${action("dispatchEvent")}
      show
      type="${args.type}"
      ?closable=${args.closable}
      message="${args.textContent}"
    >
      ${args.textContent ? `${args.textContent}` : `Text with slotted tag element`}
    </md-alert-banner>
  </md-theme>
`;

export const AlertBanner: StoryObj = {
  args: {
    theme: "lumos",
    darkTheme: false,
    type: "default",
    closable: false,
    textContent: "Test Alert Message"
  },
  render: render
};

const meta: Meta = {
  title: "Components/Alert Banner",
  component: "md-alert-banner",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean" },
    type: { control: { type: "select", options: ["default", "warning", "error", "success"] } }
  },
  parameters: {
    a11y: {
      element: "md-alert-banner"
    },
    docs: {
      page: mdx,
      description: {
        component: "A typical usage of Alert Banner, with text added within the element tags or message attribute"
      }
    }
  }
};

export default meta;
