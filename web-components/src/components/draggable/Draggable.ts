import { customElement, html, LitElement, property } from "lit-element";
import Sortable from "sortablejs";
import reset from "@/wc_scss/reset.scss";
import { debounce } from "@/utils/helpers";
import styles from "./scss/module.scss";
import { SlottedMixin } from "@/mixins";

@customElement("md-draggable")
export class Draggable extends SlottedMixin(LitElement) {
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Number }) delay = 0;
  @property({ type: Number }) animation = 0;
  @property({ type: Boolean }) sort = false;
  @property({ type: String }) handle = "";
  @property({ type: String }) filter = "";
  @property({ type: String }) easing = "";
  @property({ type: Object }) group: Sortable.GroupOptions = { name: "group" };
  @property({ type: String, attribute: "draggable-items" }) draggableItems = "";
  @property({ type: String, attribute: "ghost-class" }) ghostClass = "";
  @property({ type: String, attribute: "chosen-class" }) chosenClass = "";
  @property({ type: String }) direction: "horizontal" | "vertical" = "vertical";

  private sortableInstance: Sortable | null = null;

  static get styles() {
    return [reset, styles];
  }

  get draggableContainer() {
    return this.slotted[0];
  }

  private initializeSortable() {
    const {
      slotted,
      disabled,
      animation,
      delay,
      handle,
      easing,
      filter,
      draggableItems,
      direction,
      ghostClass,
      chosenClass,
      group,
      draggableContainer,
      handleOnStart,
      handleOnMove,
      handleOnEnd,
      handleOnChoose,
      handleOnAdd,
      handleOnRemove,
      handleOnUnchoose,
      handleOnClone,
      handleOnChange
    } = this;

    if (slotted.length) {
      this.sortableInstance = Sortable.create(draggableContainer, {
        group,
        disabled,
        animation,
        delay,
        handle,
        easing,
        filter,
        draggable: draggableItems,
        direction,
        ghostClass,
        chosenClass,
        onStart: handleOnStart,
        onMove: handleOnMove,
        onEnd: handleOnEnd,
        onChoose: handleOnChoose,
        onAdd: handleOnAdd,
        onRemove: handleOnRemove,
        onUnchoose: handleOnUnchoose,
        onClone: handleOnClone,
        onChange: handleOnChange
      });
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
    this.dispatchDragEvent("drag-change", event);
  };

  private handleOnClone = (event: Sortable.SortableEvent) => {
    this.dispatchDragEvent("drag-clone", event);
  };

  private handleOnUnchoose = (event: Sortable.SortableEvent) => {
    this.dispatchDragEvent("drag-unchoose", event);
  };

  private handleOnRemove = (event: Sortable.SortableEvent) => {
    this.dispatchDragEvent("drag-remove", event);
  };

  private handleOnAdd = (event: Sortable.SortableEvent) => {
    this.dispatchDragEvent("drag-add", event);
  };

  private handleOnChoose = (event: Sortable.SortableEvent) => {
    this.dispatchDragEvent("drag-choose", event);
  };

  private handleOnEnd = (event: Sortable.SortableEvent) => {
    this.dispatchDragEvent("drag-end", event);
  };

  private handleOnMove = debounce((event: Sortable.MoveEvent, srcEvent: Event) => {
    this.dispatchDragEvent("drag-move", event);
  }, 100);

  private handleOnStart = (event: Sortable.SortableEvent) => {
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

  render() {
    return html`
      <div class="md-draggable-wrapper" part="draggable-wrapper">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-draggable": Draggable;
  }
}
