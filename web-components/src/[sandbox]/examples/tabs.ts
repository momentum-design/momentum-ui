import "@/components/icon/Icon";
import "@/components/tabs/Tab";
import "@/components/tabs/TabPanel";
import "@/components/tabs/Tabs";
import { html } from "lit-element";

export const tabsTemplate = html`
  <div style="max-width: 600px;">
    <md-tabs selected="0">
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
    <br />
    <md-tabs>
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
    </md-tabs>

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

    <button id="confirm">Save</button>
  </div>
`;
