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
      return html`
        <div
          role="listitem"
          class="list-item"
          aria-label=${this.label}
          aria-disabled=${this.disabled}
          @click=${this._handleListItemClick}
        >
          <slot name="content">
            <div class="header">
              <div part="header-leading">
                ${this.expandable ? this.renderExpandButton() : nothing} ${this.renderLeadingControls()}
                <span>${this.label}</span>
              </div>
              <div part="header-trailing">${this.renderTrailingControls()}</div>
            </div>
            <div class="panel-container">
              <div class="expandable-content">
                <slot name="panel"></slot>
              </div>
            </div>
          </slot>
        </div>
      `;
    }

    private renderExpandButton() {
      return html`<md-button
        circle
        size="24"
        @button-click=${this._handleExpand}
        ?disabled=${this.disabled}
        aria-expanded=${ifDefined(this.expanded)}
        ariaLabel="Expand"
      >
        <md-icon
          slot="icon"
          class="expand-icon"
          iconSet="momentumDesign"
          name="arrow-right-bold"
          size="14"
          ariaHidden="true"
        ></md-icon>
      </md-button>`;
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

    private _handleExpand(e: MouseEvent) {
      e.stopPropagation();
      if (this.expandable) {
        this.expanded = !this.expanded;
      }
    }

    private _handleListItemClick() {
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
