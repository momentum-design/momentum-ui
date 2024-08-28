import { html, LitElement, css, property, internalProperty } from "lit-element";
// import "@/components/list/InfiniteScrollList";
import "@/components/advance-list/AdvanceList";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import './ErrorLoader/ErrorLoader';

export namespace ParentComponentError {
  @customElementWithCheck("parent-component-error")
  export class ELEMENT extends LitElement {
    @property({ type: Array }) items: any = [];
    @internalProperty() page = 1;
    @property({ type: Boolean }) isLoading = false;
    @internalProperty() shouldFail = false;
    @property({ type: String }) isError: string | null = null;

    constructor() {
      super();
      this.items = [];
      this.page = 1;
      this.isLoading = false;
      this.isError = null;
      this.loadMoreItems();
      this.shouldFail = false; // Initialize the flag
    }

    async loadMoreItems() {
      console.log('event dispatched ----->>>');
      try {
        if (this.shouldFail) {
          throw new Error('Simulated alternating failure');
        }
        this.isLoading = true;
        const newItems = await this.fetchItems(this.page);
        const infiniteScrollList = this.shadowRoot?.querySelector('md-advance-list');
        if (infiniteScrollList) {
          infiniteScrollList.setItems([...this.items, ...newItems]);
        }
        this.items = [...this.items, ...newItems];
        this.page += 1;
        this.isLoading = false;
        this.isError = null;

      } catch (err) {
        this.isLoading = false;
        this.isError = 'Failed to load more items. Please try again.';
        console.log('line no 44', this.isLoading, this.isError);
      } finally {
        // Toggle the flag after each attempt
        this.shouldFail = !this.shouldFail;
        // this.requestUpdate(); // re-rendering is not happening
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
      console.log("rendering parent component--generic", this.items)
      console.log("rendering parent component--error", this.isLoading)
      return html`
        <h2>Error scenario</h2>
        <md-advance-list 
          .items=${this.items}
          .isLoading=${this.isLoading}
          .error=${this.isError}
          @load-more=${this.loadMoreItems}>
          <md-spinner size="24" slot="spin-loader"></md-spinner>
        </md-advance-list>
        
        ${this.isError ? html`
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
