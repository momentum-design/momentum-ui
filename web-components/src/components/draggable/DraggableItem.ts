import { CSSResultArray, customElement, html, internalProperty, LitElement, property, query } from "lit-element";
import reset from "@/wc_scss/reset.scss";
import styles from "./scss/module.scss";
import { DropEvent } from "@interactjs/actions/drop/DropEvent";

@customElement("md-draggable-item")
export class DraggableItem extends LitElement { 
  @property({ type: Boolean }) isDraggingStarted = false;
  @property({ type: Number }) x = 0;
  @property({ type: Number }) y = 0;

  connectedCallback() {
    super.connectedCallback();
  }

  dragStart(event: DragEvent) {
    event.dataTransfer!.setData("text/html", "test");
    this.setAttribute("dragging", "");
    console.log(event.type)
  }

  dragOver(event: DragEvent) {
    if (this.hasAttribute("dragging")) {
      this.removeAttribute("over");
    } else {
      this.setAttribute("over", "");
    }
    console.log(event.type)
  }

  dragEnd(event: DragEvent) {
    this.removeAttribute("over");
    this.removeAttribute("dragging");
    console.log(event.type)
  }

  dragLeave(event: DragEvent) {
    this.removeAttribute("over");
    console.log(event.type)
  }

  drop(event: DropEvent) {
    console.log(event.type)
  }

  static get styles(): CSSResultArray {
    return [reset, styles];
  }
  
  render() {

    return html`
      <div 
        class="md-draggable-item draggable"
        draggable=true
        @dragstart=${(event: DragEvent) => this.dragStart(event)} 
        @dragover=${(event: DragEvent) => this.dragOver(event)} 
        @dragleave=${(event: DragEvent) => this.dragLeave(event)}
        @dragend=${(event: DragEvent) => this.dragEnd(event)}
        @drop=${(ev: DropEvent) => this.drop(ev)}>
        <slot></slot>
      </div>
    `;
  }


}

declare global {
  interface HTMLElementTagNameMap {
    "md-draggable-item": DraggableItem;
  }
}