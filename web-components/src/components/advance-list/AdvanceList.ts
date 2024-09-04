import { LitElement, html, css, property, internalProperty, query, queryAll, PropertyValues } from 'lit-element';
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { scroll } from 'lit-virtualizer';
import { Key } from "@/constants";
import styles from "./scss/module.scss";
import reset from "@/wc_scss/reset.scss";
import { FocusMixin } from '@/mixins/FocusMixin';


export namespace AdvanceList {
    @customElementWithCheck('md-advance-list')
    export class ELEMENT extends FocusMixin(LitElement) {
        @property({ type: Array }) items: any[] = [];
        @property({ type: Boolean }) isLoading = false;
        @property({ type: String }) selectedItemId = '';
        @property({ type: String }) value = '';

        @property({ type: String }) ariaRoleList = '';
        // @property({ type: String }) ariaRoleListItem = '';
        @property({ type: String }) ariaLabelList = '';
        // @property({ type: String }) ariaLabelListItem = '';

        @property({ type: Boolean }) isError = false;
        @queryAll("div.default-wrapper") lists?: HTMLDivElement[];
        @internalProperty() page = 1;
        @internalProperty() hasSlotContent = false;

        private _focusedIndex = -1;

        @internalProperty()
        get focusedIndex() {
            return this._focusedIndex;
          }
          set focusedIndex(index: number) {
            const oldIndex = this._focusedIndex;
            console.log("New Data---",index,this.items[index], this.items)
            const newId = this.items[index]?.id
            console.log("Focused Id--", newId);

            const newList = this.lists ? [...this.lists]?.find(list => { 
                const newIndex = list.getAttribute("index");
                if(newIndex !== null){
                    return parseInt(newIndex) === index;
                }
                return false;
            }) : null;
            console.log("Focused List:", newList)
        if (this.lists) {
          [...this.lists].forEach(list => {
            list.toggleAttribute("focused", false);
          });
        }
        if (newList) {
          newList?.toggleAttribute("focused", true);
        }
        const newListIndex = newList?.getAttribute("index");
        if(newListIndex){
            this._focusedIndex = parseInt(newListIndex);
        } else {
            this._focusedIndex = 0
        }
            
            console.log("focusIndex---", index, oldIndex);
            this.requestUpdate("focusedIndex", index);
        }
        @internalProperty() selectedIndex = -1;

        constructor() {
            super();
            this.items = [];
            this.isLoading = false;
            this.isError = false;
            this.page = 1;
            this.focusedIndex = -1;
            this.selectedItemId = '';
        }
        connectedCallback(): void {
            super.connectedCallback();
            this.addEventListener("keydown", this.handleKeyDown);
            this.addEventListener("click", this.handleClick);
        }
        static get styles() {
            return [reset, styles];
          }
        handleKeyDown = (event: KeyboardEvent) => {
            const { code } = event;
            console.log("Focus---", event);
            switch (code) {
              
              case Key.ArrowUp:
              case Key.ArrowLeft:
                event.preventDefault();
                  if (this.focusedIndex !== 0) {
                    this.focusedIndex--;
                  } 
                break;
              case Key.ArrowDown:
              case Key.ArrowRight:
                event.preventDefault();
                console.log("Items on key down", this.items.length);
                if (this.items.length - 1 === this.focusedIndex) {
                    this.focusedIndex = 0;
                  } else {
                    this.focusedIndex++
                  }
                break;
              case Key.Enter:
              case Key.Space:
                if (this.focusedIndex > -1) {
                    this.selectedIndex = this.focusedIndex;
                    this.notifySelectedChange();
                  }
                break;
              default:
                break;
            }
          }

        disconnectedCallback() {
            super.disconnectedCallback();
            this.removeEventListener("click", this.handleClick);
            this.removeEventListener("keydown", this.handleKeyDown);
        }

        handleScroll() {
            this.updateSelectedState();
        }

        updated(changedProperties: PropertyValues) {
            if (changedProperties.has('value')) {
                this.selectedItemId = this.value;
                // Wait for the update to complete before running your logic.
                this.requestUpdate().then(() => {
                    this.updateSelectedState();
                });
            }
        }
        
        private updateSelectedState() {
            const wrappers = Array.from(this.shadowRoot?.querySelectorAll('.default-wrapper') || []);
            wrappers.forEach(wrapper => {
              // Check if any child element within the wrapper has the 'disabled' attribute
              const childWithDisabled = wrapper.querySelector('[disabled]');
              
              if (wrapper.id === this.selectedItemId) {
                wrapper.classList.add('selected');
                wrapper.setAttribute('selected', 'true');
              } else {
                wrapper.classList.remove('selected');
                wrapper.removeAttribute('selected');
              }
          
              if (childWithDisabled) {
                wrapper.setAttribute('disabled', '');
                wrapper.setAttribute('aria-disabled', 'true');
              } else {
                wrapper.removeAttribute('disabled');
                wrapper.removeAttribute('aria-disabled');
              }
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


        findClickedItem(event: Event): HTMLElement | 0 | undefined {
            const wrappers = Array.from(this.shadowRoot?.querySelectorAll('.default-wrapper') || []);
            const eventPath = event.composedPath();
        
            const clickedItem = wrappers.find(wrapper => eventPath.includes(wrapper)) as HTMLElement | undefined;
            console.log('clickedItems', clickedItem);
        
            if (clickedItem) {
                const isDisabled = Array.from(clickedItem.children).some(child => 
                    child.hasAttribute('disabled')
                ) || clickedItem.getAttribute('aria-disabled') === 'true';
                
                console.log("Disabled state:", isDisabled);
                
                if (isDisabled) {
                    return 0; // Indicate that the item is disabled and stop execution
                }
                
                return clickedItem;
            }
        
            return undefined;
        }
        
        
        

        clearSelectedState() {
            const wrappers = Array.from(this.shadowRoot?.querySelectorAll('.default-wrapper') || []);
            wrappers.forEach(wrapper => {
                wrapper.classList.remove('selected');
                wrapper.removeAttribute('selected');
            });
        }

        selectItem(item: HTMLElement) {
            item.classList.add('selected');
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
                <div class="default-wrapper"  aria-label=${item.ariaLabel} id="${item.id}" index="${index}">
                    ${item.template(item, index)} 
                </div>
            `;
        }

        render() {
            return html`
                <div class="md-advance-list-wrapper" tabindex="0" aria-label=${this.ariaLabelList} role=${this.ariaRoleList} @rangechange=${this.handleRangeChange}>
                    ${scroll({
                        items: this.items,
                        renderItem: (item: any, index?: number) => this.renderItem(item, index || 0),
                        useShadowDOM: true,
                    })}
                </div>
                ${this.isLoading ? html`<slot class="spin-loader" name="spin-loader"></slot>` : ''}
            `;
        }

        handleRangeChange(e: any) {
            this.handleScroll()
            const { last } = e;
            if (last >= this.items.length - 1 && !this.isLoading && !this.isError) {
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
