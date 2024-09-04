import { LitElement, html, css, property, internalProperty, query, queryAll, PropertyValues } from 'lit-element';
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { scroll } from "lit-virtualizer";
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
        @query(".virtual-scroll") listContainer?: HTMLDivElement;
        @internalProperty() page = 1;
        @internalProperty() hasSlotContent = false;
        @property ({type: Number}) totalRecords = 0;
        @internalProperty() activeItem: HTMLElement | null | undefined = null;
        @internalProperty() cyclicIndex = -1;
        @internalProperty() activeId: string = "";
        @internalProperty() selectedIndex = -1;

        constructor() {
            super();
            this.items = [];
            this.isLoading = false;
            this.isError = false;
            this.page = 1;
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
                console.log("Value---",this.value, this.selectedItemId);
                // Wait for the update to complete before running your logic.
                this.requestUpdate().then(() => {
                    console.log("After request updated");
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


    
    getVisibleElementById = (id: string) => {
      // Get all elements with the specified ID
      const elements: NodeListOf<HTMLElement> | undefined = this.shadowRoot?.querySelector(`.virtual-scroll`)?.querySelectorAll(`#${id}`);
      // Iterate over the elements and return the first one that is not hidden
      if (elements) {
        for (let element of elements) {
          if (window.getComputedStyle(element).display !== "none") {
            return element;
          }
      }

      // If no visible element is found, return null
      return null;
    };

    findActiveItem = (activeId: string) => {
        const activeItem: HTMLElement | null = this.getVisibleElementById(`item-${activeId}`);
        const dispalyedActiveItem = activeItem?.offsetHeight !== 0 ? activeItem : null;
        return dispalyedActiveItem;
    }

    scrollToActiveItem() {
      console.log("ActiveItem--", this.activeId);
      
        const activeItem: HTMLElement | null = this.getVisibleElementById(`item-${this.activeId}`);
      
      const dispalyedActiveItem = activeItem?.offsetHeight !== 0 ? activeItem : null;
      console.log("ActiveItem1233--", activeItem, dispalyedActiveItem, this.cyclicIndex);
      this.clearFocusedState();
     
      if (dispalyedActiveItem) {
        this.focusItem(dispalyedActiveItem);
      } 
      return dispalyedActiveItem
    }
    private setFocusOnHost(force: boolean) {
        if (this.setFocus) {
          this.setFocus(force);
        }
      }

    handleKeyDown(event: KeyboardEvent) {
        console.log("HandleKeyDown---", event);
        this.setFocusOnHost(true);
      switch (event.key) {
        case "ArrowDown": {
            this.setFocusOnHost(true);
            const currentIndex = this.items.findIndex((item) => item.id === this.activeId);
            console.log("CurrentIndex---", currentIndex);
            if(currentIndex === this.totalRecords - 1){
                this.activeId = this.items[0].id;
                this.cyclicIndex = 0;
            } else if (currentIndex < this.totalRecords - 1) {
            this.activeId = this.items[currentIndex + 1].id;
            console.log("ArrowDown ActiveId--", this.activeId);
            this.activeItem = this.scrollToActiveItem();
            console.log("ArrowDown ActiveItem--", this.activeItem);
            this.cyclicIndex = parseInt(this.activeItem?.getAttribute("index") || currentIndex + "")
            console.log("ArrowDown CyclicIndex--", this.cyclicIndex);
          } else {

          }
        }
          break;
        case "ArrowUp": {
            this.setFocusOnHost(true);
             const currentIndex = this.items.findIndex((item) => item.id === this.activeId);
             console.log("CurrentIndex---", currentIndex);
          if (currentIndex > 0) {
            this.activeId = this.items[currentIndex - 1].id;
            console.log("ArrowUP ActiveId--", this.activeId);
            this.activeItem = this.scrollToActiveItem();
            console.log("ArrowUP ActiveItem--", this.activeItem);
            this.cyclicIndex = parseInt(this.activeItem?.getAttribute("index") || currentIndex + "") ?? 0
            console.log("ArrowUP CyclicIndex--", this.cyclicIndex);
          } else if(currentIndex === 0  && this.items.length === this.totalRecords){
            this.activeId = this.items[this.totalRecords - 1].id;
            this.cyclicIndex = this.items.length - 1;
          }
        }
          break;
        case "Enter":
        const currentIndex = this.items.findIndex((item) => item.id === this.activeId);
          this.handleItemSelect(currentIndex);
          break;
        default:
          break;
      }
    }

    handleItemSelect(index: number) {
      if (index >= 0 && index < this.items.length) {
        const selectedItem = this.items[index];
        console.log("Selected item:", selectedItem);
        // You can dispatch an event or handle the selection as needed
      }
    }






    handleClick(event: Event) {
      const clickedItem = this.findClickedItem(event);
      event.preventDefault();
      if (clickedItem) {
        
        this.clearSelectedState();
        this.selectItem(clickedItem);
        this.setSelected(clickedItem.id);
        this.setFocusOnHost(true);
        this.activeId = clickedItem.id.substring(clickedItem.id.indexOf("-") + 1);
        this.scrollToActiveItem();
        console.log("ActiveId---", this.activeId);
        this.cyclicIndex = parseInt(clickedItem.getAttribute("index") || "0");
        this.listContainer?.focus();
        
      }
    }

    clearFocusedState() {
      const wrappers = Array.from(this.shadowRoot?.querySelectorAll(".default-wrapper") || []);
      wrappers.forEach((wrapper) => {
        wrapper.classList.remove("focused");
      });
    }
    focusItem(item: HTMLElement) {
      item.classList.add("focused");
    }


    setSelected(newId: string) {
      if (this.selectedItemId !== newId) {
        console.log("Selected item id---", newId);
        this.selectedItemId = newId;
        this.requestUpdate();
        this.notifySelectedChange();
      }
    }

    notifySelectedChange() {
      this.dispatchEvent(
        new CustomEvent("list-item-change", {
          detail: { selected: this.selectedItemId },
          bubbles: true,
          composed: true
        })
      );
    }

    renderItem(item: any, index: number) {
      console.log("Focused---", this.activeId, item, this.activeId === item.id);
      return html`
        <div class="default-wrapper" aria-label=${item.name} id="item-${item.id}" index="${index}">${item.template(item, index)}</div>
      `;
    }

    render() {
      return html`
        <div
        class="md-advance-list-wrapper virtual-scroll" tabindex="0" aria-label=${this.ariaLabelList} role=${this.ariaRoleList} @rangechange=${this.handleRangeChange}
        >
          ${scroll({
            items: this.items,
            renderItem: (item: any, index?: number) => this.renderItem(item, index || 0),
            useShadowDOM: true,
            scrollToIndex: {
                index: this.cyclicIndex,
                position: this.cyclicIndex === 0 ? "start" : "center"
              }
          })}
        </div>
        ${this.isLoading ? html`<slot class="spin-loader" name="spin-loader"></slot>` : ''}
      `;
    }

    handleRangeChange = (e: any) => {
      const { last, firstVisible } = e;
      this.clearSelectedState();
      this.updateSelectedState();
      console.log("Handle RangeChange---", this.cyclicIndex);
      this.scrollToActiveItem();
      this.setFocusOnHost(true);
      this.listContainer?.focus();
      console.log("Total Length", last, this.totalRecords, this.items.length, this.activeItem);
      if (this.items.length < this.totalRecords && last >= this.items.length - 1 && !this.isLoading) {
        this.isLoading = true;
        this.cyclicIndex = last;
        this.dispatchEvent(
          new CustomEvent("load-more", {
            detail: { page: this.page },
            bubbles: true,
            composed: true
          })
        );
        this.page += 1;
      }

    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-advance-list": AdvanceList.ELEMENT;
  }
}
