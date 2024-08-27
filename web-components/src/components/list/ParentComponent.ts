import { html, LitElement, css, property, internalProperty, PropertyValues, query } from "lit-element";
// import './infinite-scroll-list';
import './InfiniteScrollList';

export namespace ParentComponent {

export class ELEMENT extends LitElement {
    @property({ type: Array }) items = [];
    @internalProperty() page = 1;

  constructor() {
    super();
    this.items = [];
    this.page = 1;
    this.loadMoreItems();
  }

  async loadMoreItems() {
    // Simulate an API call to load more items
    const newItems = await this.fetchItems(this.page);
    // this.shadowRoot?.querySelector('infinite-scroll-list').setItems(newItems);
    const infiniteScrollList = this.shadowRoot?.querySelector('infinite-scroll-list');
    if (infiniteScrollList) {
        infiniteScrollList.setItems(newItems);
    }
    this.page += 1;
  }

  async fetchItems(page : any) {
    // Simulated delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate fetching 20 new items
    const newItems = Array.from({ length: 20 }, (_, i) => ({
      data: `Item ${(page - 1) * 20 + i + 1}`,
      template: (data : any) => html`<div class="item">${data}</div>`
    }));
    return newItems;
  }

  render() {
    return html`
    <h2>testing.....</h2>
      <infinite-scroll-list @load-more=${this.loadMoreItems}></infinite-scroll-list>
    `;
  }

  static get styles() {
    return css`
      .item {
        padding: 16px;
        border-bottom: 1px solid #ccc;
      }
    `;
  }
}
}

declare global {
    interface HTMLElementTagNameMap {
        "parent-component": ParentComponent.ELEMENT;
    }
}
