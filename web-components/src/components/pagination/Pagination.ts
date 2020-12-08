import reset from "@/wc_scss/reset.scss";
import { customElement, html, internalProperty, LitElement, property, PropertyValues } from "lit-element";
import styles from "./scss/module.scss";
import { classMap } from "lit-html/directives/class-map";
import { repeat } from "lit-html/directives/repeat";
import { ifDefined } from "lit-html/directives/if-defined";
import { nothing } from "lit-html";

@customElement("md-pagination")
export class Pagination extends LitElement {
  private _total = 5;
  private _limit = 1;
  private _page = 1;

  @property({ type: Number, reflect: true })
  get total() {
    return this._total;
  }
  set total(newTotal: number) {
    const oldTotal = this._total;
    this._total = newTotal;
    this.requestUpdate("total", oldTotal);
    this.computePageCount(this.page, this.limit, this._total);
  }

  @property({ type: Number, reflect: true })
  get limit() {
    return this._limit;
  }
  set limit(newLimit: number) {
    const oldLimit = this._limit;
    this._limit = newLimit;
    this.requestUpdate("limit", oldLimit);
    this.computePageCount(this.page, this._limit, this.total);
  }

  @property({ type: Number, reflect: true })
  get page() {
    return this._page;
  }
  set page(newPage: number) {
    const oldPage = this._page;
    this._page = newPage;
    this.requestUpdate("page", oldPage);
    this.notifyPageChange(oldPage, newPage);
    this.computePageCount(this._page, this.limit, this.total);
  }

  @property({ type: Number, reflect: true }) size = 1;
  @property({ type: String, attribute: "on-begin-i18n" }) beginLocalization = "On Begin";
  @property({ type: String, attribute: "on-before-i18n" }) beforeLocalization = "On Before";
  @property({ type: String, attribute: "on-next-i18n" }) nextLocalization = "On Next";
  @property({ type: String, attribute: "on-end-i18n" }) endLocalization = "On End";
  @property({ type: Boolean, attribute: "dots" }) hasDots = false;

  @internalProperty() private hasBefore = false;
  @internalProperty() private hasNext = false;
  @internalProperty() private pages = 1;
  @internalProperty() private items: number[] = [];

  static get styles() {
    return [reset, styles];
  }

  get paginationClassMap() {
    return {
      "has-dots": this.hasDots
    };
  }

  private computeBefore(page: number) {
    return page <= 1;
  }

  private computeNext(page: number, pages: number) {
    return page >= pages;
  }

  private handleBegin() {
    this.page = 1;
  }

  private handleBefore() {
    this.page = this.page > 0 ? this.page - 1 : 1;
  }

  private handleNext() {
    this.page = this.page < this.pages ? this.page + 1 : this.pages;
  }

  private handleEnd() {
    this.page = this.pages;
  }

  private firstIndex(page: number, size: number) {
    const index = page - size;
    if (index < 1) {
      return 1;
    } else {
      return index;
    }
  }

  private lastIndex(page: number, size: number) {
    const index = page + size;
    if (index > this.pages) {
      return this.pages;
    } else {
      return index;
    }
  }

  private notifyPageChange(oldPage: number, newPage: number) {
    this.dispatchEvent(
      new CustomEvent<{ oldPage: number; newPage: number }>("page-change", {
        composed: true,
        bubbles: true,
        detail: { oldPage, newPage }
      })
    );
  }

  private computePageCount(page: number, limit: number, total: number) {
    if (limit && total) {
      this.pages = Math.ceil(total / limit);
    }

    if (page && limit && total) {
      const items = [];
      const firstIndex = this.firstIndex(page, this.size);
      const lastIndex = this.lastIndex(page, this.size);

      for (let num = firstIndex; num <= lastIndex; num++) {
        items.push(num);
      }
      this.items = items;
    }
  }

  private isPageCurrent(item: number, page: number) {
    return item === page;
  }

  handleChange(item: number) {
    this.page = item;
  }

  private computeNavigation(page: number, pages: number) {
    this.hasBefore = this.computeBefore(page);
    this.hasNext = this.computeNext(page, pages);
  }

  protected firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    this.computePageCount(this.page, this.limit, this.total);
    this.computeNavigation(this.page, this.pages);
  }

  protected update(changedProperties: PropertyValues) {
    super.update(changedProperties);
    if (changedProperties.has("page") || changedProperties.has("pages")) {
      this.computeNavigation(this.page, this.pages);
    }
  }

  render() {
    return html`
      <nav class="md-pagination ${classMap(this.paginationClassMap)}" role="navigation" part="pagination">
        <button
          class="md-pagination-nav"
          aria-label=${this.beginLocalization}
          ?disabled=${this.hasBefore}
          aria-disabled=${this.hasBefore}
          @click=${this.handleBegin}
        >
          <md-icon name="icon-overflow-left_16"></md-icon>
        </button>
        <button
          class="md-pagination-nav"
          aria-label=${this.beforeLocalization}
          ?disabled=${this.hasBefore}
          aria-disabled=${this.hasBefore}
          @click=${this.handleBefore}
        >
          <md-icon name="icon-arrow-left_16"></md-icon>
        </button>
        <div class="md-pagination-container">
          <ul class="md-pagination-list">
            ${repeat(
              this.items,
              (i: number) => i,
              (item: number, index: number) => html`
                <li
                  @click=${() => this.handleChange(item)}
                  aria-current=${ifDefined(this.isPageCurrent(item, this.page) ? "page" : undefined)}
                >
                  ${item}
                </li>
              `
            )}
          </ul>
          ${this.hasDots
            ? html`
                <ul class="md-pagination-dots">
                  ${repeat(
                    this.items,
                    (item: number) => html`
                      <li
                        @click=${() => this.handleChange(item)}
                        aria-current=${ifDefined(this.isPageCurrent(item, this.page) ? "page" : undefined)}
                      ></li>
                    `
                  )}
                </ul>
              `
            : nothing}
        </div>
        <button
          class="md-pagination-nav"
          aria-label=${this.nextLocalization}
          ?disabled=${this.hasNext}
          aria-disabled=${this.hasNext}
          @click=${this.handleNext}
        >
          <md-icon name="icon-arrow-right_16"></md-icon>
        </button>
        <button
          class="md-pagination-nav"
          aria-label=${this.endLocalization}
          ?disabled=${this.hasNext}
          aria-disabled=${this.hasNext}
          @click=${this.handleEnd}
        >
          <md-icon name="icon-overflow-right_16"></md-icon>
        </button>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-pagination": Pagination;
  }
}
