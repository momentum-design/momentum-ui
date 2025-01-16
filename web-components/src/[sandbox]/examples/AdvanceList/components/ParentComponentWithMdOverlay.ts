import { html, internalProperty, LitElement, property } from "lit-element";
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
    @property({ type: Boolean }) isMultiSelectEnabled = true;
    @property({ type: Boolean }) groupOnMultiSelect = true;
    @internalProperty() totalRecords = 0;
    @internalProperty() loadedRecords = 0;
    @internalProperty() lastSelectedIdByOrder = "";
    @internalProperty() selectAllItems = false;
    @internalProperty() unselectAllItems = false;
    @internalProperty() disabledItems: string[] = [];
    @internalProperty() inputIcon = "arrow-down-bold";

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
        this.loadedRecords = this.items.length;
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
        const selectedItems = this.items.filter((item: any) => this.value.includes(item.id));
        const unselectedItems = this.items.filter((item: any) => !this.value.includes(item.id));

        selectedItems.sort((a: any, b: any) => this.naturalSort(a.name, b.name));
        unselectedItems.sort((a: any, b: any) => this.naturalSort(a.name, b.name));

        if (selectedItems.length > 0) {
          this.lastSelectedIdByOrder = selectedItems[selectedItems.length - 1].id;
        } else {
          this.lastSelectedIdByOrder = "";
        }
        return [...selectedItems, ...unselectedItems];
      } else {
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
      this.selectAllItems = true;
      this.unselectAllItems = false;
    }

    setUnselectAllItems() {
      this.unselectAllItems = true;
      this.selectAllItems = false;
    }

    updateSelectAllCheckboxOnClick() {
      this.selectAllItems ? this.setUnselectAllItems() : this.setSelectAllItems();
    }

    updateSelectAllCheckboxOnEvent(event: CustomEvent) {
      this.selectAllItems = event.detail.selectAll;
      this.unselectAllItems = event.detail.unselectAll;
    }

    resetFilter() {
      this.setUnselectAllItems();
      this.value = [];
    }

    getSelectAllLabel() {
      return this.items.length < 100 ? "Select all" : `Select ${this.loadedRecords} of ${this.totalRecords}`;
    }

    render() {
      return html`
        <h2>With overlay</h2>

        <md-menu-overlay
          class="queueDropdown test-overlay"
          size="large"
          @menu-overlay-open=${() => {
            this.items = this.getOrderedItems();
            this.inputIcon = "arrow-up-bold";
          }}
          @menu-overlay-close=${() => {
            this.inputIcon = "arrow-down-bold";
          }}
        >
          <md-input placeholder="Search field with tabs" shape="pill" slot="menu-trigger" clear autoFocus>
            <md-icon slot="input-section-right" name=${this.inputIcon} iconset="momentumDesign"></md-icon>
          </md-input>

          <div style="margin:1.25rem; width: 100%">
            <md-input placeholder="Search..." shape="pill" clear autoFocus></md-input>
            <div style="margin:1.25rem; width: 100%">
              <div
                aria-hidden="true"
                style="padding-left:15px; padding-bottom:10px; border-bottom: 1px solid var(--md-gray-20);"
              >
                <md-checkbox
                  id="select-all-one"
                  class="selectAll"
                  @checkbox-change=${this.updateSelectAllCheckboxOnClick}
                  .checked=${this.selectAllItems}
                  >${this.getSelectAllLabel()}</md-checkbox
                >
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
                .isMultiSelectEnabled=${this.isMultiSelectEnabled}
                .groupOnMultiSelect=${this.groupOnMultiSelect}
                .selectAllItems=${this.selectAllItems}
                .unselectAllItems=${this.unselectAllItems}
                .disabledItems=${this.disabledItems}
                @list-item-change=${this.handleListItemChange}
                @load-more=${this.loadMoreItems}
                @update-select-all=${this.updateSelectAllCheckboxOnEvent}
              >
                <md-spinner size="24" slot="spin-loader"></md-spinner>
              </md-advance-list>
            </div>
            <div aria-hidden="true">
              <md-button @button-click=${this.resetFilter} variant="primary">Reset the filter</md-button>
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
