import "@/components/button/Button";
import "@/components/icon/Icon";
import { customElement, html, LitElement, property } from "lit-element";
import style from "./scss/module.scss";
import { ifDefined } from "lit-html/directives/if-defined";
import { nothing } from "lit-html";
import { isActionKey } from "@/utils/keyboard";

export namespace ListItemV2 {
  export type Variant = "full-width" | "inset-pill" | "inset-rectangle";

  @customElement("md-list-item-v2")
  export class ELEMENT extends LitElement {
    @property({ type: String }) label = "";
    @property({ type: Boolean }) expandable = false;
    @property({ type: Boolean, reflect: true }) expanded = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: String }) variant: Variant = "full-width";

    render() {
      const ariaExpanded = this.expandable ? this.expanded : undefined;

      return html`
        <div role="listitem" class="list-item" aria-label=${this.label} aria-disabled=${this.disabled}>
          <slot name="content">
            <button
              class="header"
              ?disabled=${this.disabled}
              aria-expanded=${ifDefined(ariaExpanded)}
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
        <div part="header-leading">
          <slot name="dragger"></slot>
          ${this.expandable
            ? html`<md-icon
                class="expand-icon"
                iconSet="momentumDesign"
                name="arrow-right-bold"
                size="14"
                ariaHidden="true"
              ></md-icon>`
            : nothing}
          ${this.renderLeadingControls()}
          <span>${this.label}</span>
        </div>
        <div part="header-trailing">${this.renderTrailingControls()}</div>
      `;
    }

    private renderLeadingControls() {
      return html`<slot
        name="leading-controls"
        @click=${this.stopEventPropagation}
        @keyup=${this.stopEventPropagation}
        @keydown=${this.stopEventPropagation}
      ></slot>`;
    }

    private renderTrailingControls() {
      return html`<slot
        name="trailing-controls"
        @click=${this.stopEventPropagation}
        @keyup=${this.stopEventPropagation}
        @keydown=${this.stopEventPropagation}
      ></slot>`;
    }

    protected stopEventPropagation(event: Event): void {
      if ((event instanceof KeyboardEvent && isActionKey(event.key)) || event instanceof MouseEvent) {
        event.stopPropagation();
      }
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
    "md-list-item-v2": ListItemV2.ELEMENT;
  }
}
