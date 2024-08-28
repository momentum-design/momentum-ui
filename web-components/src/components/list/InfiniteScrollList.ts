import { LitElement, html, css, property, internalProperty } from 'lit-element';
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { scroll } from 'lit-virtualizer';

export namespace InfiniteScrollList {
    @customElementWithCheck('infinite-scroll-list')
    export class ELEMENT extends LitElement {
        @property({ type: Array }) items: any = [];
        @property({ type: Boolean }) loading = false;
        @property({ type: String }) error: string | null = null;
        @internalProperty() page = 1;
        @internalProperty() focusedIndex = -1;

        constructor() {
            super();
            this.items = [];
            this.loading = false;
            this.error = null;
            this.page = 1;
            this.focusedIndex = -1;
        }

        static styles = css`
            :host {
                display: block;
                position: relative;
            }

            .virtual-scroll {
                max-height: 400px;
                overflow-y: auto;
                position: relative;
                -webkit-overflow-scrolling: touch;
            }

            .default-wrapper {
                padding: 5px;
                background: white;
                cursor: pointer; 
                width: 100%;
            }
            .select{
                background-color: var(--list-active-background, $md-list-active-background-light);
                color: var(--list-active-text-color, $md-list-active-text-color-light);
            }

            .default-wrapper:hover {
                background-color: var(--list-hover-background, $md-list-hover-background-light);
                color: var(--list-hover-text-color, $md-list-hover-text-color-light);
            }

            .spinner {
                text-align: center;
                padding: 16px;
            }

            .error {
                color: red;
                text-align: center;
                padding: 16px;
            }
        `;

        // Method to load items
        setItems(newItems: any) {
            this.items = [...this.items, ...newItems];
        }

        private notifySelectedChange() {
            this.dispatchEvent(
                new CustomEvent("list-item-change", {
                    detail: {
                        selected: this.focusedIndex ///need to add the actual selected value here
                    },
                    bubbles: true,
                    composed: true
                })
            );
        }

        handleClick(item: any, index : any) {
            console.log(item);
            this.focusedIndex = index;
            this.notifySelectedChange();
        }

        renderItem(item: any, index: number) {
            const isSelected = this.focusedIndex === index;
            const wrapperClass = isSelected ? 'default-wrapper selected' : 'default-wrapper';
        
            return html`
                <div class="${wrapperClass}" @click=${() => this.handleClick(item, index)}>
                    ${item.template(item.data, index)} 
                </div>
            `;
        }
        

        render() {
            return html`
                <div class="virtual-scroll md-list-item" @rangechange=${this.handleRangeChange}>
                    ${scroll({
                        items: this.items,
                        renderItem: (item: any, index?: number) => this.renderItem(item, index || 0),
                        useShadowDOM: true,
                    })}
                </div>
                `;
                // ${this.loading ? html`<div class="spinner">Loading...</div>` : ''}
                // ${this.error ? html`<div class="error">${this.error}</div>` : ''}
        }

        handleRangeChange(e: any) {
            const { first, last } = e;
            if (last >= this.items.length - 1 && !this.loading) {
                this.loading = true;
                this.dispatchEvent(new CustomEvent('load-more', {
                    detail: { page: this.page },
                    bubbles: true,
                    composed: true
                }));
                this.page += 1;
            }
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'infinite-scroll-list': InfiniteScrollList.ELEMENT;
    }
}
