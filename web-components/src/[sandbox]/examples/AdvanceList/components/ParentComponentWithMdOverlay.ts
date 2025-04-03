import "@/components/advance-list/AdvanceList";
import "@/components/checkbox/Checkbox";
import "@/components/input/Input";
import "@/components/list/List";
import "@/components/list/ListItem";
import "@/components/menu-overlay/MenuOverlay";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { html, LitElement, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";

export namespace ParentComponentWithMdOverlay {
  @customElementWithCheck("parent-component-with-overlay")
  export class ELEMENT extends LitElement {
    @property({ type: Array }) items: any = [];
    @property({ type: Boolean }) isLoading = false;
    @property({ type: Array }) value: string[] = [];
    @property({ type: Boolean }) isError = false;
    @property({ type: Boolean }) groupOnMultiSelect = true;

    @state()
    private page = 1;

    @state()
    private totalRecords = 0;

    @state()
    private loadedRecords = 0;

    @state()
    private lastSelectedIdByOrder = "";

    @state()
    private selectAllItems = false;

    @state()
    private isMenuOverlayOpen = false;

    @state()
    private readonly disabledItems: string[] = [];

    @state()
    private inputIcon = "arrow-down-bold";

    @state()
    private overlayTriggerPlaceholder = "Search field with tabs";

    private counter = 0;
    constructor() {
      super();
      this.items = [];
      this.page = 1;
      this.isLoading = false;
      this.isError = false;
      this.loadMoreItems();
    }

    updated(changedProperties: PropertyValues) {
      console.log("changedProperties", changedProperties);
      if (changedProperties.has("value")) {
        this.updatePlaceholder();
      }
    }

    generateUUID() {
      const baseUUID = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });

      // Increment the counter and pad with zeros to ensure 3 characters
      this.counter++;
      const counterString = this.counter.toString().padStart(3, "0");

      // Replace the last 3 characters of the UUID with the counter
      return baseUUID.slice(0, -3) + counterString;
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
      } catch (_err) {
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    }

    async fetchItems(page: number) {
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
              style="position:relative;min-height:1.25rem;box-sizing: border-box;display:flex;flex-flow:row nowrap;justify-content:flex-start;align-items:center;line-height:26px;"
              ?disabled=${disabled}
              aria-hidden="true"
              indexing="${index}"
            >
              <md-checkbox ?disabled=${disabled === "true"}>${data.name}</md-checkbox>
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

    updatePlaceholder() {
      const selectedItemsCount = this.value.length;
      this.overlayTriggerPlaceholder = selectedItemsCount ? `${selectedItemsCount} selected` : "Search field with tabs";
    }

    private handleListItemChange(event: CustomEvent) {
      this.value = event.detail.selected;
      // Filter and sort the selected items based on the `name` property
      const selectedItems = this.items
        .filter((item: any) => this.value.includes(item.id))
        .sort((a: any, b: any) => this.naturalSort(a.name, b.name));

      // Update `this.value` with the sorted IDs
      this.value = selectedItems.map((item: any) => item.id);

      this.updatePlaceholder();
      if (this.value.length === this.items.length - this.disabledItems.length) {
        this.selectAllItems = true;
      } else {
        this.selectAllItems = false;
      }
      document.dispatchEvent(new CustomEvent("on-widget-update"));
    }

    updateSelectAllCheckboxOnClick() {
      if (this.selectAllItems) {
        this.resetFilter();
      } else {
        this.selectAllItems = true;
      }
    }

    resetFilter() {
      this.selectAllItems = false;
      this.value = [];
    }

    getSelectAllLabel() {
      return this.items.length < 100
        ? "Select all"
        : `Select ${this.loadedRecords - this.disabledItems.length} of ${this.totalRecords}`;
    }

    render() {
      return html`
        <h2>With overlay</h2>

        <md-menu-overlay
          class="queueDropdown test-overlay"
          custom-width="300px"
          @menu-overlay-open=${() => {
            this.items = this.getOrderedItems();
            this.inputIcon = "arrow-up-bold";
            this.isMenuOverlayOpen = true;
            document.dispatchEvent(new CustomEvent("on-widget-update"));
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
            <md-input placeholder="Search..." shape="pill" clear autoFocus></md-input>
            <div style="margin-top:0.5rem; width: 100%">
              <div style="padding-left:15px; padding-bottom:10px; border-bottom: 1px solid var(--md-gray-20);">
                <md-checkbox
                  id="select-all-one"
                  class="selectAll"
                  @checkbox-change=${this.updateSelectAllCheckboxOnClick}
                  .checked=${this.selectAllItems}
                  >${this.getSelectAllLabel()}</md-checkbox
                >
              </div>
              ${this.isMenuOverlayOpen
                ? html` <md-advance-list
                    .items=${this.items}
                    .isLoading=${this.isLoading}
                    .isError=${this.isError}
                    .value=${this.value}
                    ariaRoleList="listbox"
                    ariaLabelList="state selector"
                    .totalRecords=${this.totalRecords}
                    .lastSelectedIdByOrder=${this.lastSelectedIdByOrder}
                    is-multi
                    .groupOnMultiSelect=${this.groupOnMultiSelect}
                    .selectAllItems=${this.selectAllItems}
                    .disabledItems=${this.disabledItems}
                    @list-item-change=${this.handleListItemChange}
                    @load-more=${this.loadMoreItems}
                  >
                    <md-spinner size="24" slot="spin-loader"></md-spinner>
                  </md-advance-list>`
                : html``}
            </div>
            <div>
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
