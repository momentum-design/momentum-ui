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
import { boolean, number, select } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Components/Tabs",
  component: "md-tabs",
  argTypes: {
    overflowLabel: { table: { disable: true } },
    tabSlotElement: { table: { disable: true } },
    panelSlotElement: { table: { disable: true } },
    moreTabMenuElement: { table: { disable: true } },
    tabsCopyHiddenListElements: { table: { disable: true } },
    tabsListElement: { table: { disable: true } },
    slotItem: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-tabs"
    }
  }
};

export const Tabs = () => {
  const darkTheme = boolean("darkMode", false);
  const draggable = boolean("draggable", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const disabled = boolean("disabled", false);
  const justified = boolean("Justified", false);
  const options = { vertical: "vertical", horizontal: "horizontal" };
  const alignment = select("Orientation", options, "horizontal");
  const closeOptions = { none: "", auto: "auto" };
  const closable = select("Closable", closeOptions, "none");
  const settings = boolean("settings", false);
  const more = alignment === "horizontal" ? boolean("Show Tabs with More Button", false) : false;
  const moreItemsScrollLimit = more ? number("Show Tabs More menu scroll for items limit", 3) : Number.MAX_SAFE_INTEGER;

  if (more) {
    return html`
      <md-theme class="theme-toggle" id="tabs" ?darkTheme=${darkTheme} theme=${theme}>
        <div style="max-width: 600px;">
          <md-tabs
            @selected-changed=${action("changed")}
            selected="0"
            more-items-scroll-limit="${moreItemsScrollLimit}"
            ?draggable=${draggable}
            justified
          >
            <md-tab slot="tab" closable="${closable}" label="History">
              <md-icon name="recents_16"></md-icon>
              <span>Contact History</span>
            </md-tab>
            <md-tab-panel slot="panel">
              <span>Content for "Contact History"</span>
            </md-tab-panel>
            <md-tab slot="tab" closable="${closable}" label="WxM">
              <md-icon name="apps_16"></md-icon>
              <span>Cisco WxM</span>
            </md-tab>
            <md-tab-panel slot="panel">
              <span>Content for "WxM"</span>
            </md-tab-panel>
            <md-tab slot="tab" closable="${closable}">
              <md-icon name="alarm_16"></md-icon>
              <span>Cisco Answer</span>
            </md-tab>
            <md-tab-panel slot="panel">
              <span>Content for "Cisco Answer"</span>
            </md-tab-panel>
            <md-tab slot="tab" closable="${closable}">
              <md-icon name="admin_16"></md-icon>
              <span>Cisco Admins</span>
            </md-tab>
            <md-tab-panel slot="panel">
              <span>Content for "Cisco Admins"</span>
            </md-tab-panel>
            <md-tab slot="tab" closable="${closable}">
              <md-icon name="alert_16"></md-icon>
              <span>Cisco Widgets</span>
            </md-tab>
            <md-tab-panel slot="panel">
              <span>Content for "Cisco Widgets"</span>
            </md-tab-panel>
            <md-tab slot="tab" closable="${closable}">
              <md-icon name="browser_16"></md-icon>
              <span>Cisco News</span>
            </md-tab>
            <md-tab-panel slot="panel">
              <span>Content for "Cisco News"</span>
            </md-tab-panel>
            <md-tab slot="tab" closable="${closable}">
              <md-icon name="month_16"></md-icon>
              <span>Cisco Weather</span>
            </md-tab>
            <md-tab-panel slot="panel">
              <span>Content for "Cisco Weather"</span>
            </md-tab-panel>
            <md-tab slot="tab" closable="${closable}">
              <md-icon name="camera-photo_16"></md-icon>
              <span>Cisco Turbo</span>
            </md-tab>
            <md-tab-panel slot="panel">
              <span>Content for "Cisco Turbo"</span>
            </md-tab-panel>
            ${settings
              ? html`
                  <button slot="settings" class="menu-trigger-button">
                    <md-tooltip placement="bottom" message=${"More Button"}>
                      <md-icon name="icon-reset_16"></md-icon>
                    </md-tooltip>
                  </button>
                `
              : ""}
          </md-tabs>
        </div>
      </md-theme>
    `;
  } else {
    return html`
      <md-theme class="theme-toggle" id="tabs" ?darkTheme=${darkTheme} theme=${theme}>
        <div style="height: 300px;">
          <md-tabs
            @selected-changed=${action("changed")}
            ?draggable=${draggable}
            direction="${alignment}"
            .justified=${justified}
          >
            <md-tab slot="tab" closable="${closable}">
              <md-icon name="recents_16"></md-icon>
              <span>Tab 1</span>
            </md-tab>
            <md-tab-panel slot="panel">
              <span>Content for "First Tab"</span>
            </md-tab-panel>
            <md-tab slot="tab" closable="${closable}">
              <md-icon name="apps_16"></md-icon>
              <span>Tab 2</span>
            </md-tab>
            <md-tab-panel slot="panel">
              <span>Content for "Second Tab"</span>
            </md-tab-panel>
            <md-tab slot="tab" closable="${closable}" .disabled=${disabled}>
              <md-icon name="alarm_16"></md-icon>
              <span>Tab 3</span>
            </md-tab>
            <md-tab-panel slot="panel">
              <span>Content for "Third Tab"</span>
            </md-tab-panel>
            ${settings
              ? html`
                  <button slot="settings" class="menu-trigger-button">
                    <md-tooltip placement="bottom" message=${"More Button"}>
                      <md-icon name="icon-reset_16"></md-icon>
                    </md-tooltip>
                  </button>
                `
              : ""}
          </md-tabs>
        </div>
      </md-theme>
    `;
  }
};
