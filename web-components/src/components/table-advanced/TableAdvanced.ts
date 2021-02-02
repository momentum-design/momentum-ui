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
  };

  type Col =
    // | { parentName: string; children: Col[] }
    {
      id: string;
      title: string;
      groupRows?: boolean;
      highlight?: boolean;
      sort?: boolean | SortComparator;
      filters?: Filter[];
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
