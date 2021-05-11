import "@/components/draggable-tabs/DraggableTabs";
import "@/components/draggable-tabs/DraggableTab";
import "@/components/checkbox/Checkbox";
import "@/components/icon/Icon";
import "@/components/toggle-switch/ToggleSwitch";
import { css, customElement, html, internalProperty, LitElement } from "lit-element";
import { DraggableOptions } from "@/[sandbox]/sandbox.mock";
import { repeat } from "lit-html/directives/repeat";

const draggableItemStyle = css`
  md-draggable-tab {
    position: relative;
    display: block;
    text-align: center;
  }

  .custom-ghost {
    background-color: #c8ebfb;
  }

  .custom-drag {
    border: 1px dashed orange;
    cursor: grabbing;
  }
`;

@customElement("default-draggable-tabs-sandbox")
export class DefaultDraggableTabs extends LitElement {
  static get styles() {
    return [
      css`
        ${draggableItemStyle}
      `
    ];
  }

  render() {
    return html`
      <div style="max-width: 800px;">
        <h3>Horizontal md-tabs with More button</h3>
        <div>
          <md-draggable-tabs selected="0" sort drag-class="custom-drag" ghost-class="custom-ghost">
            <md-draggable-tab slot="tab">
              <md-icon name="recents_16"></md-icon>
              <span>Contact History</span>
            </md-draggable-tab>
            <md-draggable-tabPanel slot="panel">
              <span>Content for "Contact History"</span>
            </md-draggable-tabPanel>
            <md-draggable-tab slot="tab">
              <md-icon name="apps_16"></md-icon>
              <span>Cisco WxM</span>
            </md-draggable-tab>
            <md-draggable-tabPanel slot="panel">
              <span>Content for "WxM"</span>
            </md-draggable-tabPanel>
            <md-draggable-tab slot="tab">
              <md-icon name="alarm_16"></md-icon>
              <span>Cisco Answer</span>
            </md-draggable-tab>
            <md-draggable-tabPanel slot="panel">
              <span>Content for "Cisco Answer"</span>
            </md-draggable-tabPanel>
            <md-draggable-tab slot="tab">
              <md-icon name="admin_16"></md-icon>
              <span>Cisco Admins</span>
            </md-draggable-tab>
            <md-draggable-tabPanel slot="panel">
              <span>Content for "Cisco Admins"</span>
            </md-draggable-tabPanel>
            <md-draggable-tab slot="tab">
              <md-icon name="alert_16"></md-icon>
              <span>Cisco Widgets</span>
            </md-draggable-tab>
            <md-draggable-tabPanel slot="panel">
              <span>Content for "Cisco Widgets"</span>
            </md-draggable-tabPanel>
            <md-draggable-tab slot="tab">
              <md-icon name="browser_16"></md-icon>
              <span>Cisco News</span>
            </md-draggable-tab>
            <md-draggable-tabPanel slot="panel">
              <span>Content for "Cisco News"</span>
            </md-draggable-tabPanel>
            <md-draggable-tab slot="tab">
              <md-icon name="month_16"></md-icon>
              <span>Cisco Weather</span>
            </md-draggable-tab>
            <md-draggable-tabPanel slot="panel">
              <span>Content for "Cisco Weather"</span>
            </md-draggable-tabPanel>
          </md-draggable-tabs>
        </div>
      </div>
    `;
  }
}

export const draggableTabsTemplate = html`
  <default-draggable-tabs-sandbox></default-draggable-tabs-sandbox>
`;
