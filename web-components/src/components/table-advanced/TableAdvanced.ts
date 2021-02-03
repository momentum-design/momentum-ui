/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property } from "lit-element";
import styles from "./scss/module.scss";

export namespace TableAdvanced {
  export type Config = {
    isStickyHeader?: boolean;
    isInfiniteScroll?: boolean;

    cols: {
      define: Col[];
      isResizable?: boolean;
      isDraggable?: boolean;
    };

    rows?: {
      isResizable?: boolean;
      isDraggable?: boolean;
      selectable?: "none" | "single" | "multiple";
    };

    sort?: {
      colId: string;
      order: SortOrder;
    };

    head?: {
      caption?: string;
      summary?: string;
      isSummaryVisible?: boolean;
    };
  };

  type Col =
    // | { parentName: string; children: Col[] }
    {
      id: string;
      title: string;
      sort?: boolean | SortComparator;
      filters?: Filter[]; // ???
      isHeader?: boolean; // highlight
      isGroupedRows?: boolean;
    };

  type SortOrder = "ascending" | "descending";
  type SortComparator = (a: string, b: string, order: SortOrder) => number; // -number, 0, number
  type Filter = { name: string; func: () => void; funcValidate?: () => void };

  @customElement("md-table-advanced")
  export class ELEMENT extends LitElement {
    @property({ attribute: false }) config!: Config;
    @property({ attribute: false }) data!: string[][];

    connectedCallback() {
      super.connectedCallback();
    }

    static get styles() {
      return [reset, styles];
    }

    renderTable() {
      return html`
        <table>
          <thead>
            <tr>
              ${this.config.cols.define.map(
                col =>
                  html`
                    <th>${col.title}</th>
                  `
              )}
            </tr>
          </thead>
          <tbody>
            ${this.data.map(
              colDat => html`
                <tr>
                  ${colDat.map(
                    rowData => html`
                      <td>${rowData}</td>
                    `
                  )}
                </tr>
              `
            )}
          </tbody>
        </table>
      `;
    }

    render() {
      return html`
        <div class="md-table-advanced">
          ${this.renderTable()}
          

          <!-- Web Accessibility TABLE -->
          <!-- https://www.w3.org/WAI/tutorials/tables/ -->

          <table summary="if (head.isSummaryVisible == true) 'head.summary'">
            <caption>Table caption:<br>
              <span>Summary</span>
            </caption>

            <colgroup span="2"></colgroup>
            <col>
            <colgroup span="2"></colgroup>

            <tr>
              <th colspan="2" scope="colgroup">Mars</th>
              <th rowspan="2"></th>
              <th colspan="2" scope="colgroup">Venus</th>
            </tr>
            <tr>
              <th scope="col">Produced</th>
              <th scope="col">Sold</th>
              <th scope="col">Produced</th>
              <th scope="col">Sold</th>
            </tr>
            <tr>
              <td>50,000</td>
              <td>30,000</td>
              <th scope="row">One</th>
              <td>100,000</td>
              <td>80,000</td>
            </tr>
            <tr>
              <td>10,000</td>
              <td>5,000</td>
              <th scope="row">Two</th>
              <td>12,000</td>
              <td>9,000</td>
            </tr>
          </table>

        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-table-advanced": TableAdvanced.ELEMENT;
  }
}
