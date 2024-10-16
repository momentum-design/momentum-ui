/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/icon/Icon";
import "@/components/menu/Menu";
import "@/components/menu/MenuItem";
import { Args, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "Components/Menu",
  component: "md-menu",
  argTypes: {
    direction: { control: { type: "select" }, options: ["horizontal", "vertical"], defaultValue: "horizontal" },
    justified: { control: "boolean" },
    disabled: { control: "boolean" },
    href: { control: "text", defaultValue: "" }
  },
  parameters: {
    a11y: {
      element: "md-menu"
    }
  }
};

const render = (args: Args) => {
  return html`
    <md-menu .direction="${args.direction}" .justified=${args.justified}>
      <md-menu-item>
        <md-icon name="recents-bold" size="16" iconSet="momentumDesign"></md-icon>
        <span>Contact History</span>
      </md-menu-item>
      <md-menu-item .disabled=${args.disabled}>
        <md-icon name="apps-bold" size="16" iconSet="momentumDesign"></md-icon>
        <span>Cisco WxM</span>
      </md-menu-item>
      <md-menu-item href="${args.href}">
        <md-icon name="cancel-bold" size="16" iconSet="momentumDesign"></md-icon>
        <span>Cisco Test</span>
      </md-menu-item>
      <md-menu-item>
        <md-icon name="favorite-bold" size="16" iconSet="momentumDesign"></md-icon>
        <span>Cisco Favorite</span>
      </md-menu-item>
      <md-menu-item>
        <md-icon name="alarm-bold" size="16" iconSet="momentumDesign"></md-icon>
        <span>Cisco Answer</span>
      </md-menu-item>
    </md-menu>
  `;
};

export const Menu: StoryObj = {
  args: {
    direction: "horizontal",
    justified: false,
    disabled: false,
    href: ""
  },
  render: render
};
