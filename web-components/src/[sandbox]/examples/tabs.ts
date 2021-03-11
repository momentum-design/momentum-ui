import "@/components/button/Button";
import "@/components/icon/Icon";
import "@/components/menu-overlay/MenuOverlay";
import "@/components/tabs/Tab";
import "@/components/tabs/TabPanel";
import "@/components/tabs/Tabs";
import "@/components/tooltip/Tooltip";

import { html } from "lit-element";
import { repeat } from "lit-html/directives/repeat";

const tabsOverlayHtmlList = ["All templates", "Only Fb Template", ...Array(20)].map(
  (value, index, array) => html`
    <md-tab slot="tab">
      <md-icon name="recents_16"></md-icon>
      <span>${value || "Tab " + index}</span>
    </md-tab>

    <md-tab-panel slot="panel">
      <span>Content for "Tab ${index}"</span>
    </md-tab-panel>
  `
);

export const tabsTemplate = html`
  <div style="max-width: 600px;">
    <h3>Horizontal md-tabs with More button</h3>
    <div>
      <md-tabs selected="0" justified>
        <md-tab slot="tab" label="History">
          <md-icon name="recents_16"></md-icon>
          <span>Contact History</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Contact History"</span>
        </md-tab-panel>
        <md-tab slot="tab" label="WxM">
          <md-icon name="apps_16"></md-icon>
          <span>Cisco WxM</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "WxM"</span>
        </md-tab-panel>
        <md-tab slot="tab">
          <md-icon name="alarm_16"></md-icon>
          <span>Cisco Answer</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco Answer"</span>
        </md-tab-panel>
        <md-tab slot="tab">
          <md-icon name="admin_16"></md-icon>
          <span>Cisco Admins</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco Admins"</span>
        </md-tab-panel>
        <md-tab slot="tab">
          <md-icon name="alert_16"></md-icon>
          <span>Cisco Widgets</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco Widgets"</span>
        </md-tab-panel>
        <md-tab slot="tab">
          <md-icon name="browser_16"></md-icon>
          <span>Cisco News</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco News"</span>
        </md-tab-panel>
        <md-tab slot="tab">
          <md-icon name="month_16"></md-icon>
          <span>Cisco Weather</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco Weather"</span>
        </md-tab-panel>
        <md-tab slot="tab">
          <md-icon name="camera-photo_16"></md-icon>
          <span>Cisco Turbo</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco Turbo"</span>
        </md-tab-panel>
      </md-tabs>
    </div>
    <br />

    <div style="max-width: 400px;">
      <h3>md-tabs justified</h3>
      <md-tabs justified>
        <md-tab slot="tab">
          <span>All</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Contact History"</span>
        </md-tab-panel>
        <md-tab slot="tab">
          <md-icon name="apps_16"></md-icon>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "WxM"</span>
        </md-tab-panel>
        <md-tab slot="tab">
          <md-icon name="browser_16"></md-icon>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Third Tab"</span>
        </md-tab-panel>
        <md-tab slot="tab">
          <md-icon name="alert_16"></md-icon>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Fourth Tab"</span>
        </md-tab-panel>
      </md-tabs>
    </div>
  </div>
  <br />

  <div>
    <h3>md-tabs in overlay</h3>
    <md-menu-overlay custom-width="360px" placement="top-start">
      <style>
        md-menu-overlay::part(overlay-content) {
          height: 360px !important;
        }
      </style>
      <md-tooltip slot="menu-trigger" placement="right" message="Click to show tabs in overlay menu">
        <md-button hasRemoveStyle type="button" class="mv-predefined-icon">
          <md-icon name="icon-response_16" />
        </md-button>
      </md-tooltip>
      <div style="width: 100%;">
        <md-tabs selected="1" more-items-scroll-limit="4">
          ${repeat(tabsOverlayHtmlList, _html => _html)}
        </md-tabs>
      </div>
    </md-menu-overlay>
  </div>
  <br />

  <div style="height: 500px;">
    <h3>md-tabs vertical</h3>
    <md-tabs direction="vertical">
      <md-tab slot="tab">
        <md-icon name="recents_16"></md-icon>
        <span>Contact History</span>
      </md-tab>
      <md-tab-panel slot="panel">
        <span>Content for "Contact History"</span>
      </md-tab-panel>
      <md-tab slot="tab">
        <md-icon name="apps_16"></md-icon>
        <span>Cisco WxM</span>
      </md-tab>
      <md-tab-panel slot="panel">
        <span>Content for "WxM"</span>
      </md-tab-panel>
      <md-tab slot="tab">
        <md-icon name="alarm_16"></md-icon>
        <span>Cisco Answer</span>
      </md-tab>
      <md-tab-panel slot="panel">
        <span>Content for "Cisco Answer"</span>
      </md-tab-panel>
      <md-tab slot="tab">
        <md-icon name="camera-photo_16"></md-icon>
        <span>Cisco Turbo</span>
      </md-tab>
      <md-tab-panel slot="panel">
        <span>Content for "Cisco Turbo"</span>
      </md-tab-panel>
    </md-tabs>
  </div>
`;
