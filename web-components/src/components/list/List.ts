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
import { html, LitElement, property, PropertyValues, query } from "lit-element";
import { ListItem } from "./ListItem"; // Keep type import as a relative path
import styles from "./scss/module.scss";

export namespace List {
  @customElementWithCheck("md-list")
  export class ELEMENT extends RovingTabIndexMixin(LitElement) {
    @property({ type: String, reflect: true }) alignment: "horizontal" | "vertical" = "vertical";
    @property({ type: String }) label = "option";
    @property({ type: String, reflect: true }) role: "list" | "listbox" = "listbox";
    @property({ type: Number, reflect: true }) activated = -1;

    @query("slot[name='list-item']") listItemSlot?: HTMLSlotElement;

    protected firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);

      this.setAttribute("aria-label", this.label);
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

    connectedCallback() {
      super.connectedCallback();
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
      return this.slotted.findIndex(listItem => eventPath.includes(listItem));
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
      return this.slotted.findIndex(listItem => (listItem as ListItem.ELEMENT).selected);
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
    }
    private isListItemDisabled(index: number) {
      return (this.slotted[index] as ListItem.ELEMENT).disabled;
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

    handleKeyDown(event: KeyboardEvent) {
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
        <ul class="md-list" part="list">
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
