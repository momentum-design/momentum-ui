import { LitElement, html, css, property, PropertyValues, internalProperty } from 'lit-element';
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { scroll } from 'lit-virtualizer';
import { Key } from "@/constants";


export namespace AdvanceList {
    @customElementWithCheck('md-advance-list')
    export class ELEMENT extends LitElement {
        @property({ type: Array }) items: any = [];
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
           .default-wrapper.select{
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

        connectedCallback() {
            super.connectedCallback();
            // this.addEventListener("keydown", this.handleKeyDown);
            this.addEventListener("click", this.handleClick);

        }

        disconnectedCallback() {
            super.disconnectedCallback();
            // this.removeEventListener("keydown", this.handleKeyDown);
            this.removeEventListener("click", this.handleClick);
        }


        private handleClick(event: Event) {
            // Find all wrapper elements
            const wrappers = Array.from(this.shadowRoot?.querySelectorAll('.default-wrapper') || []);
            
            // Get the path of the event to find the clicked element
            const eventPath = event.composedPath();
            
            // Find the clicked item from the wrappers
            const clickedItem = wrappers.find(wrapper => eventPath.includes(wrapper));
            
            if (clickedItem) {

                // here the problem is we can able to remove this whatever render in the DOM --
                //  since we are using virtual scroll double selection happening in the UI


                // Add the selected state to the clicked item
                wrappers.forEach(wrapper => wrapper.classList.remove('select'));

                // Add the selected state to the clicked item
                clickedItem.classList.add('select');


              // Clear the selected state from any previously selected item
              wrappers.forEach(wrapper => wrapper.removeAttribute('selected'));
          
              // Add the selected state to the clicked item
              clickedItem.setAttribute('selected', 'true');
          
              // Get the ID of the clicked item (assuming it has a data-id attribute)
              const itemId = clickedItem.getAttribute('id');
              if (itemId) {
                this.setSelected(itemId);
              }
            }
          }

        private setSelected(newId: string) {
            console.log('setSelected called with newId:', newId);
            if (this.selectedItemId !== newId) {
                this.selectedItemId = newId;
                this.requestUpdate();
            }
            console.log('newId-------->',newId);
            console.log('selectedItemId-------->',this.selectedItemId);
            this.notifySelectedChange();
          }

        handleKeyDown(event: KeyboardEvent) {
            const { code } = event;
            switch (code) {
                case Key.End:
                    // this.switchListItemOnArrowPress(this.slotted.length - 1);
                    break;
                case Key.Home:
                    // this.switchListItemOnArrowPress(0);
                    break;
                case Key.ArrowUp:
                case Key.ArrowLeft:
                    event.preventDefault();
                    // {
                    //   if (this.selected === 0) {
                    //     this.switchListItemOnArrowPress(this.slotted.length - 1, -1);
                    //   } else {
                    //     this.switchListItemOnArrowPress(this.selected - 1, -1);
                    //   }
                    // }
                    break;
                case Key.ArrowDown:
                case Key.ArrowRight:
                    event.preventDefault();
                    // {
                    //   if (this.selected === this.slotted.length - 1) {
                    //     this.switchListItemOnArrowPress(0);
                    //   } else {
                    //     this.switchListItemOnArrowPress(this.selected + 1);
                    //   }
                    // }
                    break;
                case Key.Enter:
                case Key.Space:
                    {
                        // console.log("nithish event handle newIndex 283 else ", this.selected)
                        // if (!this.isListItemDisabled(this.selected)) {
                        //   console.log("nithish event handle newIndex 286 else ", this.selected)
                        //   this.setActivated(this.selected);
                        //   this.notifySelectedChange();
                        // }
                    }
                    break;
                default:
                    break;
            }
        }



        private notifySelectedChange() {
            this.dispatchEvent(
                new CustomEvent("list-item-change", {
                    detail: {
                        selected: this.selectedItemId ///need to add the actual selected value here
                    },
                    bubbles: true,
                    composed: true
                })
            );
        }


        renderItem(item: any, index: number) {
            return html`
                <div class="default-wrapper"  id="${item.id}" >
                    ${item.template(item.data, index)} 
                </div>
            `;
        }

        render() {
            console.log('rendering advance list', this.isLoading);
            return html`
                <div class="virtual-scroll md-list-item"  @rangechange=${this.handleRangeChange}>
                ${scroll({
                    items: this.items,
                    renderItem: (item: any, index?: number) => this.renderItem(item, index || 0),
                    useShadowDOM: true,
                })}
                </div>
                ${this.isLoading ? html`<slot name="spin-loader"></slot>` : ''}`;
        }

        handleRangeChange(e: any) {
            const { first, last } = e;
            if (last >= this.items.length - 1 && !this.isLoading) {
                this.isLoading = true;
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
        'md-advance-list': AdvanceList.ELEMENT;
    }
}
