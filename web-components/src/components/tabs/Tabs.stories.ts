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
import "@/components/tooltip/Tooltip";
import { action } from "@storybook/addon-actions";
import { Args, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const tabs = (args: Args) => {
  return html` <div style="height: 300px;">
    <md-tabs
      @selected-changed=${action("changed")}
      ?draggable=${args.draggable}
      direction="${args.alignment}"
      ?justified=${args.justified}
      variant="${args.variant}"
      type="${args.type}"
      ?newmomentum=${args.newMomentum}
      animation=${args.animation}
      ghost-class=${args.ghostClass}
      chosen-class=${args.chosenClass}
      force-fallback=${args.forceFallback}
      fallback-class=${args.fallbackClass}
      tabs-id=${args.tabsId}
      persist-selection=${args.persistSelection}
      comp-unique-id=${args.compUniqueId}
      ?hug-tabs=${args.hugTabs}
      more-items-scroll-limit=${args.moreItemsScrollLimit}
      selected-index=${args.selectedIndex}
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
        justified
        direction="${args.alignment}"
        variant="${args.variant}"
        type="${args.type}"
        ?newmomentum=${args.newMomentum}
        animation=${args.animation}
        ghost-class=${args.ghostClass}
        chosen-class=${args.chosenClass}
        ?force-fallback=${args.forceFallback}
        fallback-class=${args.fallbackClass}
        tabs-id=${args.tabsId}
        persist-selection=${args.persistSelection}
        comp-unique-id=${args.compUniqueId}
        ?hug-tabs=${args.hugTabs}
        more-items-scroll-limit=${args.moreItemsScrollLimit}
        selected-index=${args.selectedIndex}
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
          <md-icon name="monthly-recurring-schedule-node-bold" iconSet="momentumDesign"></md-icon>
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

export const Default: StoryObj = {
  args: {
    alignment: "horizontal"
  },
  render: (args: Args) => {
    return html` ${args.more ? moreTabs(args) : tabs(args)} `;
  }
};

export const VerticalTabs: StoryObj = {
  args: {
    alignment: "vertical"
  },
  render: (args: Args) => {
    return html` ${args.more ? moreTabs(args) : tabs(args)} `;
  }
};

export const MoreTabswithMenuOverlay: StoryObj = {
  args: {
    alignment: "horizontal",
    more: true
  },
  render: (args: Args) => {
    return html` ${args.more ? moreTabs(args) : tabs(args)} `;
  }
};

export const DraggableCloseableTabs: StoryObj = {
  args: {
    alignment: "horizontal",
    draggable: true,
    closable: "auto"
  },
  render: (args: Args) => {
    return html` ${args.more ? moreTabs(args) : tabs(args)} `;
  }
};

export const NewTabs: StoryObj = {
  args: {
    alignment: "horizontal",
    newMomentum: true
  },
  render: (args: Args) => {
    return html` ${args.more ? moreTabs(args) : tabs(args)} `;
  }
};

export const NewPrimaryRoundedTabs: StoryObj = {
  args: {
    alignment: "horizontal",
    newMomentum: true,
    variant: "primary",
    type: "rounded",
    more: true
  },
  render: (args: Args) => {
    return html` ${args.more ? moreTabs(args) : tabs(args)} `;
  }
};

export default {
  title: "Components/Tabs",
  component: "md-tabs",
  argTypes: {
    more: { control: "boolean" },
    draggable: { control: "boolean" },
    variant: { control: { type: "select" }, options: ["ghost", "primary"] },
    type: { control: { type: "select" }, options: ["line", "pill", "rounded"] },
    alignment: { control: { type: "select" }, options: ["horizontal", "vertical"] },
    closable: { control: { type: "select" }, options: ["", "auto", "custom"] },
    settings: { control: "boolean" },
    newMomentum: { control: "boolean" },
    animation: { control: "boolean" },
    ghostClass: { control: "text" },
    chosenClass: { control: "text" },
    forceFallback: { control: "boolean" },
    fallbackClass: { control: "text" },
    tabsId: { control: "text" },
    persistSelection: { control: "boolean" },
    compUniqueId: { control: "text" },
    hugTabs: { control: "boolean" },
    moreItemsScrollLimit: { control: "number" },
    selectedIndex: { control: "number" },

    overflowLabel: { table: { disable: true } },
    tabSlotElement: { table: { disable: true } },
    panelSlotElement: { table: { disable: true } },
    moreTabMenuElement: { table: { disable: true } },
    tabsCopyHiddenListElements: { table: { disable: true } },
    tabsListElement: { table: { disable: true } },
    hiddenTabsContainerElement: { table: { disable: true } },
    visibleTabsContainerElement: { table: { disable: true } },
    tabsMoreListElement: { table: { disable: true } },
    menuOverlayElement: { table: { disable: true } },
    tabsSettingsElement: { table: { disable: true } },
    slotItem: { table: { disable: true } },
    handleOnDragEnd: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-tabs"
    }
  }
};
