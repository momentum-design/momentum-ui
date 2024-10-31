import { html, LitElement, css, property, internalProperty } from "lit-element";
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
    @property({ type: Boolean }) isError = false;
    @internalProperty() totalRecords = 0;


    constructor() {
      super();
      this.items = [];
      this.page = 1;
      this.isLoading = false;
      this.isError = false;
      this.loadMoreItems();
      this.shouldFail = false; // Initialize the flag
    }

    generateUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
      });
  }

    async loadMoreItems() {
      try {
        if (this.shouldFail) {
          throw new Error('Simulated alternating failure');
        }
        this.isLoading = true;
        const newItems = await this.fetchItems(this.page);

        this.items = [...this.items, ...newItems];
        this.totalRecords = 60000;
        this.page += 1;
        this.isLoading = false;
        this.isError = false;

      } catch (err) {
        this.isLoading = false;
        this.isError = true;
      } finally {
        // Toggle the flag after each attempt
        this.shouldFail = !this.shouldFail;
        // this.requestUpdate(); // re-rendering is not happening
      }
    }

    private handleListItemChange(event: CustomEvent) {
      //API call send to end point to upate the item
  }
    async fetchItems(page: number) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newItems = Array.from({ length: 2000 }, (_, i) => ({
        name: `Item ${(page - 1) * 2000 + i + 1}`,
        id: this.generateUUID(),
        index: i,
        template: (data: any, index: number) => html`<div style="position:relative;min-height:1.25rem;box-sizing: border-box;display:flex;flex-flow:row unwrap;justify-content:flex-start;align-items:center;line-height:30px;" indexing="${index}" >${data.name}</div>`

      }));
      return newItems;
    }

    handleRetry() {
      this.loadMoreItems();
    }

    render() {
      return html`
        <h2>Error scenario</h2>
        <md-advance-list
          class="advance-list"
          .items=${this.items}
          .isLoading=${this.isLoading}
          ariaRoleList="listbox"
          ariaLabelList="state selector"
          .isError=${this.isError}
          .totalRecords=${this.totalRecords}
          @list-item-change=${this.handleListItemChange}
          @load-more=${this.loadMoreItems}>
          <md-spinner size="24" slot="spin-loader"></md-spinner>
        </md-advance-list>
        
        ${this.isError ? html`
          <md-fetch-error 
            class="fetch-error"
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
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "parent-component-error": ParentComponentError.ELEMENT;
  }
}
