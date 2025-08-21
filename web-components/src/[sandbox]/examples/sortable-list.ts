import { css, customElement, html, internalProperty, LitElement } from "lit-element";
import "@/components/button/Button";
import "@/components/sortable-list/sortable-list";
import "@/components/sortable-list/sortable-list-item";
import "@/components/menu-overlay/MenuOverlay";
import "@/components/list/List";
import { repeat } from "lit-html/directives/repeat";

export const cardMenuItems = ["Edit", "View", "Duplicate", "Delete"];

@customElement("default-sortable-list-sandbox")
export class DefaultSortableListSandbox extends LitElement {
  @internalProperty() lastClickedText = "";

  render() {
    return html`<h4>Default - Sort / Drag disabled - Expandable items</h4>
      <md-sortable-list>
        ${[1, 2, 3, 4, 5].map(
          (item) =>
            html`<md-sortable-list-item label="Item ${item}" expandable>
              <span slot="trailing-controls">${item * 20} / 100</span>
              <md-menu-overlay
                slot="trailing-controls"
                @mousedown=${(e: Event) => e.stopPropagation()}
                @click=${(e: Event) => e.stopPropagation()}
              >
                <md-button circle variant="ghost" slot="menu-trigger">
                  <md-icon name="more-adr-bold" size="16" iconSet="momentumDesign"></md-icon>
                </md-button>
                <md-list>
                  ${["Sub-item 1", "Sub-item 2", "Sub-item 3"].map(
                    (item) => html`
                      <md-list-item
                        slot="list-item"
                        @mousedown=${(e: MouseEvent) => e.stopPropagation()}
                        @click=${() => (this.lastClickedText = item)}
                      >
                        ${item}
                      </md-list-item>
                    `
                  )}
                </md-list>
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
            </md-sortable-list-item>`
        )}
        <strong>Last clicked text: ${this.lastClickedText}</strong>
      </md-sortable-list>

      <h4>Sortable List - Non-expandable items</h4>
      <md-sortable-list sort animation="200">
        ${repeat(
          [1, 2, 3, 4, 5],
          (i) => i,
          (item) =>
            html`<md-sortable-list-item label="Item ${item}">
              <md-icon slot="dragger" name="dragger-horizontal-bold" iconSet="momentumDesign" size="14"></md-icon>
            </md-sortable-list-item>`
        )}
      </md-sortable-list>

      <h3>Nested Sortable Lists</h3>
      <md-sortable-list sort animation=${200} swapThreshold=${0.65}>
        <md-sortable-list-item label="Item 1" expandable>
          <md-sortable-list
            slot="panel"
            sort
            animation="200"
            .group=${{ name: "nested" }}
            fallbackOnBody
            invertSwap
            swapThreshold=${0.65}
          >
            <md-sortable-list-item label="Sub-item 1">
              <md-icon slot="dragger" name="dragger-horizontal-bold" iconSet="momentumDesign" size="14"></md-icon>
            </md-sortable-list-item>
            <md-sortable-list-item label="Sub-item 2">
              <md-icon slot="dragger" name="dragger-horizontal-bold" iconSet="momentumDesign" size="14"></md-icon>
            </md-sortable-list-item>
          </md-sortable-list>
          <md-icon slot="dragger" name="dragger-horizontal-bold" iconSet="momentumDesign" size="14"></md-icon>
        </md-sortable-list-item>
        <md-sortable-list-item label="Item 2" expandable>
          <md-icon slot="dragger" name="dragger-horizontal-bold" iconSet="momentumDesign" size="14"></md-icon>

          <md-sortable-list
            sort
            animation="200"
            slot="panel"
            .group=${{ name: "nested" }}
            fallbackOnBody
            invertSwap
            swapThreshold=${0.65}
          >
            <md-sortable-list-item label="Sub-item 1">
              <md-icon slot="dragger" name="dragger-horizontal-bold" iconSet="momentumDesign" size="14"></md-icon>
            </md-sortable-list-item>
            <md-sortable-list-item label="Sub-item 2">
              <md-icon slot="dragger" name="dragger-horizontal-bold" iconSet="momentumDesign" size="14"></md-icon>
            </md-sortable-list-item>
          </md-sortable-list>
        </md-sortable-list-item>
        <md-sortable-list-item label="Item 3">
          <md-icon slot="dragger" name="dragger-horizontal-bold" iconSet="momentumDesign" size="14"></md-icon>
          <button slot="trailing-controls">Action</button>
        </md-sortable-list-item>
      </md-sortable-list> `;
  }

  static get styles() {
    return css`
      md-sortable-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    `;
  }
}

export const sortableListTemplate = html`<default-sortable-list-sandbox></default-sortable-list-sandbox>`;
