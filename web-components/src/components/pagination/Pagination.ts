import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property } from "lit-element";
import styles from "./scss/module.scss";

@customElement("md-pagination")
export class Pagination extends LitElement {
  private _currentPage = 1;

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

  @property({ type: String, attribute: "on-begin-i18n" }) beginLocalization = "On Begin";
  @property({ type: String, attribute: "on-before-i18n" }) beforeLocalization = "On Before";
  @property({ type: String, attribute: "on-next-i18n" }) nextLocalization = "On Next";
  @property({ type: String, attribute: "on-end-i18n" }) endLocalization = "On End";

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

  private computePageList() {
    if (this.totalPage > this.visiblePage) {
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

  private pagesTemplate() {
    return this.computePageList().map(page =>
      page === "..."
        ? html`
            <li><span>${page}</span></li>
          `
        : html`
            <li @click=${() => this.computeCurrent(page as number)} aria-current=${page === this.currentPage}>
              ${page}
            </li>
          `
    );
  }

  render() {
    return html`
      <nav class="md-pagination" role="navigation" part="pagination">
        <button
          class="md-pagination-nav"
          aria-label=${this.beginLocalization}
          ?disabled=${this.hasPreviousPage}
          aria-disabled=${this.hasPreviousPage}
          @click=${this.computeFirst}
        >
          <md-icon name="icon-overflow-left_16"></md-icon>
        </button>
        <button
          class="md-pagination-nav"
          aria-label=${this.beforeLocalization}
          ?disabled=${this.hasPreviousPage}
          aria-disabled=${this.hasPreviousPage}
          @click=${() => this.computePrevious(this.currentPage - 1)}
        >
          <md-icon name="icon-arrow-left_16"></md-icon>
        </button>
        <div class="md-pagination-container">
          <ul class="md-pagination-list">
            ${this.pagesTemplate()}
          </ul>
        </div>
        <button
          class="md-pagination-nav"
          aria-label=${this.nextLocalization}
          ?disabled=${this.hasNextPage}
          aria-disabled=${this.hasNextPage}
          @click=${() => this.computeNext(this.currentPage + 1)}
        >
          <md-icon name="icon-arrow-right_16"></md-icon>
        </button>
        <button
          class="md-pagination-nav"
          aria-label=${this.endLocalization}
          ?disabled=${this.hasNextPage}
          aria-disabled=${this.hasNextPage}
          @click=${this.computeLast}
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
