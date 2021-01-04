/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reset from "@/wc_scss/reset.scss";
import { customElement, html, internalProperty, LitElement, property, PropertyValues } from "lit-element";
import Papa from "papaparse";
import { classMap } from "lit-html/directives/class-map.js";
import styles from "./scss/module.scss";
import { nothing } from "lit-html";

export const formatType = ["number"] as const;

export namespace Table {
  export type Format = typeof formatType[number];
}

@customElement("md-table")
export class Table extends LitElement {
  @property({ type: String }) tabledata = "";
  @property({ type: Boolean }) zebra = false;
  @property({ type: Boolean }) clean = false;
  @property({ type: Boolean }) sorting = false;
  @property({ type: String }) nodata = "No data Loaded";
  @property({ type: Boolean }) stickheader = false;
  @property({ type: String }) label = "Table";
  @property({ type: Boolean, attribute: "no-borders" }) noBorders = false;
  @property({ type: String }) format: Table.Format | undefined = undefined;

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
    this.headerRow = this.results.data[0];
    this.csvData = this.results.data.slice(1, this.results.data.length);
    this.requestUpdate("tabledata");
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
                    ${this.headerRow.map(
                      (i: any) =>
                        html`
                          <th role="columnheader">
                            ${this.sorting
                              ? html`
                                  <a @click=${(e: CustomEvent) => this.sortTab(e, i)}>${i}</a>
                                `
                              : html`
                                  ${i}
                                `}
                          </th>
                        `
                    )}
                  </tr>
                </thead>
                <tbody class="md-table__body" role="rowgroup">
                  ${this.csvData.map(
                    (row: any) =>
                      html`
                        <tr tabindex="0" role="row">
                          ${row.map(
                            (item: any, index: number) => {
                              const formattedItem = (this.format === 'number' && index !== 0) ?  Number(item).toLocaleString() : item;
                              return html`
                                <td part="cell" role="cell">${formattedItem}</td>
                              `
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

declare global {
  interface HTMLElementTagNameMap {
    "md-table": Table;
  }
}
