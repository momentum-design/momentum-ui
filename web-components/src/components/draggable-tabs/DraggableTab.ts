/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { html, LitElement, property, PropertyValues } from "lit-element";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { FocusMixin } from "@/mixins";
import reset from "@/wc_scss/reset.scss";
import styles from "./scss/module.scss";
import { ifDefined } from "lit-html/directives/if-defined";

export type TabClickEvent = { id: string };
export type TabKeyDownEvent = {
  id: string;
  key: string;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  srcEvent: KeyboardEvent;
};

export namespace DraggableTab {
  @customElementWithCheck("md-draggable-tab")
  export class ELEMENT extends FocusMixin(LitElement) {
    // @property({ type: Boolean, reflect: true }) disabled = false;
    // @property({ type: Boolean, reflect: true }) extended = false;
    // @property({ type: Boolean, reflect: true }) editable = false;

    static get styles() {
      return [reset, styles];
    }

    // get draggableItemClassMap() {
    //   return {
    //     extended: this.extended,
    //     default: !this.extended,
    //     disabled: this.disabled
    //   };
    // }

    @property({ type: Number, reflect: true }) tabIndex = -1;
    @property({ type: String, attribute: "aria-label" }) ariaLabel = "tab";

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
        this.notifySelectedTab();
      }

      this.setAttribute("aria-selected", `${value}`);
      this.requestUpdate("selected", oldValue);
    }
    @property({ type: Boolean, reflect: true }) vertical = false;

    @property({ type: Boolean, reflect: true }) viewportHidden = false;

    handleClick(event: MouseEvent) {
      event.preventDefault();
      console.log("Clicked");
      if (this.id) {
        this.dispatchEvent(
          new CustomEvent<TabClickEvent>("tab-click", {
            detail: {
              id: this.id
            },
            bubbles: true,
            composed: true
          })
        );
      }
    }

    handleKeyDown(event: KeyboardEvent) {
      if (this.id) {
        this.dispatchEvent(
          new CustomEvent<TabKeyDownEvent>("tab-keydown", {
            detail: {
              id: this.id,
              key: event.code,
              ctrlKey: event.ctrlKey,
              shiftKey: event.shiftKey,
              altKey: event.altKey,
              srcEvent: event
            },
            bubbles: true,
            composed: true
          })
        );
      }
    }

    private notifySelectedTab() {
      this.dispatchEvent(
        new CustomEvent("focus-visible", {
          composed: true,
          bubbles: true
        })
      );
    }

    protected update(changedProperties: PropertyValues) {
      super.update(changedProperties);
      if (changedProperties.has("disabled")) {
        this.selected = false;
        this.setAttribute("aria-disabled", `${this.disabled}`);
      }
    }

    // private setupEvents() {
    //   this.addEventListener("mousedown", this.handleClick);
    //   this.addEventListener("keydown", this.handleKeyDown);
    // }

    connectedCallback() {
      super.connectedCallback();
      this.setAttribute("aria-selected", "false");
    }

    protected firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);

      this.setAttribute("role", "tab");
    }

    render() {
      return html`
        <button
          class="md-draggable-tab"
          type="button"
          role="button"
          ?disabled=${this.disabled}
          aria-hidden="true"
          aria-selected="false"
          aria-label=${ifDefined(this.ariaLabel)}
          tabindex="-1"
          part="draggable-item"
          @click=${(e: MouseEvent) => this.handleClick(e)}
          @keydown=${(e: KeyboardEvent) => this.handleKeyDown(e)}
        >
          <slot></slot>
        </button>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-draggable-tab": DraggableTab.ELEMENT;
  }
}
