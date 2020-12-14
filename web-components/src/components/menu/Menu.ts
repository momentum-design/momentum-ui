/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElement, html, LitElement, property, PropertyValues, query } from "lit-element";
import { MenuItem } from "./MenuItem";
import { nanoid } from "nanoid";
import { SlottedMixin } from "@/mixins/SlottedMixin";
import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import reset from "@/wc_scss/reset.scss";
import styles from "./scss/module.scss";


@customElement("md-menu")
export class Menu extends SlottedMixin(LitElement) {
  @property({ type: Boolean }) justified = false;
  @property({ type: String }) direction = "horizontal"
  
  @query('slot') menuSlotElement?: HTMLSlotElement;

  private items: MenuItem[] = [];

  connectedCallback() {
    super.connectedCallback();
    console.log(this.items);
  }

  static get styles() {
    return [reset, styles];
  }

  get slotItem() {
    return this.menuSlotElement;
  }

  protected filterSlotted() {
    return this.menuSlotElement!.assignedElements() as HTMLElement[];
  }

  private async linkMenuItems() {
    const { items } = this;

    items.forEach((item, index) => {
      const id = nanoid();

      item.setAttribute("id", id);
      item.setAttribute("aria-controls", id);
      // item.selected = this.selected === index;

    });
    console.log(this.items);
  }

  private setupMenuItems() {
    if (this.menuSlotElement) {
      this.items = this.menuSlotElement.assignedElements() as MenuItem[];
    }
  }

  protected async updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has("slotted")) {
      this.setupMenuItems();
      this.linkMenuItems();
    }
  }

  render() {
    
    return html`
      <menu class="md-menu">
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
