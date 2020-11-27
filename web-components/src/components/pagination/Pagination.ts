import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property, PropertyValues } from "lit-element";
import styles from "./scss/module.scss";
import "./PaginationItem";
import { classMap } from "lit-html/directives/class-map";
import { repeat } from "lit-html/directives/repeat";
import { nothing } from "lit-html";

export type direction = "previous" | "next";
type paginationItems = {};

@customElement("md-pagination")
export class Pagination extends LitElement {
  @property({ type: String }) direction: direction = "previous";
  @property({ type: Number }) total = 10;
  @property({ type: Number, attribute: "page-size" }) pageSize = 5;
  @property({ type: Number, attribute: "current-page" }) currentPage = 1;
  @property({ type: Boolean, attribute: "arrows" }) isArrows = false;
  @property({ type: Boolean, attribute: "dots" }) isDots = false;
  @property({ type: Array, attribute: "items", reflect: true }) items: paginationItems[] = [];
  @property({ type: Boolean, attribute: "simple" }) isSimple = false;

  static get styles() {
    return [reset, styles];
  }

  get paginationClassMap() {
    return {
      "has-arrows": this.isArrows,
      "has-dots": this.isDots
    };
  }

  get paginationItemClassMap() {
    return {
      current: this.currentPage
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
          this.items,
          paginationItems => html`
            <li>${paginationItems}</li>
          `
        )}
      </ol>
    `;
  }
  private _current = false;
  get current() {
    return this._current;
  }

  set current(value: boolean) {
    const oldValue = this._current;
    this._current = value;

    if (value) {
      this.notifyCurrentItem();
    }

    this.setAttribute("aria-selected", `${value}`);
    this.requestUpdate("selected", oldValue);
  }

  private notifyCurrentItem() {
    this.dispatchEvent(
      new CustomEvent("focus-visible", {
        composed: true,
        bubbles: true
      })
    );
  }

  render() {
    return html`
      <nav class="md-pagination ${classMap(this.paginationClassMap)}" role="navigation" part="pagination">
        ${this.isArrows ? this.buttonTemplate("previous") : nothing}
        <div class="md-pagination-container">
          ${!this.isSimple && this.items
            ? html`
                <ul class="md-pagination-list">
                  ${repeat(
                    this.items,
                    paginationItems => html`
                      <li class="${classMap(this.paginationItemClassMap)}" aria-label=${this.currentPage}>
                        <a href="#">${paginationItems}</a>
                      </li>
                    `
                  )}
                </ul>
              `
            : html`
                <div class="md-pagination-simple">
                  <span class="md-pagination-current-items">1-5</span>
                  <span class="md-pagination-total-pages">
                    of ${this.total}
                  </span>
                </div>
              `}
          ${this.isDots ? this.dotsTemplate() : nothing}
        </div>
        ${this.isArrows ? this.buttonTemplate("next") : nothing}
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-pagination": Pagination;
  }
}
