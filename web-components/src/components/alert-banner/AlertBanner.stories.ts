/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { alertBannerType } from "@/components/alert-banner/AlertBanner";
import "@/components/icon/Icon";
import type { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const render = (args: Args) => html`
  <md-alert-banner
    ?show=${args.show}
    type="${args.type}"
    ?closable=${args.closable}
    titleText="${args.titleText}"
    message="${args.textContent}"
    ?showBannerTypeIcon=${args.showBannerTypeIcon}
    ?showRefreshButton=${args.showRefreshButton}
    alignment=${args.alignment}
  >
    ${args.textContent ? `${args.textContent}` : `Text with slotted tag element`}
  </md-alert-banner>
`;

export const AlertBanner: StoryObj = {
  args: {
    type: "default",
    closable: false,
    show: true,
    titleText: "Test Title",
    textContent: "Test Alert Message",
    showBannerTypeIcon: true,
    showRefreshButton: true
  },
  render: render
};

const meta: Meta = {
  title: "Components/Alert Banner",
  component: "md-alert-banner",
  argTypes: {
    type: { control: { type: "select" }, options: alertBannerType },
    alignment: { control: { type: "select" }, options: ["leading", "center"] }
  },
  tags: ["autodocs"],
  parameters: {
    a11y: {
      element: "md-alert-banner"
    },
    docs: {
      description: {
        component: "A typical usage of Alert Banner, with text added within the element tags or message attribute"
      }
    }
  }
};

export default meta;
