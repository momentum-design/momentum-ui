
import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property } from "lit-element";
//import { classMap } from "lit-html/directives/class-map.js";
//import styles from "./scss/module.scss";

@customElement("md-table")
export class Table extends LitElement {
  @property({ type: String }) size = "";

  static get styles() {
    return [reset];
  }

  render() {
    return html`
      <div class="md-table">
        Test md-table
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-table": Table;
  }
}