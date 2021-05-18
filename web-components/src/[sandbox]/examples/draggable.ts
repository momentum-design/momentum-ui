import "@/components/draggable-tabs/DraggableTabs";
import "@/components/draggable-tabs/DraggableTab";
import "@/components/checkbox/Checkbox";
import "@/components/icon/Icon";
import "@/components/toggle-switch/ToggleSwitch";
import "@/components/modal/Modal";
import { css, customElement, html, property, internalProperty, LitElement } from "lit-element";
import { DraggableOptions } from "@/[sandbox]/sandbox.mock";
import { repeat } from "lit-html/directives/repeat";

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

  @property({ type: Boolean }) isDialogOpen = false;
  @property({ type: Boolean }) closeTabActive = false;
  @property({ type: String }) tabTitle = 'Contact History';

  private handleTabCrossClick(event: CustomEvent<TabClickEvent>) {
    console.log('Handled Cross Click Outside', event.detail)
    this.isDialogOpen = true;
    this.tabTitle = 'History'
  }

  private setupTabsEvents() {
    this.addEventListener("tab-action-button-click", this.handleTabCrossClick as EventListener);
  }

  private teardownTabsEvents() {
    this.removeEventListener("tab-action-button-click", this.handleTabCrossClick as EventListener);
  }

  private closeDialog() {
    this.isDialogOpen = false;
  }


  protected firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    this.setupTabsEvents();
  }

  render() {
    return html`
    <md-modal
        htmlId="modal-2"
        ?show=${this.isDialogOpen}
        headerLabel="Remove Tab"
        size="dialog"
        closeBtnName="Ok"
        showCloseButton
        @close-modal="${this.closeDialog}"
      >
        <p>
          Are you sure you want to delete the Tab
        </p>
      </md-modal>
      <div style="max-width: 800px;">
        <h3>Horizontal md-tabs with More button</h3>
        <div>
          <md-draggable-tabs selected="0" sort drag-class="custom-drag" ghost-class="custom-ghost">
            <md-draggable-tab ?closable=${this.closeTabActive} slot="tab">
              <md-icon name="recents_16"></md-icon>
              <span>Contact History</span>
              <md-icon slot="tabAction" style="display: inherit;" name="cancel_14" ></md-icon>
            </md-draggable-tab>
            <md-draggable-tab-panel slot="panel">
              <span>Content for "Contact History"</span>
            </md-draggable-tab-panel>
            <md-draggable-tab ?disabled=${this.closeTabActive} closable slot="tab">
              <md-icon name="apps_16"></md-icon>
              <span>Cisco WxM</span>
              <md-icon slot="tabAction" style="display: inherit;" name="cancel_14" ></md-icon>
            </md-draggable-tab>
            <md-draggable-tab-panel slot="panel">
              <span>Content for "WxM"</span>
            </md-draggable-tab-panel>
            <md-draggable-tab closable slot="tab">
              <md-icon name="alarm_16"></md-icon>
              <span>Cisco Answer</span>
              <md-icon slot="tabAction" style="display: inherit;" name="cancel_14" ></md-icon>
            </md-draggable-tab>
            <md-draggable-tab-panel slot="panel">
              <span>Content for "Cisco Answer"</span>
            </md-draggable-tab-panel>
            <md-draggable-tab closable slot="tab">
              <md-icon name="admin_16"></md-icon>
              <span>Cisco Admins</span>
              <md-icon slot="tabAction" style="display: inherit;" name="cancel_14" ></md-icon>
            </md-draggable-tab>
            <md-draggable-tab-panel slot="panel">
              <span>Content for "Cisco Admins"</span>
            </md-draggable-tab-panel>
            <md-draggable-tab closable slot="tab">
              <md-icon name="alert_16"></md-icon>
              <span>Cisco Widgets</span>
              <md-icon slot="tabAction" style="display: inherit;" name="cancel_14" ></md-icon>
            </md-draggable-tab>
            <md-draggable-tab-panel slot="panel">
              <span>Content for "Cisco Widgets"</span>
            </md-draggable-tab-panel>
            <md-draggable-tab closable slot="tab">
              <md-icon name="browser_16"></md-icon>
              <span>Cisco News</span>
              <md-icon slot="tabAction" style="display: inherit;" name="cancel_14" ></md-icon>
            </md-draggable-tab>
            <md-draggable-tab-panel slot="panel">
              <span>Content for "Cisco News"</span>
            </md-draggable-tab-panel>
            <md-draggable-tab closable slot="tab">
              <md-icon name="month_16"></md-icon>
              <span>Cisco Weather</span>
              <md-icon slot="tabAction" style="display: inherit;" name="cancel_14" ></md-icon>
            </md-draggable-tab>
            <md-draggable-tab-panel slot="panel">
              <span>Content for "Cisco Weather"</span>
            </md-draggable-tab-panel>
          </md-draggable-tabs>
        </div>
      </div>
    `;
  }
}

export const draggableTemplate = html`
  <default-draggable-tabs-sandbox></default-draggable-tabs-sandbox>
`;
