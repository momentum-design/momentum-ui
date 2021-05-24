import "@/components/draggable-tabs/DraggableTabs";
import "@/components/draggable-tabs/DraggableTab";
import "@/components/checkbox/Checkbox";
import "@/components/icon/Icon";
import "@/components/toggle-switch/ToggleSwitch";
import "@/components/modal/Modal";
import { css, customElement, html, property, LitElement, PropertyValues } from "lit-element";
import { DraggableOptions } from "@/[sandbox]/sandbox.mock";
import { repeat } from "lit-html/directives/repeat";

const tabsOverlayHtmlList = ["All templates", "Only Fb Template", ...Array(20)].map(
  (value, index, array) => html`
    <md-draggable-tab closable slot="tab">
      <md-icon name="recents_16"></md-icon>
      <span>${value || "Tab " + index}</span>
    </md-draggable-tab>

    <md-draggable-tab-panel slot="panel">
      <span>Content for "Tab ${index}"</span>
    </md-draggable-tab-panel>
  `
);

const draggableItemStyle = css`
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

  @property({ type: String }) tabTitle = "Contact History";
  @property({ type: Boolean }) tabDisabled = true;

  private handleTabClick(event: any) {
    this.tabDisabled = true;
  }

  private setupTabsEvents() {
    this.addEventListener("tab-click", this.handleTabClick as EventListener);
  }

  protected firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    this.setupTabsEvents();
  }

  render() {
    return html`
      <div style="max-width: 800px;">
        <h3>Horizontal md-tabs with More button</h3>
        <div>
          <md-draggable-tabs selected="0" justified draggable drag-class="custom-drag" ghost-class="custom-ghost">
            <md-draggable-tab disabled aria-label="Contact History" closable slot="tab" label="History">
              <md-icon name="recents_16"></md-icon>
              <span>${this.tabTitle}</span>
            </md-draggable-tab>
            <md-draggable-tab-panel slot="panel">
              <span>Content for "Contact History"</span>
            </md-draggable-tab-panel>
            <md-draggable-tab aria-label="Cisco WXM" closable slot="tab" label="WxM">
              <md-icon name="apps_16"></md-icon>
              <span>Cisco WxM</span>
            </md-draggable-tab>
            <md-draggable-tab-panel slot="panel">
              <span>Content for "WxM"</span>
            </md-draggable-tab-panel>
            <md-draggable-tab aria-label="Cisco Answer" closable slot="tab">
              <md-icon name="alarm_16"></md-icon>
              <span>Cisco Answer</span>
            </md-draggable-tab>
            <md-draggable-tab-panel slot="panel">
              <span>Content for "Cisco Answer"</span>
            </md-draggable-tab-panel>
            <md-draggable-tab aria-label="Cisco Admins" closable slot="tab">
              <md-icon name="admin_16"></md-icon>
              <span>Cisco Admins</span>
            </md-draggable-tab>
            <md-draggable-tab-panel slot="panel">
              <span>Content for "Cisco Admins"</span>
            </md-draggable-tab-panel>
            <md-draggable-tab aria-label="Cisco Widgets" closable slot="tab">
              <md-icon name="alert_16"></md-icon>
              <span>Cisco Widgets</span>
            </md-draggable-tab>
            <md-draggable-tab-panel slot="panel">
              <span>Content for "Cisco Widgets"</span>
            </md-draggable-tab-panel>
            <md-draggable-tab aria-label="Cisco News" closable slot="tab">
              <md-icon name="browser_16"></md-icon>
              <span>Cisco News</span>
            </md-draggable-tab>
            <md-draggable-tab-panel slot="panel">
              <span>Content for "Cisco News"</span>
            </md-draggable-tab-panel>
            <md-draggable-tab aria-label="Cisco Weather" closable slot="tab">
              <md-icon name="month_16"></md-icon>
              <span>Cisco Weather</span>
            </md-draggable-tab>
            <md-draggable-tab-panel slot="panel">
              <span>Content for "Cisco Weather"</span>
            </md-draggable-tab-panel>
            <md-draggable-tab aria-label="Cisco Turbo" closable slot="tab">
              <md-icon name="camera-photo_16"></md-icon>
              <span>Cisco Turbo</span>
            </md-draggable-tab>
            <md-draggable-tab-panel slot="panel">
              <span>Content for "Cisco Turbo"</span>
            </md-draggable-tab-panel>
          </md-draggable-tabs>
        </div>
        <br />
        <div style="max-width: 400px;">
          <h3>md-tabs justified</h3>
          <md-draggable-tabs selected="0" justified draggable drag-class="custom-drag" ghost-class="custom-ghost">
            <md-draggable-tab slot="tab">
              <span>All</span>
            </md-draggable-tab>
            <md-draggable-tab-panel slot="panel">
              <span>Content for "Contact History"</span>
            </md-draggable-tab-panel>
            <md-draggable-tab slot="tab">
              <md-icon name="apps_16"></md-icon>
            </md-draggable-tab>
            <md-draggable-tab-panel slot="panel">
              <span>Content for "WxM"</span>
            </md-draggable-tab-panel>
            <md-draggable-tab slot="tab">
              <md-icon name="browser_16"></md-icon>
            </md-draggable-tab>
            <md-draggable-tab-panel slot="panel">
              <span>Content for "Third Tab"</span>
            </md-draggable-tab-panel>
            <md-draggable-tab slot="tab">
              <md-icon name="alert_16"></md-icon>
            </md-draggable-tab>
            <md-draggable-tab-panel slot="panel">
              <span>Content for "Fourth Tab"</span>
            </md-draggable-tab-panel>
          </md-draggable-tabs>
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
            <md-draggable-tabs draggable drag-class="custom-drag" ghost-class="custom-ghost" selected="1" more-items-scroll-limit="4">
              ${repeat(tabsOverlayHtmlList, _html => _html)}
            </md-draggable-tabs>
          </div>
        </md-menu-overlay>
      </div>
    `;
  }
}

export const draggableTabsTemplate = html`
  <default-draggable-tabs-sandbox></default-draggable-tabs-sandbox>
`;
