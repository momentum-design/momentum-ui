/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/tabs/Tab";
import "@/components/tabs/TabPanel";
import "@/components/tabs/Tabs";
import { ThemeNameValues } from "@/components/theme/Theme";
import { action } from "@storybook/addon-actions";
import { Args } from "@storybook/web-components";
import { html } from "lit-element";

const closeOptions = ["", "auto", "custom"] as const;

const tabs = (args: Args) => {
  return html` <div style="height: 300px;">
    <md-tabs
      @selected-changed=${action("changed")}
      ?draggable=${args.draggable}
      direction="${args.alignment}"
      .justified=${args.justified}
    >
      <md-tab slot="tab" closable="${args.closable}">
        <md-icon name="recents-bold" size="16" iconSet="momentumDesign"></md-icon>
        <span>Tab 1</span>
      </md-tab>
      <md-tab-panel slot="panel">
        <span>Content for "First Tab"</span>
      </md-tab-panel>
      <md-tab slot="tab" closable="${args.closable}">
        <md-icon name="apps_16"></md-icon>
        <span>Tab 2</span>
      </md-tab>
      <md-tab-panel slot="panel">
        <span>Content for "Second Tab"</span>
      </md-tab-panel>
      <md-tab slot="tab" closable="${args.closable}" .disabled=${args.disabled}>
        <md-icon name="alarm_16"></md-icon>
        <span>Tab 3</span>
      </md-tab>
      <md-tab-panel slot="panel">
        <span>Content for "Third Tab"</span>
      </md-tab-panel>
      ${args.settings
        ? html`
            <button slot="settings" class="menu-trigger-button">
              <md-tooltip placement="bottom" message=${"More Button"}>
                <md-icon name="icon-reset_16"></md-icon>
              </md-tooltip>
            </button>
          `
        : ""}
    </md-tabs>
  </div>`;
};

const moreTabs = (args: Args) => {
  return html`
    <div style="max-width: 600px;">
      <md-tabs
        @selected-changed=${action("changed")}
        selected="0"
        more-items-scroll-limit="${args.moreItemsScrollLimit}"
        ?draggable=${args.draggable}
        justified
      >
        <md-tab slot="tab" closable="${args.closable}" aria-label="History">
          <md-icon name="recents-bold" size="16" iconSet="momentumDesign"></md-icon>
          <span>Contact History</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Contact History"</span>
        </md-tab-panel>
        <md-tab slot="tab" closable="${args.closable}" aria-label="WxM">
          <md-icon name="apps_16"></md-icon>
          <span>Cisco WxM</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "WxM"</span>
        </md-tab-panel>
        <md-tab slot="tab" closable="${args.closable}">
          <md-icon name="alarm_16"></md-icon>
          <span>Cisco Answer</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco Answer"</span>
        </md-tab-panel>
        <md-tab slot="tab" closable="${args.closable}">
          <md-icon name="admin_16"></md-icon>
          <span>Cisco Admins</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco Admins"</span>
        </md-tab-panel>
        <md-tab slot="tab" closable="${args.closable}">
          <md-icon name="alert_16"></md-icon>
          <span>Cisco Widgets</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco Widgets"</span>
        </md-tab-panel>
        <md-tab slot="tab" closable="${args.closable}">
          <md-icon name="browser_16"></md-icon>
          <span>Cisco News</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco News"</span>
        </md-tab-panel>
        <md-tab slot="tab" closable="${args.closable}">
          <md-icon name="month_16"></md-icon>
          <span>Cisco Weather</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco Weather"</span>
        </md-tab-panel>
        <md-tab slot="tab" closable="${args.closable}">
          <md-icon name="camera-photo-bold" size="16" iconSet="momentumDesign"></md-icon>
          <span>Cisco Turbo</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco Turbo"</span>
        </md-tab-panel>
        ${args.settings
          ? html`
              <button slot="settings" class="menu-trigger-button">
                <md-tooltip placement="bottom" message=${"More Button"}>
                  <md-icon name="reset-bold" size="16" iconSet="momentumDesign"></md-icon>
                </md-tooltip>
              </button>
            `
          : ""}
      </md-tabs>
    </div>
  `;
};

export const Tabs = (args: Args) => {
  return html`
    <md-theme class="theme-toggle" id="tabs" ?darkTheme=${args.darkTheme} theme=${args.theme}>
      ${args.more ? moreTabs(args) : tabs(args)}
    </md-theme>
  `;
};

export default {
  title: "Components/Tabs",
  component: "md-tabs",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues, defaultValue: "lumos" } },
    darkTheme: { control: "boolean" },
    overflowLabel: { table: { disable: true } },
    tabSlotElement: { table: { disable: true } },
    panelSlotElement: { table: { disable: true } },
    moreTabMenuElement: { table: { disable: true } },
    tabsCopyHiddenListElements: { table: { disable: true } },
    tabsListElement: { table: { disable: true } },
    slotItem: { table: { disable: true } },
    draggable: { control: "boolean", defaultValue: false },
    alignment: { control: { type: "select", options: ["horizontal", "vertical"] }, defaultValue: "horizontal" },
    closable: { control: { type: "select", options: closeOptions }, defaultValue: "" },
    settings: { control: "boolean", defaultValue: false }
  },
  parameters: {
    a11y: {
      element: "md-tabs"
    }
  }
};
