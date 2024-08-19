/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Key } from "@/constants";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { RovingTabIndexMixin } from "@/mixins/RovingTabIndexMixin";
import { SlottedMixin } from "@/mixins/SlottedMixin";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property, PropertyValues, query } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { nanoid } from "nanoid";
import { MenuItem } from "./MenuItem";
import styles from "./scss/module.scss";

type ItemId = Element["id"];
export const MORE_MENU_ITEM_COPY_ID_PREFIX = "more-menu-item-";

export namespace Menu {
  @customElementWithCheck("md-menu")
  export class ELEMENT extends SlottedMixin(RovingTabIndexMixin(LitElement)) {
    @property({ type: Boolean }) justified = false;
    @property({ type: String }) direction = "horizontal";

    @query("slot") menuSlotElement?: HTMLSlotElement;
    @query("md-menu-overlay") menuSubElement?: HTMLSlotElement;

    private items: MenuItem.ELEMENT[] = [];
    private itemsHash: Record<ItemId, MenuItem.ELEMENT> = {};
    private itemsIdxHash: Record<ItemId, number> = {};

    private getNormalizedItemId(id: ItemId) {
      return id.replace(MORE_MENU_ITEM_COPY_ID_PREFIX, "");
    }

    static get styles() {
      return [reset, styles];
    }

    get slotItem() {
      return this.menuSlotElement;
    }

    private async linkMenuItems() {
      const { items } = this;

      items.forEach((item, index) => {
        const id = nanoid();

        item.setAttribute("id", id);
        item.setAttribute("aria-controls", id);
        item.selected = this.selected === index;
      });

      this.itemsHash = this.items.reduce(
        (acc, item) => {
          acc[item.id] = item;
          return acc;
        },
        {} as Record<ItemId, MenuItem.ELEMENT>
      );

      this.itemsIdxHash = this.items.reduce(
        (acc, item, idx) => {
          acc[item.id] = idx;
          return acc;
        },
        {} as Record<ItemId, number>
      );
    }

    private setupMenuItems() {
      if (this.menuSlotElement) {
        const children = this.menuSlotElement.assignedElements({ flatten: true });
        this.getChildrenFromTree({ children }, this.items);
      }
    }

    private getChildrenFromTree(elem: { children: Element[] }, menuItems: MenuItem.ELEMENT[]) {
      for (let i = 0; i < elem.children.length; i++) {
        const child = elem.children[i];
        if (child instanceof MenuItem.ELEMENT) {
          menuItems.push(child);
        }
        this.getChildrenFromTree(child as any, menuItems); // RECURSION
      }
    }

    private updateSelectedItem(newSelectedIndex: number) {
      const oldSelectedIndex = this.slotted.findIndex((element) => element.hasAttribute("selected"));

      if (oldSelectedIndex === newSelectedIndex) {
        return;
      }

      if (this.items) {
        [oldSelectedIndex, newSelectedIndex].forEach((index) => {
          const item = this.items[index];
          item && item.toggleAttribute("selected");
        });
      }

      this.dispatchEvent(
        new CustomEvent("selected-menu-item", {
          detail: {
            value: newSelectedIndex
          },
          composed: true,
          bubbles: true
        })
      );

      this.changeSelectedItemIdx(newSelectedIndex);
    }

    private changeSelectedItemIdx(newSelectedItemIdx: number) {
      this.selected = newSelectedItemIdx;
    }

    handleItemClick(event: CustomEvent<MenuItem.MenuItemEvent>) {
      const { id } = event.detail;

      const menuItem = this.itemsHash[this.getNormalizedItemId(id)];

      if (menuItem && !menuItem.disabled) {
        const newIndex = this.itemsIdxHash[menuItem.id];

        if (newIndex !== -1) {
          this.updateSelectedItem(newIndex);
        }
      }
    }

    handleItemKeydown(event: CustomEvent<MenuItem.MenuItemKeyDownEvent>) {
      const { key, id } = event.detail;
      switch (key) {
        case Key.End:
          this.changeSelectedItemIdx(this.items.length - 1);
          break;
        case Key.Home:
          this.changeSelectedItemIdx(0);
          break;
        case Key.ArrowLeft:
        case Key.ArrowUp:
          if (this.selected === 0) {
            this.changeSelectedItemIdx(this.items.length - 1);
          } else {
            this.changeSelectedItemIdx(this.selected - 1);
          }
          break;
        case Key.ArrowRight:
        case Key.ArrowDown:
          if (this.selected === this.items.length - 1) {
            this.changeSelectedItemIdx(0);
          } else {
            this.changeSelectedItemIdx(this.selected + 1);
          }
          break;
        case Key.Enter:
        case Key.Space:
          // eslint-disable-next-line no-case-declarations
          const tabIndex = this.slotted.findIndex(
            (element) => element.id === id && !(element as MenuItem.ELEMENT).disabled
          );
          if (tabIndex !== -1) {
            this.updateSelectedItem(tabIndex);
          }
          break;
      }
    }

    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("menu-item-click", this.handleItemClick as EventListener);
      this.addEventListener("menu-item-keydown", this.handleItemKeydown as EventListener);
    }

    protected async updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("slotted")) {
        this.setupMenuItems();
        this.linkMenuItems();
      }
    }

    disconnectedCallback() {
      super.connectedCallback();
      this.removeEventListener("menu-item-click", this.handleItemClick as EventListener);
      this.removeEventListener("menu-item-keydown", this.handleItemKeydown as EventListener);
    }

    get menuClassMap() {
      return {
        [`md-menu--${this.direction}`]: this.direction,
        justified: this.justified
      };
    }

    render() {
      return html`
        <nav class="md-menu ${classMap(this.menuClassMap)}">
          <ul class="md-menu-list">
            <slot></slot>
          </ul>
        </nav>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-menu": Menu.ELEMENT;
  }
}
