/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { html, LitElement, property, PropertyValues, query } from "lit-element";
import Sortable from "sortablejs";
import { DraggableItem } from "./DraggableItem";
import reset from "@/wc_scss/reset.scss";
import styles from "./scss/module.scss";
import { debounce } from "@/utils/helpers";
import { customElementWithCheck, SlottedMixin } from "@/mixins";

export namespace Draggable {
  @customElementWithCheck("md-draggable")
  export class ELEMENT extends SlottedMixin(LitElement) {
    @property({ type: Number }) delay = 0;
    @property({ type: Number }) animation = 0;
    @property({ type: Boolean }) sort = false;
    @property({ type: Boolean }) editable = false;
    @property({ type: String }) handle = "";
    @property({ type: String }) filter = "[disabled]";
    @property({ type: String }) easing = "";
    @property({ type: String }) direction: "horizontal" | "vertical" = "vertical";
    @property({ type: Object }) group: Sortable.GroupOptions = { name: "group" };
    @property({ type: Boolean, attribute: "custom-placeholder" }) customPlaceholder = false;
    @property({ type: String, attribute: "draggable-items" }) draggableItems = "md-draggable-item";
    @property({ type: String, attribute: "ghost-class" }) ghostClass = "";
    @property({ type: String, attribute: "chosen-class" }) chosenClass = "";
    @property({ type: String, attribute: "drag-class" }) dragClass = "dragging";

    @query("slot") draggableSlot!: HTMLSlotElement;

    private sortableInstance: Sortable | null = null;
    private items: DraggableItem.ELEMENT[] = [];

    static get styles() {
      return [reset, styles];
    }

    get slotElement() {
      return this.draggableSlot;
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

    private async linkItems() {
      const { items } = this;

      items.forEach(item => {

        if (this.editable) {
          item.setAttribute("edit", "true");
        }
      })
    }

    private generateOptions() {
      return {
        group: this.group,
        animation: this.animation,
        sort: this.sort,
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

    private initializeSortable() {
      if (!this.sortableInstance) {
        this.sortableInstance = Sortable.create(this, this.generateOptions());
      }
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

    connectedCallback() {
      super.connectedCallback();
      this.initializeSortable();
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
        <div class="md-draggable" part="draggable">
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
