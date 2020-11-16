import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property } from "lit-element";
import styles from "./scss/module.scss";
import { repeat } from "lit-html/directives/repeat";
import { ifDefined } from "lit-html/directives/if-defined";


@customElement("md-pagination")
export class Pagination extends LitElement {
  @property({ type: String }) label = "";

  static get styles() {
    return [reset, styles];
  }

  render() {
    return html`
      <ul class="md-pagination" role="navigation" aria-label="Pagination">
        <li>
          <a href="#">

          </a>
        </li>
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-pagination": Pagination;
  }
}
