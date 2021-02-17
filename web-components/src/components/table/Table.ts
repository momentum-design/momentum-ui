/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reset from "@/wc_scss/reset.scss";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { html, internalProperty, LitElement, property, PropertyValues, query, queryAll } from "lit-element";
import Papa from "papaparse";
import { classMap } from "lit-html/directives/class-map.js";
import styles from "./scss/module.scss";
import { nothing } from "lit-html";
import { repeat } from "lit-html/directives/repeat";

export const formatType = ["number", "default"] as const;

export namespace Table {
  export type Format = typeof formatType[number];

  type headerCol = {
    name: string;
    width: string;
  };

  @customElementWithCheck("md-table")
  export class ELEMENT extends LitElement {
    @property({ type: String }) tabledata = "";
    @property({ type: Array }) headerdata: headerCol[] = [];
    @property({ type: Boolean }) zebra = false;
    @property({ type: Boolean }) clean = false;
    @property({ type: Boolean }) sorting = false;
    @property({ type: String }) nodata = "No data Loaded";
    @property({ type: Boolean }) stickheader = false;
    @property({ type: String }) label = "Table";
    @property({ type: Boolean, attribute: "no-borders" }) noBorders = false;
    @property({ type: String }) format: Table.Format = "default";
    @property({ type: String }) warning = "***";
    @property({ type: String }) errors = "xxx";
    @property({ type: String }) info = "!!!";

    @internalProperty() private sort = { columnName: "", sortting: false };
    @internalProperty() csvData: any = undefined;

    headerRow: any;
    results: any;
    config = {
      quoteChar: '"',
      escapeChar: '""',
      header: false,
      preview: 0,
      comments: false,
      step: undefined,
      complete: undefined,
      download: false
    };

    connectedCallback() {
      super.connectedCallback();
      this.results = Papa.parse(this.tabledata, this.config);
      this.headerRow = this.headerdata;
      this.csvData = this.results.data;
      this.requestUpdate("tabledata");
    }

    sortTab(ev: Event, key: any) {
      const elCell = ev.target as HTMLTableElement;
      const sortArr = Array.from(this.csvData);
      const index = key;
  
      function compare(a: any, b: any) {
        const bandA = a[index].toLowerCase();
        const bandB = b[index].toLowerCase();
        if (bandA > bandB) {
          return 1;
        } else if (bandA < bandB) {
          return -1;
        } else {
          return 0;
        }
      }
  
      if (key !== this.sort.columnName || this.sort.sortting !== true) {
        sortArr.sort(compare);
        this.sort.sortting = true;
        elCell.classList.remove("sortedZyx");
        elCell.classList.add("sortedAbc");
      } else {
        sortArr.reverse();
        this.sort.sortting = false;
        elCell.classList.remove("sortedAbc");
        elCell.classList.add("sortedZyx");
      }
  
      this.sort.columnName = key;
  
      this.csvData = sortArr;
      this.requestUpdate("csvData");
    }

    protected update(changedProperties: PropertyValues) {
      super.update(changedProperties);
      if (changedProperties.has("tabledata")) {
        this.results = Papa.parse(this.tabledata, this.config);
        this.headerRow = this.headerdata;
        this.csvData = this.results.data;
      }
    }

    static get styles() {
      return [reset, styles];
    }

    get tableClassMap() {
      return {
        "md-table--clean": this.clean,
        "md-table--no-borders": this.noBorders,
        "md-table--stripped": this.zebra,
        "md-table--sorting": this.sorting
      };
    }

    render() {
      return html`
        <div class=${`md-table-container ` + `${this.stickheader ? "md-table-container_stickly" : nothing}`}>
          ${this.csvData.length != 0
            ? html`
                <table
                  class="md-table ${classMap(this.tableClassMap)}"
                  tabindex="0"
                  role="table"
                  aria-label="${this.label}"
                >
                  <thead class="md-table__header" role="rowgroup" tabindex="0">
                    <tr role="row">
                      ${repeat(
                        this.headerRow,
                        (item: headerCol) => item.name,
                        (item: any, i) => html`
                          <th role="columnheader" width="${item.width}">
                            ${this.sorting
                              ? html`
                                  <span>${item.name}</span>
                                  <md-button @click=${(e: CustomEvent) => this.sortTab(e, i)} color="color-none" hasRemoveStyle><md-icon slot="icon" name="arrow-filled-down_12"></md-icon></md-button>
                                `
                              : html`
                                  <span>${item.name}</span>
                                `}
                          </th>
                        `
                      )}
                      
                    </tr>
                  </thead>
                  <tbody class="md-table__body" role="rowgroup">
                    ${this.csvData.map(
                      (row: any, rowIndex: number) =>
                        html`
                          <tr tabindex="0" role="row" part=${rowIndex === 0 ? "first-row" : "row"}>
                            ${row.map((item: any, itemIndex: number) => {
                              const formattedItem =
                                this.format === "number" && itemIndex !== 0 ? Number(item).toLocaleString() : item;
                              return html`
                                <td part=${itemIndex === 0 ? "left-cell" : "cell"} role="cell">
                                  <div class="inner-cell">
                                    ${formattedItem.includes(this.warning)
                                      ? html`
                                        <span class="warning">${formattedItem.replace(this.warning, "")}</span>
                                        <md-icon name="warning_24" color="yellow"></md-icon>
                                      `
                                      : formattedItem.includes(this.errors)
                                        ? html`
                                          <span class="warning">${formattedItem.replace(this.errors, "")}</span>
                                          <md-icon name="error_24" color="red"></md-icon>
                                        `
                                      : formattedItem.includes(this.info)
                                        ? html`
                                          <span class="warning">${formattedItem.replace(this.info, "")}</span>
                                          <md-icon name="warning_24" color="blue"></md-icon>
                                        `  
                                      : html`<span>${formattedItem}</span>`
                                    }
                                  </div>
                                </td>
                              `;
                            })}
                          </tr>
                        `
                    )}
                  </tbody>
                </table>
              `
            : html`
                <p>${this.nodata}</p>
              `}
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-table": Table.ELEMENT;
  }
}
