/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reset from "@/wc_scss/reset.scss";
import { customElement, html, internalProperty, LitElement, property, query } from "lit-element";
import Papa from "papaparse";
import { classMap } from "lit-html/directives/class-map.js";
import styles from "./scss/module.scss";
import { nothing } from "lit-html";

@customElement("md-table")
export class Table extends LitElement {
  @property({ type: String }) tabledata = "";
  @property({ type: Boolean }) zebra = false;
  @property({ type: Boolean }) clean = false;
  @property({ type: Boolean }) sorting = false;

  @internalProperty() private sort = { columnName: "", sortting: false };
  @internalProperty() private sorted = false;
  @internalProperty() private sortedABC = false;


  //@query(".md-table__body") tableRow!: HTMLTableElement;

  csvData: any;
  headerRow: any;
  results: any;
  config = {
    quoteChar: '"',
    escapeChar: '"',
    header: false,
    preview: 0,
    comments: false,
    step: undefined,
    complete: undefined,
    download: false
  }

  configSort = {
    quoteChar: '"',
    escapeChar: '"',
    header: true,
    preview: 0,
    step: undefined,
    complete: undefined
  }

  connectedCallback() {
    super.connectedCallback();
    this.results = Papa.parse(this.tabledata, this.config);
    this.headerRow = this.results.data[0];
    this.csvData = this.results.data.slice(1, this.results.data.length);
  }

  sortTab(ev: Event, key: any) {
    const elCell = ev.target as HTMLTableElement;
    const sortArr = Array.from(this.csvData); 
    const index = this.headerRow.indexOf(key);
    this.sorted = true;

    function compare(a: any, b: any) {
      const bandA = a[index].toUpperCase();
      const bandB = b[index].toUpperCase();

      console.log(bandA);
      let comparison = 0;
      if (bandA > bandB) {
        comparison = 1;
      } else if (bandA < bandB) {
        comparison = -1;
      }
      return comparison;
    }

    if (key !== this.sort.columnName || this.sort.sortting !== true) {
      sortArr.sort(compare);
      this.sort.sortting = true;
      this.sortedABC = true;
      elCell.setAttribute("class", "sortedAbc");
    } else {
      sortArr.reverse();
      this.sort.sortting = false;
      this.sortedABC = false;
      elCell.removeAttribute("class");
      elCell.setAttribute("class", "sortedZ");
    }

    this.sort.columnName = key;

    this.csvData = sortArr;
    this.requestUpdate("csvData");
    console.log(elCell);
  }

  static get styles() {
    return [reset, styles];
  }

  get tableClassMap() {
    return {
      "md-table--clean": this.clean,
      "md-table--stripped": this.zebra,
      "md-table--sorting": this.sorting
    };
  }

  render() {
    return html`
      <div class="md-table-container">
        ${this.csvData.length !== 0
          ? html`<table class="md-table ${classMap(this.tableClassMap)}">
              <thead class="md-table__header">
                <tr>
                  ${this.headerRow.map((i: any) => html`<th>${this.sorting ? html`<a @click=${(e: CustomEvent) => this.sortTab(e, i)}>${i}</a>` : html`${i}`}</th>`)}
                </tr>
              </thead>
              <tbody class="md-table__body">
                ${this.csvData.map((row: any) => html`<tr>${row.map((item: any) => html`<td>${item}</td>`)}</tr>`)}
              </tbody>
            </table>`
          : html`<p>No data Loaded</p>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-table": Table;
  }
}