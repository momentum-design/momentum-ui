/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Key } from "@/constants";
import { FocusMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property, PropertyValues } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import { Tabs } from "./Tabs";
import styles from "./scss/module.scss";

export const TAB_CROSS_WIDTH = 22;
export type TabClickEvent = { id: string };
export type TabCloseClickEvent = { id: string; name: string };
export type TabKeyDownEvent = {
  id: string;
  key: string;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  srcEvent: KeyboardEvent;
};

export namespace Tab {
  @customElementWithCheck("md-tab")
  export class ELEMENT extends FocusMixin(LitElement) {
    @property({ type: Number, reflect: true }) tabIndex = -1;
    @property({ type: String, attribute: "aria-label" }) ariaLabel = "";
    @property({ type: String, attribute: "closable" }) closable: "auto" | "custom" | "" = "";
    @property({ type: String, attribute: "name" }) name = "";
    @property({ type: Boolean, attribute: "cross-visible" }) isCrossVisible = false;
    @property({ type: String }) ariaRole = "tab";
    @property({ type: String }) type: Tabs.TabsType = "Line";
    @property({ type: Boolean }) newMomentum = false;

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

    private _selected = this.tabIndex === 0;
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

    static get styles() {
      return [reset, styles];
    }

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

    handleCrossKeydown(event: KeyboardEvent) {
      event.stopPropagation();
      if (event.code === Key.Enter) {
        this.handleCrossEventDispatch();
      }
    }

    handleCrossClick(event: MouseEvent | KeyboardEvent) {
      event.preventDefault();
      if (this.disabled === true) return;
      this.handleCrossEventDispatch();
    }

    private handleCrossEventDispatch() {
      if (this.id) {
        if (this.closable === "auto") {
          this.dispatchEvent(
            new CustomEvent<TabClickEvent>("tab-cross-click", {
              detail: {
                id: this.id
              },
              bubbles: true,
              composed: true
            })
          );
        } else if (this.closable === "custom") {
          this.dispatchEvent(
            new CustomEvent<TabCloseClickEvent>("tab-close-click", {
              detail: {
                id: this.id,
                name: this.name
              },
              bubbles: true,
              composed: true
            })
          );
        }
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
    }

    protected firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);
      if (this.ariaRole) {
        this.setAttribute("role", this.ariaRole);
      }
    }

    render() {
      return html`
        <button
          type="button"
          role="button"
          ?disabled=${this.disabled}
          aria-selected="false"
          aria-label=${ifDefined(this.ariaLabel || undefined)}
          aria-hidden="true"
          tabindex="-1"
          part="tab"
          class="${classMap({
            closable: this.closable !== "",
            isPill: this.type === "Pill",
            newMomentum: this.newMomentum
          })}"
          @click=${(e: MouseEvent) => this.handleClick(e)}
        >
          <slot class="tab-slot"></slot>
          ${this.isCrossVisible && this.closable
            ? html`
                <div
                  ?disabled=${this.disabled}
                  tabindex="-1"
                  class="tab-action-button"
                  @click=${(e: MouseEvent) => this.handleCrossClick(e)}
                  @keydown=${(e: KeyboardEvent) => this.handleCrossKeydown(e)}
                >
                  <md-icon tabindex="0" name="cancel_14"></md-icon>
                </div>
              `
            : ""}
        </button>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-tab": Tab.ELEMENT;
  }
}
