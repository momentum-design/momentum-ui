import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property, query } from "lit-element";
import Papa from "papaparse";
import { classMap } from "lit-html/directives/class-map.js";
import styles from "./scss/module.scss";

@customElement("md-table")
export class Table extends LitElement {
  @property({ type: String }) tabledata = "";
  @property({ type: Boolean }) zebra = false;
  @property({ type: Boolean }) clean = false;

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

  connectedCallback() {
    super.connectedCallback();
    this.results = Papa.parse(this.tabledata, this.config);
    this.headerRow = this.results.data[0];
    this.csvData = this.results.data.slice(1, this.results.data.length);
  }

  static get styles() {
    return [reset, styles];
  }

  get tableClassMap() {
    return {
      "md-table--clean": this.clean,
      "md-table--stripped": this.zebra
    };
  }

  render() {
    return html`
      <div class="md-table-container">
         <table class="md-table ${classMap(this.tableClassMap)}">
          <thead class="md-table__header">
            <tr>
              ${this.headerRow.map((i: any) => html`<th>${i}</th>`)}
              <!-- <th>No data Loaded</th>   -->
            </tr>
          </thead>
          <tbody class="md-table__body">
            ${this.csvData.map((row: any) => html`<tr>${row.map((item: any) => html`<td>${item}</td>`)}</tr>`)}
          </tbody>
        </table>
        
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-table": Table;
  }
}