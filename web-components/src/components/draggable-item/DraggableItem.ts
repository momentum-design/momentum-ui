import { CSSResultArray, customElement, html, internalProperty, LitElement, property, query } from "lit-element";
import reset from "@/wc_scss/reset.scss";
import styles from "./scss/module.scss";

@customElement("md-draggable-item")
export class DraggableItem extends LitElement { 
  @property({ type: Boolean }) isDraggingStarted = false;
  @property({ type: Number }) x = 0;
  @property({ type: Number }) y = 0;
    
  @query("#list") list: HTMLElement | undefined;

  connectedCallback() {
    super.connectedCallback();
  }

  static get styles(): CSSResultArray {
    return [reset, styles];
  }
  
  render() {

    return html`
      <div class="flex flex-col items-center justify-center py-16">
        <div id="list">
            <div draggable=true class="draggable flex items-center justify-center">A</div>
            <div draggable=true class="draggable flex items-center justify-center">B</div>
            <div draggable=true class="draggable flex items-center justify-center">C</div>
            <div draggable=true class="draggable flex items-center justify-center">D</div>
            <div draggable=true class="draggable flex items-center justify-center">E</div>
        </div>
    </div>
    `;
  }


}

declare global {
  interface HTMLElementTagNameMap {
    "md-draggable-item": DraggableItem;
  }
}