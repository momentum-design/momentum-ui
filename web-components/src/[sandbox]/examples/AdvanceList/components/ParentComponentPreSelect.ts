import { html, LitElement, css, property, internalProperty } from "lit-element";
// import "@/components/list/InfiniteScrollList";
import "@/components/advance-list/AdvanceList";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";

export namespace ParentComponentPreSelect {
    @customElementWithCheck("parent-component-pre-select")
    export class ELEMENT extends LitElement {
        @property({ type: Array }) items: any = [];
        @internalProperty() page = 1;
        @property({ type: Boolean }) isLoading = false;
        @property({ type: String })  value = '';
        @property({ type: String }) isError = false;
        @internalProperty() totalRecords = 0;

        constructor() {
            super();
            this.items = [];
            this.page = 1;
            this.isLoading = false;
            this.isError = false;
            this.loadMoreItems();
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
                this.isLoading = true;
                const newItems = await this.fetchItems(this.page);
                this.items = [...this.items, ...newItems];
                this.totalRecords = 60000;
                this.page += 1;
                this.isLoading = false;
                this.value = this.items[1].id;
            } catch (err) {
                this.isLoading = false;
                this.isError = true;
            }finally{
                this.isLoading = false;
            }
        }

        async fetchItems(page: number) {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newItems = Array.from({ length: 2000 }, (_, i) => ({
                name: `Item ${(page - 1) * 2000 + i + 1}`,
                id: this.generateUUID(),
                index: i,
                ariaLabel : `Item ${(page - 1) * 2000 + i + 1}`,
                template: (data: any, index: number) => html`<div style="position:relative;min-height:1.25rem;box-sizing: border-box;display:flex;flex-flow:row unwrap;justify-content:flex-start;align-items:center;line-height:30px;" ?disabled="${index % 2 === 0}" aria-hidden="true" indexing="${index}" >${data.name}</div>`
                
            }));
            return newItems;
        }

        private handleListItemChange(event: CustomEvent) {
           
        }

        render() {
            return html`
        <h2>Pre Select Item List</h2>
        <md-advance-list
          .items=${this.items}
          .isLoading=${this.isLoading}
          .isError=${this.isError}
          .value=${this.value}
          ariaRoleList="listbox"
          ariaLabelList="state selector"
          .totalRecords=${this.totalRecords}
          @list-item-change=${this.handleListItemChange}  
          @load-more=${this.loadMoreItems}>
          <md-spinner size="24" slot="spin-loader"></md-spinner>
        </md-advance-list>
          `;
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "parent-component-pre-select": ParentComponentPreSelect.ELEMENT;
    }
}
