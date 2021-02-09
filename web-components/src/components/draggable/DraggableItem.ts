import { CSSResultArray, html, LitElement, property } from "lit-element";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import styles from "./scss/module.scss";
import { nothing } from "lit-html";

export namespace DraggableItem {
  @customElementWithCheck("md-draggable-item")
  export class ELEMENT extends LitElement { 
    @property({ type: Boolean }) row = false;

    connectedCallback() {
      super.connectedCallback();
    }

    static get styles(): CSSResultArray {
      return [reset, styles];
    }
    
    render() {
      return html`
        <div class="${this.row ? `md-draggable-row` : `md-draggable-item`}">
          ${this.row ? html`<md-icon name="panel-control-dragger_16"></md-icon>` : nothing}
          <slot></slot>
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
