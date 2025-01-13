import { html, internalProperty, LitElement, property, query, PropertyValues } from "lit-element";
// import "@/components/list/InfiniteScrollList";
import "@/components/advance-list/AdvanceList";
import "@/components/list/List";
import "@/components/list/ListItem";
import "@/components/menu-overlay/MenuOverlay";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";

export namespace ParentComponentWithMdOverlay {
  @customElementWithCheck("parent-component-with-overlay")
  export class ELEMENT extends LitElement {
    @property({ type: Array }) items: any = [];
    @internalProperty() page = 1;
    @property({ type: Boolean }) isLoading = false;
    @property({ type: Array }) value: string[] = [];
    @property({ type: Boolean }) isError = false;
    @property({ type: Boolean }) groupOnMultiSelect = true;
    @internalProperty() totalRecords = 0;
    @internalProperty() lastSelectedIdByOrder = "";
    @internalProperty() firstSelectedIdByOrder = "";
    @internalProperty() selectAllItems = false;
    @internalProperty() disabledItems: string[] = [];
    @query("#select-all-one") selectAllOne?: HTMLDivElement;


    constructor() {
      super();
      this.items = [];
      this.page = 1;
      this.isLoading = false;
      this.isError = false;
      this.loadMoreItems();
    }

    generateUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
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
        this.value.push(this.items[1].id);
      } catch (err) {
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    }

    async fetchItems(page: number) {
      // Generate new items
      const newItems = this.generateItems(page);
      return newItems;
    }

    private generateItems(page: number) {
      const itemsPerPage = 2000;
      return Array.from({ length: itemsPerPage }, (_, i) => {
        const id = this.generateUUID(); // Generate a unique ID for each item
        const itemName = `Item ${(page - 1) * itemsPerPage + i + 1}`;
        const disabled = i % 2 === 0 ? "true" : "";
        if (disabled) {
          this.disabledItems.push(id);
        }
        return {
          name: itemName,
          id,
          index: i,
          ariaLabel: itemName,
          template: (data: any, index: number) =>
            html`<div
              style="position:relative;min-height:1.25rem;box-sizing: border-box;display:flex;flex-flow:row nowrap;justify-content:flex-start;align-items:center;line-height:30px;"
              ?disabled=${disabled}
              aria-hidden="true"
              indexing="${index}"
            >
              <md-checkbox .disabled=${disabled === "true"}>${data.name}</md-checkbox>
            </div>`
        };
      });
    }

    getOrderedItems() {
      if (this.groupOnMultiSelect) {
        // Filter selected and unselected items
        const selectedItems = this.items.filter((item: any) => this.value.includes(item.id));
        const unselectedItems = this.items.filter((item: any) => !this.value.includes(item.id));
       
        // Sort selected and unselected items using natural sort
        selectedItems.sort((a: any, b: any) => this.naturalSort(a.name, b.name));
        unselectedItems.sort((a: any, b: any) => this.naturalSort(a.name, b.name));

         // Update first and last selected IDs
         if (selectedItems.length > 0) {
          this.firstSelectedIdByOrder = selectedItems[0].id;
          this.lastSelectedIdByOrder = selectedItems[selectedItems.length - 1].id;
        } else {
          this.firstSelectedIdByOrder = "";
          this.lastSelectedIdByOrder = "";
        }
    
        // Combine sorted selected and unselected items
        return [...selectedItems, ...unselectedItems];
      } else {
        // Sort all items using natural sort when grouping is disabled
        return [...this.items].sort((a, b) => this.naturalSort(a.name, b.name));
      }
    }
    
    private naturalSort(a: string, b: string): number {
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
    }
    
    private handleListItemChange(event: CustomEvent) {
      // stub for implementation of event handler
      this.value = event.detail.selected;
    }

    setSelectAllItems() {
      console.log("Select All in UI--");
      this.selectAllItems = !this.selectAllItems;
    }

    resetFilter() {
      console.log("Reset the filter--");
      this.selectAllItems = false;
      this.value = [];
      this.selectAllOne?.removeAttribute("checked");
    } 

    render() {
      return html`
        <h2>With overlay</h2>

        <md-menu-overlay
          class="queueDropdown test-overlay"
          size="large"
          @menu-overlay-open=${() => {
            console.log("Opening modal--");
            this.items = this.getOrderedItems();
          }}
        >
          <md-input placeholder="Search field with tabs" shape="pill" slot="menu-trigger" clear autoFocus></md-input>
          <md-input placeholder="Search..." shape="pill" clear autoFocus></md-input>
          <div style="margin:1.25rem; width: 100%">
            <div aria-hidden="true">
              <md-checkbox id="select-all-one" class="selectAll" @checkbox-change=${this.setSelectAllItems}>Select All in UI</md-checkbox>
            </div>
            <md-advance-list
              .items=${this.items}
              .isLoading=${this.isLoading}
              .isError=${this.isError}
              .value=${this.value}
              ariaRoleList="listbox"
              ariaLabelList="state selector"
              .totalRecords=${this.totalRecords}
              .lastSelectedIdByOrder=${this.lastSelectedIdByOrder}
              .firstSelectedIdByOrder=${this.firstSelectedIdByOrder}
              .isMultiSelectEnabled=${true}
              .groupOnMultiSelect=${this.groupOnMultiSelect}
              .selectAllItems=${this.selectAllItems}
              .disabledItems=${this.disabledItems}
              @list-item-change=${this.handleListItemChange}
              @load-more=${this.loadMoreItems}
            >
              <md-spinner size="24" slot="spin-loader"></md-spinner>
            </md-advance-list>
             <div aria-hidden="true">
              <md-button @button-click=${this.resetFilter} variant="white">Reset the filter</md-button>
            </div>
          </div>
        </md-menu-overlay>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "parent-component-with-overlay": ParentComponentWithMdOverlay.ELEMENT;
  }
}
