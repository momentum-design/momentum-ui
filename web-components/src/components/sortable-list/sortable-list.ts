import { customElement, html } from "lit-element";
import "../draggable/Draggable";
import { Draggable } from "../draggable/Draggable";
import "./sortable-list-item";

export namespace SortableList {
  @customElement("md-sortable-list")
  export class ELEMENT extends Draggable.ELEMENT {
    override draggableItems = "md-sortable-list-item";
    override sort = false;
    override handle = "md-sortable-list-item > *[slot='dragger']";

    override render() {
      return html`<slot></slot>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-sortable-list": SortableList.ELEMENT;
  }
}
