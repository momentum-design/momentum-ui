import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property } from "lit-element";
import styles from "./scss/module.scss";
import { ifDefined } from "lit-html/directives/if-defined";

@customElement("md-nav")
export class PaginationItem extends LitElement {
  @property({ type: Number }) pageNum = 1;

  static get styles() {
    return [reset, styles];
  }

  render() {
    return html`
      <div class="md-pagination-item">
        ${this.pageNum}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-pagination-item": PaginationItem;
  }
}
