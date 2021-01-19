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

  dragStart(event: DragEvent) {
    event.dataTransfer!.setData("text/html", "test");
    this.setAttribute("dragging", "");
    console.log(event)
  }

  dragOver() {
    if (this.hasAttribute("dragging")) {
      this.removeAttribute("over");
    } else {
      this.setAttribute("over", "");
    }
  }

  static get styles(): CSSResultArray {
    return [reset, styles];
  }
  
  render() {

    return html`
      <div class="flex flex-col items-center justify-center py-16">
        <div id="list">
            <div
              id="1"
              draggable=true
              @dragstart=${(event: DragEvent) => this.dragStart(event)} 
              @dragover=${() => this.dragOver()} 
              class="draggable flex items-center justify-center">A</div>
            <div
              id="2"
              draggable=true
              @dragstart=${(event: DragEvent) => this.dragStart(event)} 
              class="draggable flex items-center justify-center">B</div>
            <div
              id="3" draggable=true @dragstart=${(event: DragEvent) => this.dragStart(event)} class="draggable flex items-center justify-center">C</div>
            <div id="1" draggable=true @dragstart=${(event: DragEvent) => this.dragStart(event)} class="draggable flex items-center justify-center">D</div>
            <div id="1" draggable=true @dragstart=${(event: DragEvent) => this.dragStart(event)} class="draggable flex items-center justify-center">E</div>
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