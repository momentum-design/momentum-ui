import { CSSResultArray, customElement, html, internalProperty, LitElement, property, PropertyValues, query } from "lit-element";
import { SlottedMixin } from "@/mixins/SlottedMixin";
import { DraggableItem } from "./DraggableItem";
import { nanoid } from "nanoid";
import reset from "@/wc_scss/reset.scss";
import styles from "./scss/module.scss";

@customElement("md-draggable-wrap")
export class DraggableWrap extends SlottedMixin(LitElement) { 

  @query('slot') slotElement?: HTMLSlotElement;

  private items: DraggableItem[] = [];
  private dragIndexEl: Number | undefined;
  private currentIndexEl: Number | undefined;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("dropzone", "move");
    this.addEventListener("drag-start", this.handleDragLeave as EventListener);
    this.addEventListener("drag-over", this.handleDragOver as EventListener);
    this.addEventListener("complete", this.setComplete as EventListener);
    this.addEventListener("drop-item", this.handleDropHandler as EventListener);
  }

  get slotItem() {
    return this.slotElement;
  }

  private setupItems() {
    if (this.slotElement) {
      const children = this.slotElement.assignedElements({ flatten: true })
      this.getChildrenFromTree({ children }, this.items);
    }
  }

  private getChildrenFromTree(elem: {children: Element[]}, items: DraggableItem[]) {
    for (var i = 0; i < elem.children.length; i++) {
      var child = elem.children[i];
      if (child instanceof DraggableItem) {
        items.push(child);
      }
      this.getChildrenFromTree(child as any, items); // RECURSION
    }
  }

  private async linkItems() {
    const { items } = this;

    items.forEach((item, index) => {
      const id = nanoid();

      item.setAttribute("id", id);
      item.setAttribute("aria-controls", id);
      item.setAttribute("index", index as unknown as string)
      
    });
  }

  firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
  }

  handleDropHandler(event: CustomEvent) {
    this.setComplete(this.items, this.dragIndexEl, this.currentIndexEl);
  }

  handleDragOver(ev: CustomEvent) {
    const { index } = ev.detail;
    this.currentIndexEl = index;
  }

  handleDragLeave(ev: CustomEvent) {
    const { id } = ev.detail;
    const itemIdx = this.items.findIndex(i => i.hasAttribute("dragging"));
    this.dragIndexEl = itemIdx;
    console.log(this.dragIndexEl);
  }

  setComplete(arr: any, old_index: any, new_index: any) {
    if (new_index === old_index) {
      return arr;
    } else {
      var target = arr[old_index];                         
      var increment = new_index < old_index ? -1 : 1;

      for(var k = old_index; k !== new_index; k += increment){
        arr[k] = arr[k + increment];
      }
      arr[new_index] = target;
      return arr;
    }
  }

  protected async updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has("slotted")) {
      this.setupItems();
      this.linkItems()
    }
  }

  protected update(changedProperties: PropertyValues) {
    super.update(changedProperties);
  }

  static get styles(): CSSResultArray {
    return [reset, styles];
  }

  render() {

    return html`
      <div 
        class="md-draggable-wrap"
        >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-draggable-wrap": DraggableWrap;
  }
}