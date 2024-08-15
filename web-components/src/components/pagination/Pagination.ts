import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property } from "lit-element";
import { nothing } from "lit-html";
import styles from "./scss/module.scss";

export namespace Pagination {
  @customElementWithCheck("md-pagination")
  export class ELEMENT extends LitElement {
    private _currentPage = 1;

    @property({ type: Boolean, attribute: "dots" }) hasDots = false;
    @property({ type: Boolean, reflect: true, attribute: "only-dots" }) onlyDots = false;
    @property({ type: Boolean, reflect: true, attribute: "no-navigation" }) noNavigation = false;
    @property({ type: Number, reflect: true, attribute: "total-page" }) totalPage = 0;
    @property({ type: Number, reflect: true, attribute: "visible-page" }) visiblePage = 3;
    @property({ type: Number, reflect: true, attribute: "current-page" })
    get currentPage() {
      return this._currentPage;
    }

    set currentPage(newPage: number) {
      const oldPage = this._currentPage;
      this._currentPage = newPage;
      this.notifyPageChange(oldPage, newPage);
      this.requestUpdate("currentPage", oldPage);
    }

    static get styles() {
      return [reset, styles];
    }

    private computePrevious(page: number) {
      if (page !== 1 && page !== this.currentPage) {
        this.currentPage -= 1;
      }
    }

    private computeNext(page: number) {
      if (page <= this.totalPage && page !== this.currentPage) {
        this.currentPage += 1;
      }
    }

    private computeFirst() {
      if (this.currentPage >= 1) {
        this.currentPage = 1;
      }
    }

    private computeLast() {
      if (this.currentPage >= 1) {
        this.currentPage = this.totalPage;
      }
    }

    private computeCurrent(page: number) {
      this.currentPage = page;
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

    get hasPreviousPage() {
      return this.currentPage <= 1;
    }

    get hasNextPage() {
      return this.currentPage >= this.totalPage;
    }

    private computePageList(shouldCompute: boolean) {
      if (this.totalPage > this.visiblePage && shouldCompute) {
        const [previous, current, next] = [this.currentPage - 1, this.currentPage, this.currentPage + 1];
        let newPageList: (string | number)[] = [];

        if (current <= this.visiblePage - 1) {
          newPageList = [...Array(this.visiblePage)].map((_, index) => 1 + index);
          newPageList.push("...");
          newPageList.push(this.totalPage);
          return newPageList;
        }

        if (this.totalPage - current <= this.visiblePage - 2) {
          newPageList = [];
          newPageList.push(1);
          newPageList.push("...");
          const newPageListRemain = [...Array(this.visiblePage)].map(
            (_, index) => this.totalPage - this.visiblePage + 1 + index
          );
          return newPageList.concat(newPageListRemain);
        }

        return [1, "...", previous, current, next, "...", this.totalPage];
      }
      return [...Array(this.totalPage)].map((_, index) => 1 + index);
    }

    private pagesTemplate(shouldCompute: boolean) {
      return this.computePageList(shouldCompute).map((page) =>
        page === "..."
          ? html` <li class="page-ellipsis">${page}</li> `
          : html`
              <li @click=${() => this.computeCurrent(page as number)} aria-current=${page === this.currentPage}>
                ${page}
              </li>
            `
      );
    }

    private dotsTemplate(shouldCompute: boolean) {
      return this.computePageList(shouldCompute).map((page) =>
        page === "..."
          ? nothing
          : html`
              <li @click=${() => this.computeCurrent(page as number)} aria-current=${page === this.currentPage}></li>
            `
      );
    }

    render() {
      return html`
        <nav class="md-pagination" role="navigation" part="pagination">
          ${this.noNavigation
            ? nothing
            : html`
                <button
                  class="md-pagination-nav"
                  aria-label="First Page"
                  ?disabled=${this.hasPreviousPage}
                  aria-disabled=${this.hasPreviousPage}
                  @click=${this.computeFirst}
                  part="pagination-first"
                >
                  <md-icon name="overflow-left-bold" size="16" iconSet="momentumDesign"></md-icon>
                </button>
                <button
                  class="md-pagination-nav"
                  aria-label="Next Page"
                  ?disabled=${this.hasPreviousPage}
                  aria-disabled=${this.hasPreviousPage}
                  @click=${() => this.computePrevious(this.currentPage - 1)}
                  part="pagination-prev"
                >
                  <md-icon name="arrow-left-bold" size="16" iconSet="momentumDesign"></md-icon>
                </button>
              `}
          <div class="md-pagination-container">
            ${this.onlyDots
              ? html`
                  <ul class="md-pagination-dots" part="pagination-only-dots">
                    ${this.dotsTemplate(false)}
                  </ul>
                `
              : html`
                  <ul class="md-pagination-list" part=pagination-list">
                    ${this.pagesTemplate(true)}
                  </ul>
                `}
            ${this.hasDots && !this.onlyDots
              ? html`
                  <ul class="md-pagination-dots" part="pagination-dots">
                    ${this.dotsTemplate(true)}
                  </ul>
                `
              : nothing}
          </div>
          ${this.noNavigation
            ? nothing
            : html`
                <button
                  class="md-pagination-nav"
                  aria-label="Previous Page"
                  ?disabled=${this.hasNextPage}
                  aria-disabled=${this.hasNextPage}
                  @click=${() => this.computeNext(this.currentPage + 1)}
                  part="pagination-next"
                >
                  <md-icon name="arrow-right-bold" size="16" iconSet="momentumDesign"></md-icon>
                </button>
                <button
                  class="md-pagination-nav"
                  aria-label="Last Page"
                  ?disabled=${this.hasNextPage}
                  aria-disabled=${this.hasNextPage}
                  @click=${this.computeLast}
                  part="pagination-last"
                >
                  <md-icon name="overflow-right-bold" size="16" iconSet="momentumDesign"></md-icon>
                </button>
              `}
        </nav>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-pagination": Pagination.ELEMENT;
  }
}
