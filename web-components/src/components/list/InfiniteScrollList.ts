import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { html, LitElement, css, property, internalProperty, PropertyValues, query } from "lit-element";
import "lit-virtualizer";



export namespace InfiniteScrollList {
    @customElementWithCheck("infinite-scroll-list")
    export class ELEMENT extends LitElement {
    @property({ type: Array }) items: any[] = [];
    @internalProperty() page = 1;

        // static get properties() {
        //     return {
        //         items: { type: Array }
        //     };
        // }

        constructor() {
            super();
            this.items = [];
            this.page = 1;
        }

        // Method to load items
        setItems(newItems : any) {
            this.items = [...this.items, ...newItems];
        }

        render() {
            return html`<lit-virtualizer .items=${this.items} .renderItem=${(item : any) => item.template(item.data)} @rangechange=${this.handleRangeChange} ></lit-virtualizer>`;
        }

        handleRangeChange(e : any) {
            const { first, last } = e.detail;
            if (last >= this.items.length - 1) {
                this.dispatchEvent(new CustomEvent('load-more', {
                    detail: { page: this.page },
                    bubbles: true,
                    composed: true
                }));
                this.page += 1;
            }
        }

        static get styles() {
            return css`.item { padding: 16px; border-bottom: 1px solid #ccc; }`;
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "infinite-scroll-list": InfiniteScrollList.ELEMENT;
    }
}