import "@/components/advance-list/AdvanceList";
import "@/components/spinner/Spinner";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { html, internalProperty, LitElement, property } from "lit-element";

export namespace ParentComponentGeneric {
  @customElementWithCheck("parent-component-generic")
  export class ELEMENT extends LitElement {
    @property({ type: Array }) items: any = [];
    @property({ type: Boolean }) isLoading = false;
    @property({ type: Array }) value: string[] = [];
    @property({ type: Boolean }) isError = false;

    @internalProperty()
    private page = 1;

    @internalProperty()
    private readonly totalRecords = 60000; // Total count is set to 6000

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
        this.page += 1;
        this.isLoading = false;
        this.value = this.items[1].id;
      } catch (_err) {
        this.isLoading = false;
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    }

    async fetchItems(page: number) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Adjusted the length to 200 for initial render
      const newItems = Array.from({ length: 2000 }, (_, i) => ({
        name: `Item ${(page - 1) * 2000 + i + 1}`,
        id: this.generateUUID(),
        index: i,
        ariaLabel: `Item ${(page - 1) * 2000 + i + 1}`,
        template: (data: any, index: number) =>
          html` <div
            style="position:relative;min-height:1.25rem;box-sizing: border-box;display:flex;flex-flow:row unwrap;justify-content:flex-start;align-items:center;line-height:20px; gap:0.5rem;"
            ?disabled="${index % 2 === 0}"
            aria-hidden="true"
            indexing="${index}"
          >
            <md-icon name="info-badge-filled" iconSet="momentumDesign"> </md-icon>
            ${data.name}
          </div>`
      }));
      return newItems;
    }

    private handleListItemChange(_event: CustomEvent) {
      //API call send to end point to update the item
    }

    render() {
      return html`
        <h2>Generic Item List</h2>
        <md-advance-list
          .items=${this.items}
          .isLoading=${this.isLoading}
          .isError=${this.isError}
          ariaRoleList="listbox"
          ariaRoleListItem="option"
          ariaLabelList="state selector"
          .totalRecords=${this.totalRecords}
          @list-item-change=${this.handleListItemChange}
          @load-more=${this.loadMoreItems}
        >
          <md-spinner size="24" slot="spin-loader"></md-spinner>
        </md-advance-list>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "parent-component-generic": ParentComponentGeneric.ELEMENT;
  }
}
