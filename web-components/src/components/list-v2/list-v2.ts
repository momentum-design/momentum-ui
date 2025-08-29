import { Key } from "@/constants";
import { customElement, html, LitElement, property, queryAssignedNodes } from "lit-element";
import { ListItemV2 } from "./list-item-v2";
import style from "./scss/module.scss";

export namespace ListV2 {
  export type Gap = "none" | "sm" | "md" | "lg";
  export type Orientation = "vertical" | "horizontal";

  @customElement("md-list-v2")
  export class ELEMENT extends LitElement {
    /**
     * The gap between list items.
     */
    @property({ type: String }) gap: Gap = "none";
    @property({ type: String }) orientation: Orientation = "vertical";

    @queryAssignedNodes() assignedNodes!: NodeList;

    connectedCallback(): void {
      super.connectedCallback();
      this.setAttribute("role", "list");
      this.addEventListener("keydown", this.handleKeyDown);
    }

    render() {
      return html` <slot @click=${this.handleMouseClick}></slot>`;
    }

    private get listItems(): ListItemV2.ELEMENT[] {
      return Array.from(this.assignedNodes).filter(
        (node) => node instanceof ListItemV2.ELEMENT && !node.disabled
      ) as ListItemV2.ELEMENT[];
    }

    private handleMouseClick(event: MouseEvent) {
      const newIndex = this.getCurrentIndex(event.target);
      this.resetTabIndexAndSetActiveTabIndex(newIndex);
    }

    /**
     * Calculates a new index based on the pressed keyboard key.
     * Supports navigation keys for moving focus within a list.
     * @param key - The key that was pressed.
     * @param currentIndex - The current index of the focused list item.
     * @param wrappedDivsCount - The total number of list items.
     * @returns The new index to focus on, or undefined if the key is not supported.
     */
    private getNewIndexBasedOnKey(key: string, currentIndex: number, wrappedDivsCount: number): number | undefined {
      switch (key) {
        case Key.ArrowDown:
          return (currentIndex + 1) % wrappedDivsCount;
        case Key.ArrowUp:
          return (currentIndex - 1 + wrappedDivsCount) % wrappedDivsCount;
        case Key.Home:
          return 0;
        case Key.End:
          return wrappedDivsCount - 1;
        default:
          return undefined;
      }
    }

    /**
     * Handles the keydown event on the list element.
     * If the key is 'ArrowUp' or 'ArrowDown', it focuses to the previous or next list item
     * and sets the active tabindex of the list item.
     * Prevents the default event behavior.
     * @param event - The keyboard event.
     */
    private handleKeyDown(event: KeyboardEvent): void {
      const currentIndex = this.getCurrentIndex(event.target);
      const newIndex = this.getNewIndexBasedOnKey(event.key, currentIndex, this.listItems.length);
      if (newIndex !== undefined) {
        this.listItems[newIndex]?.focus();
        this.resetTabIndexAndSetActiveTabIndex(newIndex);
      }
    }

    /**
     * Returns the index of the given target in the listItems array.
     * If the target is not a list item, but a child element of a list item,
     * it returns the index of the parent list item.
     * @param target - The target element to find the index of.
     * @returns The index of the target element in the listItems array.
     */
    private getCurrentIndex(target: EventTarget | null): number {
      return this.listItems.findIndex((node) => node === target || node === (target as HTMLElement).parentElement);
    }

    /**
     * Resets all list items tabindex to -1 and sets the tabindex of the
     * element at the given index to 0, effectively setting the active
     * element. This is used when navigating the list via keyboard.
     *
     * @param newIndex - The index of the new active element in the list.
     */
    private resetTabIndexAndSetActiveTabIndex(newIndex: number) {
      this.listItems.forEach((listItem, index) => {
        const newTabindex = newIndex === index ? "0" : "-1";
        listItem.setAttribute("tabindex", newTabindex);
      });
    }

    static get styles() {
      return style;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-list-v2": ListV2.ELEMENT;
  }
}
