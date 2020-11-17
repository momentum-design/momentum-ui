import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property } from "lit-element";
import styles from "./scss/module.scss";
import "./PaginationItem";

@customElement("md-pagination")
export class Pagination extends LitElement {

  static get styles() {
    return [reset, styles];
  }

  render() {
    return html`
      <nav class="md-pagination" role="navigation">
        <slot name="nav-item"></slot>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-pagination": Pagination;
  }
}
