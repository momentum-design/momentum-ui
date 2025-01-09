import { html, internalProperty, LitElement, property } from "lit-element";
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
    @property({ type: String }) groupOnDemand = "false";
    @internalProperty() totalRecords = 0;

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
        this.isLoading = false;
        this.value.push(this.items[1].id);
      } catch (err) {
        this.isLoading = false;
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
              <md-checkbox .checked=${this.value.includes(id)} .disabled=${disabled === "true"}
                >${data.name}</md-checkbox
              >
            </div>`
        };
      });
    }

    private handleListItemChange(_event: CustomEvent) {
      // stub for implementation of event handler
    }

    render() {
      return html`
        <h2>With overlay</h2>

        <md-menu-overlay
          class="queueDropdown test-overlay"
          size="large"
          @menu-overlay-open=${() => {
            console.log("Opening modal--");
            this.groupOnDemand = "true";
            document.dispatchEvent(new CustomEvent("on-widget-update"));
          }}
          @menu-overlay-close=${() => {
            console.log("Closing modal--");
            this.groupOnDemand = "false";
            document.dispatchEvent(new CustomEvent("on-widget-update"));
          }}
        >
          <md-input placeholder="Search field with tabs" shape="pill" slot="menu-trigger" clear autoFocus></md-input>
          <md-input placeholder="Search..." shape="pill" clear autoFocus></md-input>
          <div style="margin:1.25rem; width: 100%">
            <md-advance-list
              .items=${this.items}
              .isLoading=${this.isLoading}
              .isError=${this.isError}
              .value=${this.value}
              ariaRoleList="listbox"
              ariaLabelList="state selector"
              .totalRecords=${this.totalRecords}
              .groupOnDemand=${this.groupOnDemand}
              @list-item-change=${this.handleListItemChange}
              @load-more=${this.loadMoreItems}
            >
              <md-spinner size="24" slot="spin-loader"></md-spinner>
            </md-advance-list>
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
