/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { html, LitElement, property, PropertyValues, query } from "lit-element";
import Sortable, { SortableOptions } from "sortablejs";
import reset from "@/wc_scss/reset.scss";
import styles from "./scss/module.scss";
import { debounce } from "@/utils/helpers";
import { customElementWithCheck, SlottedMixin } from "@/mixins";

export namespace Draggable {
  @customElementWithCheck("md-draggable")
  export class ELEMENT extends SlottedMixin(LitElement) {
    @property({ type: Number }) delay = 0;
    @property({ type: Number }) animation = 0;
    @property({ type: String }) handle = "";
    @property({ type: String }) filter = "";
    @property({ type: String }) easing = "";
    @property({ type: String }) direction: "horizontal" | "vertical" = "vertical";
    @property({ type: Object }) group: Sortable.GroupOptions | null = null;
    @property({ type: String, attribute: "draggable-items" }) draggableItems = "md-draggable-item";
    @property({ type: String, attribute: "ghost-class" }) ghostClass = "";
    @property({ type: String, attribute: "chosen-class" }) chosenClass = "";
    @property({ type: String, attribute: "drag-class" }) dragClass = "";
    @property({ type: Boolean, reflect: true }) sort = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) editable = false;

    @query("slot[name='draggable-item']") draggableSlot!: HTMLSlotElement;

    private sortableInstance: Sortable | null = null;

    static get styles() {
      return [reset, styles];
    }

    get slotElement() {
      return this.draggableSlot;
    }

    private generateOptions() {
      return {
        ...(this.group && { group: this.group }),
        disabled: this.disabled,
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

    private setSortableOption(name: Partial<keyof SortableOptions>, value: SortableOptions[keyof SortableOptions]) {
      if (this.sortableInstance && this.sortableInstance.option(name) !== undefined) {
        this.sortableInstance.option(name, value);
      }
    }

    private updateSortableInstance(changedProperties: PropertyValues) {
      for (const propertyKey of changedProperties.keys()) {
        const value = (this as Draggable.ELEMENT)[propertyKey as keyof Draggable.ELEMENT];
        this.setSortableOption(propertyKey as keyof SortableOptions, value as SortableOptions[keyof SortableOptions]);
      }
    }

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      this.updateSortableInstance(changedProperties);
    }

    protected slottedChanged() {
      this.initializeSortable();
    }

    render() {
      return html`
        <div class="md-draggable" part="draggable" aria-disabled=${this.disabled}>
          <slot name="draggable-item"></slot>
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
