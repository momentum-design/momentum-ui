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
    static get styles() {
      return [reset, styles];
    }

    @property({ type: Number, reflect: true }) tabIndex = -1;
    @property({ type: String, attribute: "aria-label" }) ariaLabel = "tab";
    @property({ type: Boolean, attribute: "cross-visible" }) isCrossVisible = false;

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

    private _closable = false;
    @property({ type: Boolean, reflect: true })
    get closable() {
      return this._closable;
    }
    set closable(value: boolean) {
      const oldValue = this._closable;
      this._closable = value;
      this.requestUpdate("closable", oldValue);
    }

    @property({ type: Boolean, reflect: true }) vertical = false;

    @property({ type: Boolean, reflect: true }) viewportHidden = false;

    handleClick(event: MouseEvent) {
      event.preventDefault();
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
      console.log("Keydown", this.id)
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

    handleActionClick(event: MouseEvent) {
      event.preventDefault();
      if (this.disabled === true) return;
      console.log("Action Button Clicked", this.closable);
      if (this.closable) {
        this.handleCrossClick();
      } else if (this.id) {
        this.dispatchEvent(
          new CustomEvent<TabClickEvent>("tab-action-button-click", {
            detail: {
              id: this.id
            },
            bubbles: true,
            composed: true
          })
        );
      }
    }

    handleCrossClick() {
      // event.preventDefault();
      console.log("Cross Clicked");
      if (this.id) {
        this.dispatchEvent(
          new CustomEvent<TabClickEvent>("tab-cross-click", {
            detail: {
              id: this.id
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

    connectedCallback() {
      super.connectedCallback();
      this.setAttribute("aria-selected", "false");
    }

    protected firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);
      this.setupEvents();
      this.setAttribute("role", "tab");
    }

    private setupEvents() {
      this.addEventListener("keydown", this.handleKeyDown);
    }

    render() {
      return html`
        <div style="display: flex;">
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
          ${this.isCrossVisible
            ? html`
                <div
                  ?disabled=${this.disabled}
                  slot="tabAction"
                  style="display: flex;"
                  @click=${(e: MouseEvent) => this.handleActionClick(e)}
                >
                  <slot name="tabAction"></slot>
                </div>
              `
            : ""}
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-draggable-tab": DraggableTab.ELEMENT;
  }
}
