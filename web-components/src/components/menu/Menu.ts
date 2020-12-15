/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElement, html, LitElement, property, PropertyValues, query } from "lit-element";
import { MenuItem, MenuItemEvent } from "./MenuItem";
import { nanoid } from "nanoid";
import { SlottedMixin } from "@/mixins/SlottedMixin";
import { classMap } from "lit-html/directives/class-map";
import reset from "@/wc_scss/reset.scss";
import styles from "./scss/module.scss";

type ItemId = Element["id"];
export const MORE_MENU_ITEM_COPY_ID_PREFIX = "more-menu-item-";

@customElement("md-menu")
export class Menu extends SlottedMixin(LitElement) {
  @property({ type: Boolean }) justified = false;
  @property({ type: String }) direction = "horizontal"
  
  @query('slot') menuSlotElement?: HTMLSlotElement;
  @query("md-menu-overlay") menuSubElement?: HTMLSlotElement;

  private items: MenuItem[] = [];
  private itemsHash: Record<ItemId, MenuItem> = {};
  private itemsIdxHash: Record<ItemId, number> = {};
  selected: number | undefined;
  private getNormalizedTItemId(id: ItemId) {
    return id.replace(MORE_MENU_ITEM_COPY_ID_PREFIX, "");
  }

  static get styles() {
    return [reset, styles];
  }

  get slotItem() {
    return this.menuSlotElement;
  }

  // protected filterSlotted() {
  //   return this.menuSlotElement!.assignedElements({flatten: true}) as HTMLElement[];
  // }

  private async linkMenuItems() {
    const { items } = this;

    items.forEach((item, index) => {
      const id = nanoid();

      item.setAttribute("id", id);
      item.setAttribute("aria-controls", id);
      item.selected = this.selected === index;
    });

    this.itemsHash = this.items.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {} as Record<ItemId, MenuItem>);

    this.itemsIdxHash = this.items.reduce((acc, item, idx) => {
      acc[item.id] = idx;
      return acc;
    }, {} as Record<ItemId, number>);
  }

  private setupMenuItems() {
    if (this.menuSlotElement) {
      this.items = this.menuSlotElement.assignedElements({ flatten: true }) as MenuItem[];
      
    }
  }

  private updateSelectedItem(newSelectedIndex: number) {

    const oldSelectedIndex = this.slotted.findIndex(element => element.hasAttribute("selected"));

    if (oldSelectedIndex === newSelectedIndex) {
      return;
    }

    if (this.items) {
      [oldSelectedIndex, newSelectedIndex].forEach(index => {
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
    console.log(newSelectedIndex);

    this.changeSelectedItemIdx(newSelectedIndex);
  }

  private changeSelectedItemIdx(newSelectedItemIdx: number) {
    this.selected = newSelectedItemIdx;
  }

  handleItemClick(event: CustomEvent<MenuItemEvent>) {
    const { id } = event.detail;
   
    const menuItem = this.itemsHash[this.getNormalizedTItemId(id)];

    if (menuItem && !menuItem.disabled) {
      const newIndex = this.itemsIdxHash[menuItem.id];

      if (newIndex !== -1) {
        this.updateSelectedItem(newIndex);
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("menu-item-click", this.handleItemClick as EventListener);
  }

  protected async updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has("slotted")) {
      this.setupMenuItems();
      this.linkMenuItems();
    }
  }

  get menuClassMap() {
    return {
      [`md-menu--${this.direction}`]: this.direction,
      justified: this.justified
    };
  }

  render() {
    
    return html`
      <menu class="md-menu ${classMap(this.menuClassMap)}">
        <ul class="md-menu-list">
          <slot></slot>
        </ul>
      </menu>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-menu": Menu;
  }
}
