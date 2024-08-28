import { LitElement, html, css, property, internalProperty } from 'lit-element';
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { scroll } from 'lit-virtualizer';
import { Key } from "@/constants";

export namespace AdvanceList {
    @customElementWithCheck('md-advance-list')
    export class ELEMENT extends LitElement {
        @property({ type: Array }) items: any[] = [];
        @property({ type: Boolean }) isLoading = false;
        @property({ type: String }) selectedItemId = '';
        @property({ type: String }) isError: string | null = null;
        @internalProperty() page = 1;
        @internalProperty() focusedIndex = -1;

        constructor() {
            super();
            this.items = [];
            this.isLoading = false;
            this.isError = null;
            this.page = 1;
            this.focusedIndex = -1;
            this.selectedItemId = '';
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
            .default-wrapper.select {
                background-color: var(--list-active-background, $md-list-active-background-light);
                color: var(--list-active-text-color, $md-list-active-text-color-light);
            }

            .default-wrapper:hover {
                background-color: var(--list-hover-background, $md-list-hover-background-light);
                color: var(--list-hover-text-color, $md-list-hover-text-color-light);
            }

            .spinner, .error {
                text-align: center;
                padding: 16px;
            }

            .error {
                color: red;
            }
        `;

   

        connectedCallback() {
            super.connectedCallback();
            this.addEventListener("click", this.handleClick);
        }

        disconnectedCallback() {
            super.disconnectedCallback();
            this.removeEventListener("click", this.handleClick);
        }

        handleScroll() {
            this.updateSelectedState();
        }

        private updateSelectedState() {
            const wrappers = Array.from(this.shadowRoot?.querySelectorAll('.default-wrapper') || []);
            wrappers.forEach(wrapper => {
                wrapper.classList.toggle('select', wrapper.id === this.selectedItemId);
            });
        }
        
        handleClick(event: Event) {
            const clickedItem = this.findClickedItem(event);
            if (clickedItem) {
                this.clearSelectedState();
                this.selectItem(clickedItem);
                this.setSelected(clickedItem.id);
            }
        }
        findClickedItem(event: Event): HTMLElement | undefined {
            const wrappers = Array.from(this.shadowRoot?.querySelectorAll('.default-wrapper') || []);
            const eventPath = event.composedPath();
            return wrappers.find(wrapper => eventPath.includes(wrapper)) as HTMLElement | undefined;
        }

        clearSelectedState() {
            const wrappers = Array.from(this.shadowRoot?.querySelectorAll('.default-wrapper') || []);
            wrappers.forEach(wrapper => {
                wrapper.classList.remove('select');
                wrapper.removeAttribute('selected');
            });
        }

        selectItem(item: HTMLElement) {
            item.classList.add('select');
            item.setAttribute('selected', 'true');
        }

        setSelected(newId: string) {
            if (this.selectedItemId !== newId) {
                this.selectedItemId = newId;
                this.requestUpdate();
                this.notifySelectedChange();
            }
        }

        notifySelectedChange() {
            this.dispatchEvent(new CustomEvent("list-item-change", {
                detail: { selected: this.selectedItemId },
                bubbles: true,
                composed: true,
            }));
        }

        renderItem(item: any, index: number) {
            return html`
                <div class="default-wrapper" id="${item.id}" index="${index}">
                    ${item.template(item.data, index)} 
                </div>
            `;
        }

        render() {
            return html`
                <div class="virtual-scroll md-list-item" @scroll=${this.handleScroll} @rangechange=${this.handleRangeChange}>
                    ${scroll({
                        items: this.items,
                        renderItem: (item: any, index?: number) => this.renderItem(item, index || 0),
                        useShadowDOM: true,
                    })}
                </div>
                ${this.isLoading ? html`<slot name="spin-loader"></slot>` : ''}
            `;
        }

        handleRangeChange(e: any) {
            const { last } = e;
            if (last >= this.items.length - 1 && !this.isLoading) {
                this.isLoading = true;
                this.dispatchEvent(new CustomEvent('load-more', {
                    detail: { page: this.page },
                    bubbles: true,
                    composed: true,
                }));
                this.page += 1;
            }
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'md-advance-list': AdvanceList.ELEMENT;
    }
}
