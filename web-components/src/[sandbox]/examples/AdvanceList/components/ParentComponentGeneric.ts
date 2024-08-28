import { html, LitElement, css, property, internalProperty } from "lit-element";
// import "@/components/list/InfiniteScrollList";
import "@/components/advance-list/AdvanceList";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";

export namespace ParentComponentGeneric {
    @customElementWithCheck("parent-component-generic")
    export class ELEMENT extends LitElement {
        @property({ type: Array }) items: any = [];
        @internalProperty() page = 1;
        @property({ type: Boolean }) isLoading = false;
        @property({ type: String }) isError: string | null = null;

        constructor() {
            super();
            this.items = [];
            this.page = 1;
            this.isLoading = false;
            this.isError = null;
            this.loadMoreItems();
        }

        async loadMoreItems() {
            console.log('event dispatched ----->>>')
            try {
                this.isLoading = true;
                const newItems = await this.fetchItems(this.page);
                this.items = [...this.items, ...newItems];
                this.page += 1;
                this.isLoading = false;
                this.isError = null;
            } catch (err) {
                this.isLoading = false;
                this.isError = 'Failed to load more items. Please try again.';
            }
        }

        async fetchItems(page: number) {
            console.log('Fetching items for page', page);
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newItems = Array.from({ length: 20 }, (_, i) => ({
                data: `Item ${(page - 1) * 20 + i + 1}`,
                id: crypto.randomUUID(),
                index: i,
                template: (data: string, index: number) => html`<div indexing="${index}" >${data}</div>`
            }));
            console.log('newItems', newItems)
            return newItems;
        }

        private handleListItemChange(event: CustomEvent) {
            console.log('event dispatched from momentum ----->>>', event)
            //API call send to end point to upate the item
        }

        render() {
            console.log("rendering parent component--generic", this.items)
            return html`
        <h2>Generic Item List</h2>
        <md-advance-list
          .items=${this.items}
          .isLoading=${this.isLoading}
          .isError=${this.isError}
          @list-item-change=${this.handleListItemChange}
          @load-more=${this.loadMoreItems}>
          <md-spinner size="24" slot="spin-loader"></md-spinner>
        </md-advance-list>

        `;
            // this should inside backtik
            // ${this.isLoading ? html`<p>isLoading...</p>` : ''}
            // ${this.isError ? html`<p class="isError">${this.isError}</p>` : ''}
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
        "parent-component-generic": ParentComponentGeneric.ELEMENT;
    }
}
