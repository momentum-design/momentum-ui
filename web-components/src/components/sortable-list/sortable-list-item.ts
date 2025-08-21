import "@/components/button/Button";
import "@/components/icon/Icon";
import { customElement, html, LitElement, property } from "lit-element";
import style from "./scss/module.scss";
import { ifDefined } from "lit-html/directives/if-defined";
import { nothing } from "lit-html";

export namespace SortableListItem {
  @customElement("md-sortable-list-item")
  export class ELEMENT extends LitElement {
    @property({ type: String }) label = "";
    @property({ type: Boolean }) expandable = false;
    @property({ type: Boolean, reflect: true }) expanded = false;
    @property({ type: Boolean, reflect: true }) disabled = false;

    render() {
      const expandable = this.expandable ? this.expanded : undefined;

      return html`
        <div class="sortable-list-item">
          <slot name="content">
            <button
              class="header"
              ?disabled=${this.disabled}
              aria-expanded=${ifDefined(expandable)}
              @click=${this._handleClick}
            >
              ${this.renderHeaderContent()}
            </button>
            <div class="panel-container">
              <div class="expandable-content">
                <slot name="panel"></slot>
              </div>
            </div>
          </slot>
        </div>
      `;
    }

    private renderHeaderContent() {
      return html`
        <div class="header-leading">
          <slot name="dragger"></slot>
          ${this.expandable
            ? html`<md-icon iconSet="momentumDesign" name="arrow-right-bold" size="14" class="expand-icon"></md-icon>`
            : nothing}
          <slot name="leading-controls"></slot>
          <span>${this.label}</span>
        </div>
        <div class="header-trailing">
          <slot name="trailing-controls"></slot>
        </div>
      `;
    }

    private _handleClick() {
      if (this.expandable) {
        this.expanded = !this.expanded;
      }
      this.dispatchEvent(new CustomEvent("list-item-click", { bubbles: true }));
    }

    static get styles() {
      return style;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-sortable-list-item": SortableListItem.ELEMENT;
  }
}
