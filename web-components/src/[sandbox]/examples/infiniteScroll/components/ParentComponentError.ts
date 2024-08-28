import { html, LitElement, css, property, internalProperty } from "lit-element";
import "@/components/list/InfiniteScrollList";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import './ErrorLoader/ErrorLoader';

export namespace ParentComponentError {
  @customElementWithCheck("parent-component-error")
  export class ELEMENT extends LitElement {
    @property({ type: Array }) items: any = [];
    @internalProperty() page = 1;
    @property({ type: Boolean }) loading = false;
    @internalProperty() shouldFail = false;
    @property({ type: String }) error: string | null = null;

    constructor() {
      super();
      this.items = [];
      this.page = 1;
      this.loading = false;
      this.error = null;
      this.loadMoreItems();
      this.shouldFail = false; // Initialize the flag
    }

    async loadMoreItems() {
      console.log('event dispatched ----->>>');
      try {
        if (this.shouldFail) {
          throw new Error('Simulated alternating failure');
        }
        this.loading = true;
        const newItems = await this.fetchItems(this.page);
        const infiniteScrollList = this.shadowRoot?.querySelector('infinite-scroll-list');
        if (infiniteScrollList) {
          infiniteScrollList.setItems([...this.items, ...newItems]);
        }
        this.items = [...this.items, ...newItems];
        this.page += 1;
        this.loading = false;
        this.error = null;

      } catch (err) {
        this.loading = false;
        this.error = 'Failed to load more items. Please try again.';
        console.log('line no 44', this.loading, this.error);
      } finally {
        // Toggle the flag after each attempt
        this.shouldFail = !this.shouldFail;
      }
    }



    async fetchItems(page: number) {
      console.log('Fetching items for page', page);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newItems = Array.from({ length: 20 }, (_, i) => ({
        data: `Item ${(page - 1) * 20 + i + 1}`,
        id: crypto.randomUUID(),
        template: (data: string) => html`<div>${data}</<div>`
      }));
      return newItems;
    }

    handleRetry() {
      console.log('Retry triggered');
      this.loadMoreItems();
    }

    render() {
      return html`
        <h2>Error scenario</h2>
        <infinite-scroll-list 
          .items=${this.items}
          .loading=${this.loading}
          .error=${this.error}
          @load-more=${this.loadMoreItems}>
        </infinite-scroll-list>
        
        ${this.loading ? html`<md-spinner size="24"></md-spinner>` : ''}
        ${this.error ? html`
          <md-fetch-error
           messageType="error"
            style="color: red;"
            commonErrorMsg="An error occurred while fetching data"
            commonTryAgain="Try Again"
            trackingId="12345"
            trackingIdInputLabel="Tracking ID:"
            @retry="${this.handleRetry}">
          </md-fetch-error>
        ` : ''}
      `;
    }

    static get styles() {
      return css`
        .item {
          padding: 16px;
          border-bottom: 1px solid #ccc;
        }
        .error {
          color: red;
        }
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "parent-component-error": ParentComponentError.ELEMENT;
  }
}
