import { customElement, html, internalProperty, LitElement } from "lit-element";
import "@/components/button/Button";
import "@/components/list-v2/list-v2";
import "@/components/list-v2/list-item-v2";
import "@/components/menu-overlay/MenuOverlay";
import "@/components/list/List";

export const cardMenuItems = ["Edit", "View", "Duplicate", "Delete"];

@customElement("list-v2-sandbox")
export class DefaultListV2Sandbox extends LitElement {
  @internalProperty() lastClickedText = "";

  render() {
    return html`<h4>Default - Expandable items</h4>
      <md-list-v2>
        ${[1, 2, 3, 4, 5].map(
          (item) =>
            html`<md-list-item-v2 label="Item ${item}" expandable variant="inset-rectangle">
              <span slot="trailing-controls">${item * 20} / 100</span>
              <md-menu-overlay slot="trailing-controls">
                <md-button circle variant="ghost" slot="menu-trigger">
                  <md-icon name="more-adr-bold" size="16" iconSet="momentumDesign"></md-icon>
                </md-button>
                <md-list-v2>
                  ${[1, 2, 3].map((item) => html` <md-list-item-v2 label="Sub-item ${item}"></md-list-item-v2> `)}
                </md-list-v2>
              </md-menu-overlay>
              <md-card
                slot="panel"
                .menuOptions=${cardMenuItems}
                id="123456789"
                title="Team A Report - Q1"
                subtitle="Updated 2 hours ago"
                info="Lorem Ipsum is simply sample text of the printing and typesetting industry."
              >
                <div slot="content">
                  <img
                    style="width: 100%;"
                    src="https://freepngimg.com/download/business/66729-google-business-big-analysis-analytics-data.png"
                    alt=""
                  />
                </div>

                <md-badge slot="footer" color="violet" small>Active</md-badge>
                <md-badge slot="footer" color="mint" small>Stock Report</md-badge>
                <md-badge slot="footer" color="gold" small>Team Report</md-badge>
                <md-badge slot="footer" color="lime" small>Team A</md-badge>
                <md-badge slot="footer" color="blue" small>TA</md-badge>
                <md-badge slot="footer" color="orange" small>Team B</md-badge>
                <md-badge slot="footer" color="blue" small>Some long long label</md-badge>
                <md-badge slot="footer" color="pink" small>Confidential</md-badge>
              </md-card>
            </md-list-item-v2>`
        )}
      </md-list-v2>

      <h4>Inset-pill variant</h4>
      <md-list-v2 gap="sm">
        ${[1, 2, 3, 4, 5].map(
          (item) => html`<md-list-item-v2 label="Item ${item}" variant="inset-pill"></md-list-item-v2>`
        )}
      </md-list-v2>

      <h3>Nested Lists</h3>
      <md-list-v2>
        <md-list-item-v2 label="Item 1" expandable>
          <md-list-v2>
            <md-list-item-v2 label="Sub-item 1"></md-list-item-v2>
            <md-list-item-v2 label="Sub-item 2"></md-list-item-v2>
          </md-list-v2>
        </md-list-item-v2>
        <md-list-item-v2 label="Item 2" expandable>
          <md-list-v2 slot="panel">
            <md-list-item-v2 label="Sub-item 1"></md-list-item-v2>
            <md-list-item-v2 label="Sub-item 2"></md-list-item-v2>
          </md-list-v2>
        </md-list-item-v2>
        <md-list-item-v2 label="Item 3">
          <button slot="trailing-controls">Action</button>
        </md-list-item-v2>
      </md-list-v2> `;
  }
}

export const listV2Template = html`<list-v2-sandbox></list-v2-sandbox>`;
