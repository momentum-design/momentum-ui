/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import styles from "./scss/module.scss";

export namespace MenuItem {
  export type MenuItemEvent = { id: string };
  export type MenuItemKeyDownEvent = {
    id: string;
    key: string;
    srcEvent: KeyboardEvent;
  };

  @customElementWithCheck("md-menu-item")
  export class ELEMENT extends LitElement {
    @property({ type: String }) href = "";
    @property({ type: String }) label = "";
    @property({ type: Number, reflect: true }) tabIndex = -1;

    private _disabled = false;
    @property({ type: Boolean, reflect: true })
    get disabled() {
      return this._disabled;
    }
    set disabled(value: boolean) {
      const oldValue = this._disabled;
      this._disabled = value;
      this.setAttribute("aria-disabled", `${value}`);
      if (value) {
        this.tabIndex = -1;
      } else {
        this.tabIndex = 0;
      }
      this.requestUpdate("disabled", oldValue);
    }

    private _selected = false;
    @property({ type: Boolean, reflect: true })
    get selected() {
      return this._selected;
    }

    set selected(value: boolean) {
      const oldValue = this._selected;
      this._selected = value;

      if (value) {
        this.notifySelectedItem();
      }

      this.setAttribute("aria-selected", `${value}`);
      this.requestUpdate("selected", oldValue);
    }

    static get styles() {
      return [reset, styles];
    }

    private setupEvents() {
      this.addEventListener("mousedown", this.handleClick);
      this.addEventListener("keydown", this.handleKeyDown);
    }

    protected firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);

      if (this.label) {
        this.setAttribute("aria-label", this.label);
      }
      this.setupEvents();
    }

    protected update(changedProperties: PropertyValues) {
      super.update(changedProperties);
      if (changedProperties.has("disabled")) {
        this.selected = false;
        this.setAttribute("aria-disabled", `${this.disabled}`);
      }
    }

    handleClick(event: MouseEvent) {
      event.preventDefault();
      this.dispatchEvent(
        new CustomEvent<MenuItemEvent>("menu-item-click", {
          detail: {
            id: this.id
          },
          bubbles: true,
          composed: true
        })
      );
    }

    handleKeyDown(event: KeyboardEvent) {
      this.dispatchEvent(
        new CustomEvent<MenuItemKeyDownEvent>("menu-item-keydown", {
          detail: {
            id: this.id,
            key: event.code,
            srcEvent: event
          },
          bubbles: true,
          composed: true
        })
      );
    }

    private notifySelectedItem() {
      this.dispatchEvent(
        new CustomEvent("focus-visible", {
          composed: true,
          bubbles: true
        })
      );
    }

    get menuItemClassMap() {
      return {
        [`md-menu-item--selected`]: this.selected,
        disabled: this.disabled
      };
    }

    render() {
      return html`
        <li
          role="menuitem"
          part="menu-item"
          class="md-menu-item ${classMap(this.menuItemClassMap)}"
          ?disabled=${this.disabled}
          tabindex="-1"
          aria-hidden="true"
          aria-selected="false"
          aria-label=${ifDefined(this.label)}
        >
          <a href="${ifDefined(this.href || undefined)}">
            <slot></slot>
          </a>
        </li>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-menu-item": MenuItem.ELEMENT;
  }
}
