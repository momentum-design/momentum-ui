import { html, internalProperty, LitElement, property, PropertyValues } from "lit-element";
import "@/components/advance-list/AdvanceList";
import "@/components/list/List";
import "@/components/list/ListItem";
import "@/components/menu-overlay/MenuOverlay";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";

export namespace ParentComponentWithStaticData {
  @customElementWithCheck("parent-component-with-static-data")
  export class ELEMENT extends LitElement {
    @property({ type: Array }) items: any = [];
    @property({ type: Boolean }) isLoading = false;
    @property({ type: Array }) value: string[] = [];
    @property({ type: Boolean }) isError = false;
    // @property({ type: Boolean }) isMultiSelectEnabled = true;
    @property({ type: Boolean }) groupOnMultiSelect = true;
    @internalProperty() totalRecords = 5;
    @internalProperty() loadedRecords = 5;
    @internalProperty() lastSelectedIdByOrder = "";
    @internalProperty() selectAllItems = false;
    @internalProperty() isMenuOverlayOpen = false;
    @internalProperty() disabledItems: string[] = [];
    @internalProperty() inputIcon = "arrow-down-bold";
    @internalProperty() overlayTriggerPlaceholder = "Select Animals";
    @internalProperty() searchQuery = "";
    @internalProperty() filteredItems: any = [];

    private allItems: any = [];

    constructor() {
      super();
      this.allItems = this.getStaticAnimalData();
      this.items = [...this.allItems];
      this.filteredItems = [...this.allItems];
      this.isLoading = false;
      this.isError = false;
    }

    private getStaticAnimalData() {
      return [
        {
          name: "Elephant",
          id: "animal-001",
          ariaLabel: "Elephant",
          template: (data: any, index: number) => this.createItemTemplate(data, index, false)
        },
        {
          name: "Lion",
          id: "animal-002",
          ariaLabel: "Lion",
          template: (data: any, index: number) => this.createItemTemplate(data, index, true)
        },
        {
          name: "Giraffe",
          id: "animal-003",
          ariaLabel: "Giraffe",
          template: (data: any, index: number) => this.createItemTemplate(data, index, false)
        },
        {
          name: "Penguin",
          id: "animal-004",
          ariaLabel: "Penguin",
          template: (data: any, index: number) => this.createItemTemplate(data, index, true)
        },
        {
          name: "Zebra",
          id: "animal-005",
          ariaLabel: "Zebra",
          template: (data: any, index: number) => this.createItemTemplate(data, index, false)
        }
      ];
    }

    private createItemTemplate(data: any, index: number, disabled: boolean) {
      if (disabled) {
        this.disabledItems.push(data.id);
      }
      return html`<div
        style="position:relative;min-height:1.25rem;box-sizing: border-box;display:flex;flex-flow:row nowrap;justify-content:flex-start;align-items:center;line-height:26px;"
        ?disabled=${disabled}
        aria-hidden="true"
        indexing="${index}"
      >
        <md-checkbox .disabled=${disabled}>${data.name}</md-checkbox>
      </div>`;
    }

    private handleSearch(event: CustomEvent) {
      const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
      this.searchQuery = searchValue;
      
      this.filteredItems = this.allItems.filter((item: any) => 
        item.name.toLowerCase().includes(searchValue)
      );

      // Update select all state based on filtered items
      const selectableFilteredItems = this.filteredItems.filter(
        (item: any) => !this.disabledItems.includes(item.id)
      );
      const selectedFilteredItems = selectableFilteredItems.filter(
        (item: any) => this.value.includes(item.id)
      );
      
      this.selectAllItems = 
        selectableFilteredItems.length > 0 && 
        selectedFilteredItems.length === selectableFilteredItems.length;

      this.items = this.getOrderedItems();
    }

    updated(changedProperties: PropertyValues) {
      if (changedProperties.has("value")) {
        this.updatePlaceholder();
      }
    }

    getOrderedItems() {
      const itemsToOrder = this.searchQuery ? this.filteredItems : this.allItems;
      
      if (this.groupOnMultiSelect) {
        const selectedItems = itemsToOrder.filter((item: any) => this.value.includes(item.id));
        const unselectedItems = itemsToOrder.filter((item: any) => !this.value.includes(item.id));

        selectedItems.sort((a: any, b: any) => this.naturalSort(a.name, b.name));
        unselectedItems.sort((a: any, b: any) => this.naturalSort(a.name, b.name));

        if (selectedItems.length > 0) {
          this.lastSelectedIdByOrder = selectedItems[selectedItems.length - 1].id;
        } else {
          this.lastSelectedIdByOrder = "";
        }
        return [...selectedItems, ...unselectedItems];
      } else {
        return [...itemsToOrder].sort((a, b) => this.naturalSort(a.name, b.name));
      }
    }

    private naturalSort(a: string, b: string): number {
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
    }

    updatePlaceholder() {
      const selectedItemsCount = this.value.length;
      this.overlayTriggerPlaceholder = selectedItemsCount ? `${selectedItemsCount} animals selected` : "Select Animals";
    }

    private handleListItemChange(event: CustomEvent) {
      this.value = event.detail.selected;
      const selectedItems = this.allItems
        .filter((item: any) => this.value.includes(item.id))
        .sort((a: any, b: any) => this.naturalSort(a.name, b.name));

      this.value = selectedItems.map((item: any) => item.id);
      this.updatePlaceholder();
      
      // Update select all state based on filtered items
      const selectableFilteredItems = this.filteredItems.filter(
        (item: any) => !this.disabledItems.includes(item.id)
      );
      const selectedFilteredItems = selectableFilteredItems.filter(
        (item: any) => this.value.includes(item.id)
      );
      
      this.selectAllItems = 
        selectableFilteredItems.length > 0 && 
        selectedFilteredItems.length === selectableFilteredItems.length;
    }

    updateSelectAllCheckboxOnClick() {
      if (this.selectAllItems) {
        // Deselect only the filtered items
        const filteredIds = this.filteredItems.map((item: any) => item.id);
        this.value = this.value.filter((id: string) => !filteredIds.includes(id));
        this.selectAllItems = false;
      } else {
        // Select all filtered items that aren't disabled
        const newSelectedIds = this.filteredItems
          .filter((item: any) => !this.disabledItems.includes(item.id))
          .map((item: any) => item.id);
        
        // Combine with existing selections that aren't in the filtered set
        const existingSelectedIds = this.value.filter(
          (id: string) => !this.filteredItems.find((item: any) => item.id === id)
        );
        
        this.value = [...new Set([...existingSelectedIds, ...newSelectedIds])];
        this.selectAllItems = true;
      }
      this.updatePlaceholder();
    }

    resetFilter() {
      this.selectAllItems = false;
      this.value = [];
      this.searchQuery = "";
      this.filteredItems = [...this.allItems];
      this.items = this.getOrderedItems();
    }

    getSelectAllLabel() {
      const selectableCount = this.filteredItems.filter(
        (item: any) => !this.disabledItems.includes(item.id)
      ).length;
      return `Select all${this.searchQuery ? ` (${selectableCount})` : ' animals'}`;
    }

    render() {
      return html`
        <h2>Animal Selection</h2>

        <md-menu-overlay
          class="animalDropdown"
          custom-width="300px"
          @menu-overlay-open=${() => {
            this.items = this.getOrderedItems();
            this.inputIcon = "arrow-up-bold";
            this.isMenuOverlayOpen = true;
          }}
          @menu-overlay-close=${() => {
            this.inputIcon = "arrow-down-bold";
            this.isMenuOverlayOpen = false;
          }}
        >
          <md-input
            value=${this.overlayTriggerPlaceholder}
            slot="menu-trigger"
            autoFocus
            shape="pill"
            readonly
            newMomentum
          >
            <md-icon slot="input-section-right" name=${this.inputIcon} iconset="momentumDesign"></md-icon>
          </md-input>

          <div style="margin:0.5rem; width: 100%">
            <md-input 
              placeholder="Search animals..." 
              shape="pill" 
              clear 
              autoFocus
              value=${this.searchQuery}
              @input=${this.handleSearch}
            ></md-input>
            <div style="margin-top:0.5rem; width: 100%">
              <div style="padding-left:15px; padding-bottom:10px; border-bottom: 1px solid var(--md-gray-20);">
                <md-checkbox
                  id="select-all-animals"
                  class="selectAll"
                  @checkbox-change=${this.updateSelectAllCheckboxOnClick}
                  .checked=${this.selectAllItems}
                >${this.getSelectAllLabel()}</md-checkbox>
              </div>
              ${this.isMenuOverlayOpen
                ? html`
                    <md-advance-list
                      .items=${this.items}
                      .isLoading=${this.isLoading}
                      .isError=${this.isError}
                      .value=${this.value}
                      ariaRoleList="listbox"
                      ariaLabelList="animal selector"
                      .totalRecords=${this.totalRecords}
                      .lastSelectedIdByOrder=${this.lastSelectedIdByOrder}
                      is-multi
                      .groupOnMultiSelect=${this.groupOnMultiSelect}
                      .selectAllItems=${this.selectAllItems}
                      .disabledItems=${this.disabledItems}
                      @list-item-change=${this.handleListItemChange}
                    >
                    </md-advance-list>`
                : html``}
            </div>
            <div>
              <md-button @button-click=${this.resetFilter} variant="primary">Reset Selection</md-button>
            </div>
          </div>
        </md-menu-overlay>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "parent-component-with-static-data": ParentComponentWithStaticData.ELEMENT;
  }
}