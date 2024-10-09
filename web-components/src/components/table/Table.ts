/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/icon/Icon";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, internalProperty, LitElement, property, PropertyValues, queryAll } from "lit-element";
import { nothing, TemplateResult } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import Papa from "papaparse";
import styles from "./scss/module.scss";

export const formatType = ["number", "default"] as const;
type Warn = { [key: number]: any };

export namespace Table {
  export type Format = (typeof formatType)[number];

  @customElementWithCheck("md-table")
  export class ELEMENT extends LitElement {
    @property({ type: String }) tabledata = "";
    @property({ type: Boolean }) zebra = false;
    @property({ type: Boolean }) clean = false;
    @property({ type: Boolean }) sorting = false;
    @property({ type: String }) nodata = "No data Loaded";
    @property({ type: Boolean }) stickheader = false;
    @property({ type: String }) label = "Table";
    @property({ type: Boolean, attribute: "no-borders" }) noBorders = false;
    @property({ type: String }) format: Table.Format = "default";
    @property({ type: Array }) warning: (any | Warn)[] = [];
    @property({ type: Array }) errors: (any | Warn)[] = [];

    @internalProperty() private sort = { columnName: "", sortting: false };
    @internalProperty() csvData: any = undefined;

    @queryAll('.md-table__body tr[role="row"]') rowTable?: HTMLTableRowElement[];

    headerRow: any;
    results: any;
    config: Papa.ParseConfig = {
      quoteChar: '"',
      escapeChar: '""',
      header: false,
      preview: 0,
      comments: false,
      step: undefined,
      complete: undefined
    };

    connectedCallback() {
      super.connectedCallback();

      this.results = Papa.parse(this.tabledata, this.config);
      this.headerRow = this.results.data[0];
      this.csvData = this.results.data.slice(1, this.results.data.length);
      this.requestUpdate("tabledata");
      this.linkCellItems();
    }

    get rowItem() {
      return this.rowTable;
    }

    linkCellItems() {
      const data = this.rowTable;

      data?.forEach((item, idx) => {
        this.warning.forEach((i) => {
          if (idx + 1 === i.row) {
            const cell = item.querySelectorAll('td[role="cell"');
            cell.forEach((c, id) => {
              if (id + 1 === i.col) {
                c.classList.add("warning");
                c.insertAdjacentHTML(
                  "beforeend",
                  '<md-icon name="warning-regular" size="24" iconSet="momentumDesign" color="var(--md-alert-warning-text-color)"></md-icon>'
                );
              }
            });
          }
        });
        this.errors.forEach((i) => {
          if (idx + 1 === i.row) {
            const cell = item.querySelectorAll('td[role="cell"');
            cell.forEach((c, id) => {
              if (id + 1 === i.col) {
                c.classList.add("error");
                c.insertAdjacentHTML(
                  "beforeend",
                  '<md-icon name="clear-bold" size="24" iconSet="momentumDesign" color="var(--md-alert-error-text-color)"></md-icon>'
                );
              }
            });
          }
        });
      });
    }

    sortTab(ev: Event, key: any) {
      const elCell = ev.target as HTMLTableElement;
      const sortArr = Array.from(this.csvData);
      const index = this.headerRow.indexOf(key);

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
        this.headerRow = this.results.data[0];
        this.csvData = this.results.data.slice(1, this.results.data.length);
        this.linkCellItems();
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

    getSortTemplate(key: any): TemplateResult | typeof nothing {
      if (this.sort.columnName !== key) {
        return nothing;
      }

      return html`
        <md-icon
          name=${this.sort.sortting ? "arrow-tail-down-bold" : "arrow-tail-up-bold"}
          iconSet="momentumDesign"
          size="12"
        ></md-icon>
      `;
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
                      ${this.headerRow.map(
                        (i: any) => html`
                          <th role="columnheader">
                            ${this.sorting
                              ? html`
                                  <a @click=${(e: CustomEvent) => this.sortTab(e, i)}>
                                    ${i}${this.getSortTemplate(i)}
                                  </a>
                                `
                              : html` ${i}`}
                          </th>
                        `
                      )}
                    </tr>
                  </thead>
                  <tbody class="md-table__body" role="rowgroup">
                    ${this.csvData.map(
                      (row: any, rowIndex: number) => html`
                        <tr tabindex="0" role="row" part=${rowIndex === 0 ? "first-row" : "row"}>
                          ${row.map((item: any, itemIndex: number) => {
                            const formattedItem =
                              this.format === "number" && itemIndex !== 0 ? Number(item).toLocaleString() : item;
                            return html`
                              <td part=${itemIndex === 0 ? "left-cell" : "cell"} role="cell">
                                <span>${formattedItem}</span>
                              </td>
                            `;
                          })}
                        </tr>
                      `
                    )}
                  </tbody>
                </table>
              `
            : html` <p>${this.nodata}</p> `}
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
