import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property, query } from "lit-element";
import Papa from "papaparse";
//import { classMap } from "lit-html/directives/class-map.js";
//import styles from "./scss/module.scss";

@customElement("md-table")
export class Table extends LitElement {
  @property({ type: String }) src = '"id", "Product Name", "Quantity", "Price", "Date Purchased" \n "0", "Cappuccino", "8", "5", "Wed Feb 26 2020 00:00:00 GMT+0200 (Eastern European Standard Time)"';

  @query(".md-table") table: HTMLDivElement | undefined;

  csvData: any[] = [];
  headerRow: any[] = [];
  config = {
    quoteChar: '"',
    escapeChar: '"',
    header: true,
    preview: 0,
    comments: false,
    step: undefined,
    complete: undefined,
    download: false
  }

  results = Papa.parse(this.src, this.config);

  connectedCallback() {
    super.connectedCallback();
    console.log(this.results);
  }

  static get styles() {
    return [reset];
  }

  render() {
    return html`
      <div class="md-table">
         <table id="csv-table">
          <thead>
            <tr id="csv-table__header">
              ${this.results.meta.fields!.map((i: any) => html`<th>${i}</th>`)}
              <!-- <th>No data Loaded</th>   -->
            </tr>
          </thead>
          <tbody id="csv-table__body">
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