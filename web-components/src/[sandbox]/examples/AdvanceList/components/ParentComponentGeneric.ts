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

        async loadMoreItems() {
            console.log("load more called")
            console.log('event dispatched ----->>>');
            
            try {
                this.isLoading = true;
                const newItems = await this.fetchItems(this.page);
                this.items = [...this.items, ...newItems];
                this.totalRecords = 600;
                this.page += 1;
                this.isLoading = false;
                this.value = this.items[1].id;
                // this.isError = null;
                console.log('try calledddd')
            } catch (err) {
                this.isLoading = false;
                this.isError = true;
                // this.isError = 'Failed to load more items. Please try again.';
                console.log("error caled")
            }finally{
                this.isLoading = false;
                console.log("finally called")
            }
        }

        async fetchItems(page: number) {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newItems = Array.from({ length: 20 }, (_, i) => ({
                name: `Item ${(page - 1) * 20 + i + 1}`,
                id: crypto.randomUUID(),
                index: i,
                ariaLabel : `Item ${(page - 1) * 20 + i + 1}`,
                template: (data: any, index: number) => html`<div style="position:relative;min-height:1.25rem;box-sizing: border-box;display:flex;flex-flow:row unwrap;justify-content:flex-start;align-items:center;line-height:30px;" ?disabled="${index % 2 === 0}" indexing="${index}" >${data.name}</div>`
                
            }));
            return newItems;
        }

        private handleListItemChange(event: CustomEvent) {
            console.log(event.detail.selected)
            //API call send to end point to upate the item
        }

        render() {
            // console.log("rendering parent component--generic", this.items)
            return html`
        <h2>Generic Item List</h2>
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
