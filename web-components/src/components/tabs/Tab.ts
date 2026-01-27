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
import { isActionKey } from "@/utils/keyboard";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import type { TabSize, TabsType, TabVariant } from "./Tabs.types";
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
    @property({ type: String, attribute: "role", reflect: true }) role = "tab";
    @property({ type: String, reflect: true }) type: TabsType = "line";
    @property({ type: Boolean }) newMomentum = false;
    @property({ type: Boolean }) onlyIcon = false;
    @property({ type: String }) variant: TabVariant = "ghost";
    @property({ type: Boolean, attribute: "visible-tab", reflect: true }) visibleTab = false;
    @property({ type: Number }) size?: TabSize = 28;

    private _disabled = false;

    @property({ type: Boolean, reflect: true })
    get disabled() {
      return this._disabled;
    }
    set disabled(value: boolean) {
      const oldValue = this._disabled;
      this._disabled = value;
      if (value) {
        this.tabDisabled();
      } else {
        this.tabEnabled();
      }

      this.requestUpdate("disabled", oldValue);
    }

    private tabDisabled() {
      if (this.tabIndex !== -1) {
        this.tabIndex = -1;
      }

      this.setAttribute("aria-disabled", "true");
    }

    private tabEnabled() {
      if (this.tabIndex === -1 && this.selected) {
        this.tabIndex = 0;
      }

      this.removeAttribute("aria-disabled");
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
        this.setAttribute("aria-selected", "true");
        this.tabIndex = 0;
        this.notifySelectedTab();
      } else {
        this.tabIndex = -1;
        this.removeAttribute("aria-selected");
      }

      this.requestUpdate("selected", oldValue);
    }

    @property({ type: Boolean, reflect: true })
    vertical = false;

    @property({ type: Boolean, reflect: true })
    viewportHidden = false;

    static get styles() {
      return [reset, styles];
    }

    handleClick(event: MouseEvent | KeyboardEvent) {
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

    handleKeydown(event: KeyboardEvent) {
      if (isActionKey(event.code)) {
        if (this.disabled) {
          event.preventDefault();
          return;
        }

        this.handleClick(event);
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
      if (changedProperties.has("disabled") && this.disabled) {
        this.selected = false;
      }
    }

    connectedCallback() {
      super.connectedCallback();

      this.addEventListener("click", this.handleClick);
      this.addEventListener("keydown", this.handleKeydown);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("click", this.handleClick);
      this.removeEventListener("keydown", this.handleKeydown);
    }

    protected firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);
    }

    renderCrossButton() {
      return html`
        <md-button
          variant="ghost"
          size="size-none"
          circle
          class="tab-action-button"
          ?disabled=${this.disabled}
          @click=${(e: MouseEvent) => this.handleCrossClick(e)}
          @keydown=${(e: KeyboardEvent) => this.handleCrossKeydown(e)}
        >
          <md-icon name="cancel-bold" size="14" iconSet="momentumDesign"></md-icon>
        </md-button>
      `;
    }

    render() {
      return html`
        <div
          part="tab"
          class="${classMap({
            disabled: this.disabled,
            "md-tab-content": true,
            closable: this.closable !== "",
            pill: this.type === "pill",
            rounded: this.type === "rounded",
            line: this.type === "line",
            primary: this.variant === "primary",
            newMomentum: this.newMomentum,
            onlyIcon: this.onlyIcon
          })}"
        >
          <slot class="tab-slot"></slot>
          ${this.isCrossVisible && this.closable ? this.renderCrossButton() : ""}
        </div>
        <div part="indicator"></div>
        <!-- Invisible button for legacy third party test compatibility -->
        <button
          type="button"
          class="test-compatibility-button"
          aria-hidden="true"
          @click=${(e: MouseEvent) => this.handleClick(e)}
          @keydown=${(e: KeyboardEvent) => this.handleKeydown(e)}
        ></button>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-tab": Tab.ELEMENT;
  }
}
