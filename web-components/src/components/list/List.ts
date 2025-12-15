/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Key } from "@/constants";
import { RovingTabIndexMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, PropertyValues } from "lit";
import { property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { ListItem } from "./ListItem"; // Keep type import as a relative path
import styles from "./scss/module.scss";

export namespace List {
  @customElementWithCheck("md-list")
  export class ELEMENT extends RovingTabIndexMixin(LitElement) {
    @property({ type: String, reflect: true }) alignment: "horizontal" | "vertical" = "vertical";
    @property({ type: String }) label = "option";
    @property({ type: Number, reflect: true }) activated = -1;

    @query("slot[name='list-item']") listItemSlot?: HTMLSlotElement;

    private _role: "list" | "listbox" | "none" = "listbox";

    protected firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);

      if (this._role !== "none") {
        this.setAttribute("aria-label", this.label);
      }
    }

    private notifySelectedChange() {
      this.dispatchEvent(
        new CustomEvent("list-item-change", {
          detail: {
            selected: this.selected
          },
          bubbles: true,
          composed: true
        })
      );
    }

    /**
     * @override
     * Overridden isFocusable method.
     * @param {Element} slottedItem - The slotted item to check.
     * @returns {boolean} - Returns true if the slotted item does not have the "hidden" attribute, false otherwise.
     */
    private isFocusable(slottedItem: Element) {
      return !slottedItem.hasAttribute("hidden");
    }

    connectedCallback() {
      super.connectedCallback();
      const roleAttr = this.getAttribute("role") as "list" | "listbox" | "none" | null; // Capture the role attribute value or use default "listbox"
      this._role = roleAttr || "listbox";
      this.removeAttribute("role"); // Ensure the role attribute is not set on the host element
      this.addEventListener("keydown", this.handleKeyDown);
      this.addEventListener("click", this.handleClick);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("keydown", this.handleKeyDown);
      this.removeEventListener("click", this.handleClick);
    }

    private findListItemIndex(event: MouseEvent | KeyboardEvent) {
      const eventPath = event.composedPath();
      return this.slotted.findIndex((listItem) => eventPath.includes(listItem));
    }

    private switchListItemOnArrowPress(startIndex: number, increment = 1) {
      const newIndex = super.getAvailableSelectedIndex!(startIndex, increment);
      if (newIndex !== -1) {
        this.selected = newIndex;
      }
    }

    private setActivated(index: number) {
      if (index !== -1) {
        this.activated = index;
        this.selected = index;
        this.setSelected(index);
      }
    }

    private findSelectedListItemIndex() {
      return this.slotted.findIndex((listItem) => (listItem as ListItem.ELEMENT).selected);
    }

    private setSelected(newIndex: number) {
      const oldIndex = this.findSelectedListItemIndex();
      if (oldIndex !== -1 && oldIndex !== newIndex) {
        (this.slotted[oldIndex] as ListItem.ELEMENT).selected = false;
      }
      if (this.slotted[newIndex]) {
        (this.slotted[newIndex] as ListItem.ELEMENT).selected = true;
      }
    }

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("slotted")) {
        this.setActivated(this.activated);
      }
      if (changedProperties.has("activated")) {
        this.setActivated(this.activated);
      }
      if (changedProperties.has("label") && this._role !== "none") {
        this.setAttribute("aria-label", this.label);
      }
    }
    private isListItemDisabled(index: number) {
      const item = this.slotted[index] as ListItem.ELEMENT;
      return item?.disabled ?? true;
    }

    handleClick(event: MouseEvent) {
      const newIndex = this.findListItemIndex(event);
      if (newIndex !== -1) {
        if (!this.isListItemDisabled(newIndex)) {
          this.setActivated(newIndex);
          this.notifySelectedChange();
        }
      }
    }

    /**
     * Determines if an element should handle its own keyboard navigation
     * based on its role, attributes, and the key pressed.
     */
    private shouldElementHandleKey(element: HTMLElement, keyCode: string): boolean {
      // 1. Check for explicit opt-in/opt-out attributes
      if (element.hasAttribute("data-handles-keys") || element.closest("[data-handles-keys]")) {
        return true;
      }

      // 2. Check element type
      const tagName = element.tagName.toLowerCase();
      const nodeName = element.nodeName.toLowerCase();
      const isFormElement = nodeName === "input" || nodeName === "textarea" || nodeName === "select";

      // 3. Check based on ARIA roles and properties
      const role = element.getAttribute("role");
      const isEditableContent =
        element.hasAttribute("contenteditable") || element.getAttribute("aria-readonly") === "false";

      // 4. Element-specific keyboard handling needs
      const arrowKeys = [Key.ArrowUp, Key.ArrowDown, Key.ArrowLeft, Key.ArrowRight];
      const actionKeys = [Key.Enter, Key.Space];

      // Check if the element needs arrow keys
      if (arrowKeys.includes(keyCode as Key)) {
        // Elements that need arrow keys for their own navigation
        return (
          isFormElement ||
          isEditableContent ||
          role === "textbox" ||
          role === "combobox" ||
          role === "listbox" ||
          role === "menu" ||
          role === "slider" ||
          role === "scrollbar" ||
          role === "tablist" ||
          (tagName.startsWith("md-") &&
            (tagName === "md-input" || tagName === "md-select" || tagName === "md-combobox"))
        );
      }

      // Check if the element needs action keys
      if (actionKeys.includes(keyCode as Key)) {
        return (
          role === "button" ||
          role === "link" ||
          role === "checkbox" ||
          role === "radio" ||
          tagName === "button" ||
          tagName === "a" ||
          tagName === "md-button" ||
          tagName === "md-checkbox" ||
          tagName === "md-radio" ||
          isFormElement
        );
      }

      // Check for Home/End keys
      if (keyCode === Key.Home || keyCode === Key.End) {
        return isFormElement || isEditableContent || role === "textbox" || tagName === "md-input";
      }

      return false;
    }

    handleKeyDown(event: KeyboardEvent) {
      const path = event.composedPath();
      const originalTarget = path[0] as HTMLElement;

      if (this.shouldElementHandleKey(originalTarget, event.code)) {
        // Let the element handle its own keyboard navigation
        return;
      }

      const { code } = event;
      switch (code) {
        case Key.End:
          this.switchListItemOnArrowPress(this.slotted.length - 1);
          break;
        case Key.Home:
          this.switchListItemOnArrowPress(0);
          break;
        case Key.ArrowUp:
        case Key.ArrowLeft:
          event.preventDefault();
          {
            if (this.selected === 0) {
              this.switchListItemOnArrowPress(this.slotted.length - 1, -1);
            } else {
              this.switchListItemOnArrowPress(this.selected - 1, -1);
            }
          }
          break;
        case Key.ArrowDown:
        case Key.ArrowRight:
          event.preventDefault();
          {
            if (this.selected === this.slotted.length - 1) {
              this.switchListItemOnArrowPress(0);
            } else {
              this.switchListItemOnArrowPress(this.selected + 1);
            }
          }
          break;
        case Key.Enter:
        case Key.Space:
          {
            if (!this.isListItemDisabled(this.selected)) {
              this.setActivated(this.selected);
              this.notifySelectedChange();
            }
          }
          break;
        default:
          break;
      }
    }

    get slotElement() {
      return this.listItemSlot;
    }

    static get styles() {
      return [reset, styles];
    }

    render() {
      return html`
        <ul role=${ifDefined(this._role !== "list" ? this._role : undefined)} class="md-list" part="list">
          <slot name="list-item"></slot>
        </ul>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-list": List.ELEMENT;
  }
}
