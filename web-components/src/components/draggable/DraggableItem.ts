import { html, LitElement, property } from "lit-element";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { FocusMixin } from "@/mixins";
import reset from "@/wc_scss/reset.scss";
import styles from "./scss/module.scss";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map";

export namespace DraggableItem {
  @customElementWithCheck("md-draggable-item")
  export class ELEMENT extends FocusMixin(LitElement) { 
    @property({ type: Boolean }) row = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    private _edit = false;
    @property({ type: Boolean, reflect: true })
    get edit() {
      return this._edit;
    }
    set edit(value: boolean) {
      const oldValue = this._edit;
      this._edit = value;
      this.requestUpdate("edit", oldValue);
    }

    connectedCallback() {
      super.connectedCallback();
    }

    static get styles() {
      return [reset, styles];
    }

    get dragItemClassMap() {
      return {
        "md-draggable-row": !!this.row,
        "md-draggable-item": !this.row,
        "md-draggable_disabled": this.disabled
      };
    }
    
    render() {
      return html`
        <div
          class="${classMap(this.dragItemClassMap)}"
          part="draggable-item"
          tabindex="0"
          aria-disabled=${this.disabled}>
          ${this.edit && this.row ? html`<md-icon name="panel-control-dragger_16"></md-icon>` : nothing}
          <slot></slot>
          ${this.row ? html`<slot name="row"></slot>` : nothing}
        </div>
      `;
    }
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "md-draggable-item": DraggableItem.ELEMENT;
  }
}
