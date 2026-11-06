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
import { html, LitElement, PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./scss/module.scss";

export namespace ListItem {
  @customElementWithCheck("md-list-item")
  export class ELEMENT extends FocusMixin(LitElement) {
    @property({ type: String, reflect: true }) role: "listitem" | "option" | "menuitem" = "option";
    @property({ type: Number, reflect: true }) tabIndex = -1;
    @property({ type: String, reflect: true }) shape: "pill" | "rounded" = "rounded";

    @property({ type: String, attribute: "focus-selector" }) focusSelector = "";

    private focusTarget?: HTMLElement;
    private originalTargetTabIndex = -1;
    private reflectingTabIndex = false;

    attributeChangedCallback(name: string, oldValue: string | null, value: string | null) {
      if (!this.reflectingTabIndex || name !== "tabindex") {
        super.attributeChangedCallback(name, oldValue, value);
        if (name === "tabindex" && this.focusTarget) {
          this.updateFocusTarget();
        }
      }
    }

    private updateFocusTarget() {
      const target = this.focusSelector
        ? (this.querySelector<HTMLElement>(this.focusSelector) ?? undefined)
        : undefined;

      if (target !== this.focusTarget) {
        if (this.focusTarget) {
          this.focusTarget.tabIndex = this.originalTargetTabIndex;
        }
        this.focusTarget = target;
        if (target) {
          this.originalTargetTabIndex = target.tabIndex;
        }
      }

      if (target) {
        target.tabIndex = this.tabIndex;
      }
      this.reflectTabIndex();
    }

    private reflectTabIndex() {
      const value = this.focusTarget || this.tabIndex == null ? null : String(this.tabIndex);
      if (this.getAttribute("tabindex") !== value) {
        this.reflectingTabIndex = true;
        if (value === null) {
          this.removeAttribute("tabindex");
        } else {
          this.setAttribute("tabindex", value);
        }
        this.reflectingTabIndex = false;
      }
    }

    protected update(changedProperties: PropertyValues) {
      super.update(changedProperties);
      if (this.focusSelector || this.focusTarget) {
        this.updateFocusTarget();
      }
    }

    private handleSlotChange() {
      if (this.focusSelector || this.focusTarget) {
        this.updateFocusTarget();
      }
    }

    focus(options?: FocusOptions) {
      if (this.focusSelector) {
        this.updateFocusTarget();
      }
      if (this.focusTarget) {
        this.focusTarget.focus(options);
      } else {
        super.focus(options);
      }
    }

    blur() {
      if (this.focusTarget) {
        this.focusTarget.blur();
      } else {
        super.blur();
      }
    }

    private handleDelegatedFocus(event: FocusEvent) {
      if (this.focusTarget && event.composedPath().includes(this.focusTarget)) {
        if (event.type === "focusin") {
          this.handleFocusIn?.(event);
        } else {
          this.handleFocusOut?.(event);
        }
      }
    }

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
      if (this.role === "option") {
        this.setAttribute("aria-selected", `${value}`);
      }
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
        <div
          class="md-list-item ${classMap(this.listItemTemplateClassMap)}"
          part="list-item"
          @focusin=${this.handleDelegatedFocus}
          @focusout=${this.handleDelegatedFocus}
        >
          <slot @slotchange=${this.handleSlotChange}></slot>
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
