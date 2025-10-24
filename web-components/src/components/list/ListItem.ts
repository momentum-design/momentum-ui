/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { FocusMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import styles from "./scss/module.scss";

export namespace ListItem {
  @customElementWithCheck("md-list-item")
  export class ELEMENT extends FocusMixin(LitElement) {
    @property({ type: String, reflect: true }) role: "listitem" | "option" | "menuitem" = "option";
    @property({ type: Number, reflect: true }) tabIndex = -1;
    @property({ type: String, reflect: true }) shape: "pill" | "rounded" = "rounded";

    private _disabled = false;
    @property({ type: Boolean, reflect: true })
    get disabled() {
      return this._disabled;
    }
    set disabled(value: boolean) {
      const oldValue = this._disabled;
      this._disabled = value;
      this.setAttribute("aria-disabled", `${value}`);
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
      this.requestUpdate("selected", oldValue);
    }

    get listItemTemplateClassMap() {
      return {
        [`md-list-item--${this.shape}`]: !!this.shape
      };
    }

    static get styles() {
      return [reset, styles];
    }

    render() {
      return html`
        <div class="md-list-item ${classMap(this.listItemTemplateClassMap)}" part="list-item">
          <slot></slot>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-list-item": ListItem.ELEMENT;
  }
}
