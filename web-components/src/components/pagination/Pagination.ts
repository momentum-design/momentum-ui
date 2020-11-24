import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property } from "lit-element";
import styles from "./scss/module.scss";
import "./PaginationItem";
import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import { repeat } from "lit-html/directives/repeat";
import { nothing } from "lit-html";

export type direction = "previous" | "next";
export const paginationItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export type layout = "normal" | "simple";

@customElement("md-pagination")
export class Pagination extends LitElement {
  @property({ type: String }) direction: direction = "previous";
  @property({ type: Number }) total = 10;
  @property({ type: Number, attribute: "page-size" }) pageSize = 5;
  @property({ type: Number, attribute: "current-page" }) currentPage = 1;
  @property({ type: Boolean, attribute: "arrows" }) isArrows = false;
  @property({ type: Boolean, attribute: "dots" }) isDots = false;
  @property({ type: Array, attribute: "pagination-items", reflect: true }) paginationItems = [];
  @property({ type: String }) layout = "normal";

  static get styles() {
    return [reset, styles];
  }

  get paginationClassMap() {
    return {
      "has-arrows": this.isArrows,
      "has-dots": this.isDots
    };
  }

  buttonTemplate(direction: string) {
    return html`
      <button type="button" role="button" class="md-pagination-nav" aria-label=${direction}>
        ${this.isArrows
          ? html`
              <md-icon name=${direction === "previous" ? "icon-arrow-left_16" : "icon-arrow-right_16"}></md-icon>
            `
          : html`
              <slot></slot>
            `}
      </button>
    `;
  }

  dotsTemplate() {
    return html`
      <ol class="md-pagination-dots">
        ${repeat(
          paginationItems,
          paginationItems => html`
            <li>${paginationItems}</li>
          `
        )}
      </ol>
    `;
  }

  render() {
    return html`
      <nav class="md-pagination ${classMap(this.paginationClassMap)}" role="navigation" part="pagination">
        ${this.isArrows ? this.buttonTemplate("previous") : nothing}
        ${this.paginationItems
          ? html`
              <ul class="md-pagination-list">
                ${repeat(
                  paginationItems,
                  paginationItems => html`
                    <li>${paginationItems}</li>
                  `
                )}
              </ul>
            `
          : nothing}
        ${this.isArrows ? this.buttonTemplate("next") : nothing} ${this.isDots ? this.dotsTemplate() : nothing}
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-pagination": Pagination;
  }
}
