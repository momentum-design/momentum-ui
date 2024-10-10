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
import { ThemeNameValues } from "@/components/theme/Theme";
import { Args } from "@storybook/web-components";
import { html } from "lit-element";

export default {
  title: "Components/Menu",
  component: "md-menu",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean", defaultValue: false },
    direction: { control: { type: "select", options: ["horizontal", "vertical"] }, defaultValue: "horizontal" },
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

export const Menu = (args: Args) => {
  return html`
    <md-theme class="theme-toggle" style="width: 100%;" id="menu" ?darkTheme=${args.darkTheme} theme=${args.theme}>
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
    </md-theme>
  `;
};
