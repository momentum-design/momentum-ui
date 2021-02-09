/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElement, html, LitElement, property, PropertyValues, query } from "lit-element";
import Sortable from "sortablejs";
import { DraggableItem } from "./DraggableItem";
import reset from "@/wc_scss/reset.scss";
import { debounce } from "@/utils/helpers";
import { SlottedMixin } from "@/mixins";

export namespace Draggable {
  @customElement("md-draggable")
  export class ELEMENT extends SlottedMixin(LitElement) {
    @property({ type: Number }) delay = 0;
    @property({ type: Number }) animation = 0;
    @property({ type: Boolean }) sort = false;
    @property({ type: String }) handle = "";
    @property({ type: String }) filter = "";
    @property({ type: String }) easing = "";
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: String }) direction: "horizontal" | "vertical" = "vertical";
    @property({ type: Object }) group: Sortable.GroupOptions = { name: "group" };
    @property({ type: Boolean, attribute: "custom-placeholder" }) customPlaceholder = false;
    @property({ type: String, attribute: "draggable-items" }) draggableItems = "";
    @property({ type: String, attribute: "ghost-class" }) ghostClass = "";
    @property({ type: String, attribute: "chosen-class" }) chosenClass = "";
    @property({ type: String, attribute: "drag-class" }) dragClass = "";

    @query(".md-draggable-container") draggableContainer!: HTMLDivElement;
    @query('slot') slotElement?: HTMLSlotElement;

    private items: DraggableItem.ELEMENT[] = [];
    private sortableInstance: Sortable | null = null;

    static get styles() {
      return [reset];
    }

    get container() {
      return this.customPlaceholder ? this.draggableContainer : this.slotted[0];
    }

    get slotItem() {
      return this.slotElement;
    }

    private setupItems() {
      if (this.slotElement) {
        const children = this.slotElement.assignedElements({ flatten: true })
        this.getChildrenFromTree({ children }, this.items);
        console.log(this.items)
      }
    }

    private getChildrenFromTree(elem: {children: Element[]}, items: DraggableItem.ELEMENT[]) {
      for (var i = 0; i < elem.children.length; i++) {
        var child = elem.children[i];
        if (child instanceof DraggableItem.ELEMENT) {
          items.push(child);
        }
        this.getChildrenFromTree(child as any, items); // RECURSION
      }
    }

    private generateOptions() {
      return {
        group: this.group,
        disabled: this.disabled,
        animation: this.animation,
        delay: this.delay,
        handle: this.handle,
        easing: this.easing,
        filter: this.filter,
        draggable: this.draggableItems,
        direction: this.direction,
        ghostClass: this.ghostClass,
        chosenClass: this.chosenClass,
        dragClass: this.dragClass,
        onStart: this.handleOnStart,
        onMove: this.handleOnMove,
        onEnd: this.handleOnEnd,
        onChoose: this.handleOnChoose,
        onAdd: this.handleOnAdd,
        onRemove: this.handleOnRemove,
        onUnchoose: this.handleOnUnchoose,
        onClone: this.handleOnClone,
        onChange: this.handleOnChange
      };
    }

    connectedCallback() {
      super.connectedCallback();
      this.draggableItems ="md-draggable-item"
    }

    private async linkItems() {
      const { items } = this;

      items.forEach(item => {

        if (item.classList.contains("md-draggable-row")) {
          this.handle = "md-icon";
        } else {
          this.group={ name: "md-list", pull: "clone" }
        }
        
      });
    }

    private initializeSortable() {
      if (this.sortableInstance) {
        this.cleanupSortable();
      }
      const wrap = this;
      this.sortableInstance = Sortable.create(wrap, this.generateOptions());
    }

    private dispatchDragEvent(eventName: string, srcEvent: Sortable.SortableEvent | Sortable.MoveEvent) {
      this.dispatchEvent(
        new CustomEvent<{ srcEvent: Sortable.SortableEvent | Sortable.MoveEvent }>(eventName, {
          composed: true,
          bubbles: true,
          detail: {
            srcEvent
          }
        })
      );
    }

    private handleOnChange = (event: Sortable.SortableEvent) => {
      event.stopPropagation();
      this.dispatchDragEvent("drag-change", event);
    };

    private handleOnClone = (event: Sortable.SortableEvent) => {
      event.stopPropagation();
      this.dispatchDragEvent("drag-clone", event);
    };

    private handleOnUnchoose = (event: Sortable.SortableEvent) => {
      event.stopPropagation();
      this.dispatchDragEvent("drag-unchoose", event);
    };

    private handleOnRemove = (event: Sortable.SortableEvent) => {
      event.stopPropagation();
      this.dispatchDragEvent("drag-remove", event);
    };

    private handleOnAdd = (event: Sortable.SortableEvent) => {
      event.stopPropagation();
      this.dispatchDragEvent("drag-add", event);
    };

    private handleOnChoose = (event: Sortable.SortableEvent) => {
      event.stopPropagation();
      this.dispatchDragEvent("drag-choose", event);
    };

    private handleOnEnd = (event: Sortable.SortableEvent) => {
      event.stopPropagation();
      this.dispatchDragEvent("drag-end", event);
    };

    private handleOnMove = debounce((event: Sortable.MoveEvent) => {
      event.stopPropagation();
      this.dispatchDragEvent("drag-move", event);
    }, 100);

    private handleOnStart = (event: Sortable.SortableEvent) => {
      event.stopPropagation();
      this.dispatchDragEvent("drag-start", event);
    };

    private cleanupSortable() {
      if (this.sortableInstance) {
        this.sortableInstance.destroy();
        this.sortableInstance = null;
      }
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.cleanupSortable();
    }

    protected slottedChanged() {
      this.initializeSortable();
    }

    protected async updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has("slotted")) {
      this.setupItems();
      this.linkItems()
    }
  }

    render() {
      return html`
      <div class="md-draggable-container" part="draggable-container">
        <slot></slot>
      </div>
    `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-draggable": Draggable.ELEMENT;
  }
}
