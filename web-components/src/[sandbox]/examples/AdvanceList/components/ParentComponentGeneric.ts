import { html, LitElement, css, property, internalProperty } from "lit-element";
import "@/components/list/InfiniteScrollList";
import "@/components/advance-list/AdvanceList";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";

export namespace ParentComponentGeneric {
    @customElementWithCheck("parent-component-generic")
    export class ELEMENT extends LitElement {
        @property({ type: Array }) items: any = [];
        @internalProperty() page = 1;
        @property({ type: Boolean }) loading = false;
        @property({ type: String }) error: string | null = null;

        constructor() {
            super();
            this.items = [];
            this.page = 1;
            this.loading = false;
            this.error = null;
            this.loadMoreItems();
        }

        async loadMoreItems() {
            console.log('event dispatched ----->>>')
            try {
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
            }
        }

        async fetchItems(page: number) {
            console.log('Fetching items for page', page);
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newItems = Array.from({ length: 20 }, (_, i) => ({
                data: `Item ${(page - 1) * 20 + i + 1}`,
                id: crypto.randomUUID(),
                template: (data: string) => html`<div>${data}</div>`
            }));
            console.log('newItems', newItems)
            return newItems;
        }

        render() {
            return html`
        <h2>Generic Item List</h2>
        <md-advance-list
          .items=${this.items}
          .loading=${this.loading}
          .error=${this.error}
          @load-more=${this.loadMoreItems}>
        </md-advance-list>
        ${this.loading ? html`<md-spinner size="24"></md-spinner>` : ''}
         ${this.error ? html`<p class="error">${this.error}</p>` : ''}
        `;
            // this should inside backtik
            // ${this.loading ? html`<p>Loading...</p>` : ''}
            // ${this.error ? html`<p class="error">${this.error}</p>` : ''}
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
