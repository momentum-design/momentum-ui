import "@/components/button/Button";
import "@/components/icon/Icon";
import { Key } from "@/constants";
import { isActionKey, isNavigationKey } from "@/utils/keyboard";
import { customElement, html, LitElement, property } from "lit-element";
import { nothing } from "lit-html";
import style from "./scss/module.scss";

export namespace ListItemV2 {
  export type Variant = "full-width" | "inset-pill" | "inset-rectangle";

  /**
   * @fires list-item-click
   * @fires list-item-expanded
   */
  @customElement("md-list-item-v2")
  export class ELEMENT extends LitElement {
    /**
     * The primary label of the list item.
     * This appears on the leading side of the list item.
     */
    @property({ type: String, reflect: true }) label?: string;

    /**
     * Secondary label of the list item.
     * This appears on the trailing side of the list item, under the primary label
     */
    @property({ type: String, reflect: true, attribute: "secondary-label" }) secondaryLabel?: string;
    /**
     * Tertiary label of the list item.
     * This appears on the leading side of the list item, under the secondary label.
     */
    @property({ type: String, reflect: true, attribute: "tertiary-label" }) tertiaryLabel?: string;

    /**
     * Make the list item expandable.
     * This will allow the content inside the "panel" slot to be collapsible.
     * It will render an expand button before the leading controls
     */
    @property({ type: Boolean }) expandable = false;

    /**
     * Whether the list item is expanded.
     * @default false
     */
    @property({ type: Boolean, reflect: true }) expanded = false;
    @property({ type: Boolean, reflect: true }) disabled = false;

    /**
     * The visual style variant of the list item. This can be a pill, rectangle or a full-width
     */
    @property({ type: String }) variant: Variant = "full-width";

    /**
     * The ARIA label for the expand button. Only use if `expandable` is true.
     */
    @property({ type: String, attribute: "expand-label" }) expandLabel = "Expand";

    render() {
      return html`
        <slot name="content">
          <div class="header">
            <div part="header-leading">
              ${this.expandable ? this.renderExpandButton() : nothing} ${this.renderLeadingControls()}
              <div part="leading-text">
                ${this.label ? html`<span part="primary-label">${this.label}</span>` : nothing}
                ${this.secondaryLabel ? html`<span part="secondary-label">${this.secondaryLabel}</span>` : nothing}
                ${this.tertiaryLabel ? html`<span part="tertiary-label">${this.tertiaryLabel}</span>` : nothing}
              </div>
            </div>
            <div part="header-trailing">${this.renderTrailingControls()}</div>
          </div>
          <div class="panel-container">
            <div class="expandable-content">
              <slot
                name="panel"
                @click=${this.stopEventPropagation}
                @keyup=${this.stopArrowKeyEventPropagation}
                @keydown=${this.stopArrowKeyEventPropagation}
              ></slot>
            </div>
          </div>
        </slot>
      `;
    }

    private renderExpandButton() {
      return html`<md-button
        circle
        size="24"
        @button-click=${this._handleExpand}
        @click=${this.stopEventPropagation /* Stop click event from bubbling to list-item-click */}
        ?disabled=${this.disabled}
        ariaExpanded=${this.expanded}
        ariaLabel=${this.expandLabel}
        ariaLive="polite"
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

    private stopArrowKeyEventPropagation(event: Event) {
      if (event instanceof KeyboardEvent && isNavigationKey(event.key)) {
        event.stopPropagation();
      }
    }

    private isExpandCollapseKey(key: string): boolean {
      return key === Key.ArrowRight || key === Key.ArrowLeft;
    }

    protected stopEventPropagation(event: Event): void {
      if (
        (event instanceof KeyboardEvent && (isActionKey(event.key) || this.isExpandCollapseKey(event.key))) ||
        event instanceof MouseEvent
      ) {
        event.stopPropagation();
      }
    }

    private setExpanded(expanded: boolean) {
      this.expanded = expanded;
      this.setAttribute("aria-expanded", String(this.expanded));
      this.dispatchEvent(new CustomEvent<boolean>("list-item-expanded", { bubbles: true, detail: this.expanded }));
    }

    private _handleExpand(event: Event) {
      event.stopPropagation();
      if (this.expandable) {
        this.setExpanded(!this.expanded);
      }
    }

    private _handleListItemClick() {
      if (!this.disabled) {
        this.dispatchEvent(new CustomEvent("list-item-click", { bubbles: true }));
      }
    }

    private _handleArrowKeyExpand(event: KeyboardEvent) {
      if (event.key === Key.ArrowRight && !this.expanded) {
        event.stopPropagation();
        this.setExpanded(true);
      } else if (event.key === Key.ArrowLeft && this.expanded) {
        event.stopPropagation();
        this.setExpanded(false);
      }
    }

    connectedCallback(): void {
      super.connectedCallback();
      this.setAttribute("role", "listitem");
      this.setAttribute("tabindex", "0");
      this.addEventListener("click", this._handleListItemClick);
      if (this.expandable) {
        this.addEventListener("keydown", this._handleArrowKeyExpand);
      }
    }

    disconnectedCallback(): void {
      super.disconnectedCallback();
      this.removeEventListener("click", this._handleListItemClick);
      // Remove regardless of expandable - could be added initially but expandable could be disabled later
      this.removeEventListener("keydown", this._handleArrowKeyExpand);
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
