import { CSSResultArray, customElement, html, LitElement, property, query } from "lit-element";
import reset from "@/wc_scss/reset.scss";
import styles from "./scss/module.scss";

@customElement("md-draggable-item")
export class DraggableItem extends LitElement { 
  @property({ type: Boolean }) isDraggingStarted = false;

  private _index = 0;
  @property({ type: Number, reflect: true })
  get index() {
    return this._index;
  }
  set index(newValue: number) {
    const oldValue = this._index;
    this._index = newValue;
    this.requestUpdate("index", oldValue);
  }

  connectedCallback() {
    super.connectedCallback();
  }

  dragStart(event: DragEvent) {
    const data = event.target;
    event.dataTransfer!.setData("text/plain", data as any);
    this.setAttribute("dragging", "");
    this.dispatchEvent(new CustomEvent("drag-start", {
      bubbles: true,
      composed: true,
      detail: {
        index: this.id
      }
    }))
  }

  dragOver(event: DragEvent) {
    event.preventDefault();
    if (this.hasAttribute("dragging")) {
      this.removeAttribute("over");
    } else {
      this.setAttribute("over", "");
      const overIndex = this.index
      this.dispatchEvent(new CustomEvent("drag-over", {
        bubbles: true,
        composed: true,
        detail: {
          index: overIndex
        }
      }))
    }
  }

  dragEnd(event: DragEvent) {
    this.removeAttribute("over");
    this.removeAttribute("dragging");
    event.preventDefault()
    this.dispatchEvent(new CustomEvent("complete", {
      bubbles: true,
      composed: true,
    }));
  }

  dragLeave(event: DragEvent) {
    this.removeAttribute("over");
    // console.log(event.type)
  }

  drop(event: DragEvent) {
    this.dispatchEvent(new CustomEvent("drop-item", {
      bubbles: true,
      composed: true,
    }));
    //console.log(event.type)
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
        @drop=${(ev: DragEvent) => this.drop(ev)}>
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