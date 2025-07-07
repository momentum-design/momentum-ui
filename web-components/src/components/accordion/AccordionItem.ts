/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import "@/components/icon/Icon";
import { FocusMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { generateSimpleUniqueId } from "@/utils/uniqueId";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property, PropertyValues, query } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import styles from "./scss/module.scss";

export namespace AccordionItem {
  export type AccordionEvent = {
    srcEvent: MouseEvent | KeyboardEvent;
  };

  @customElementWithCheck("md-accordion-item")
  export class ELEMENT extends FocusMixin(LitElement) {
    private _expanded = false;
    private _level = 3;

    private readonly uniqueId = generateSimpleUniqueId("accordion-item");

    @property({ type: String }) label = "";
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true })
    get expanded() {
      return this._expanded;
    }
    set expanded(value: boolean) {
      const oldValue = this._expanded;
      this._expanded = value;
      if (value) {
        this.notifyAccordionFocus();
        this.notifyExpandedHeader();
      } else {
        this.notifyCollapsedHeader();
      }
      this.requestUpdate("expanded", oldValue);
    }
    @property({ type: Number, reflect: true })
    get level() {
      return this._level;
    }
    set level(value: number) {
      const oldValue = this.level;
      if (value < 1 || value > 6) {
        console.warn("Please set appropriate section heading level");
        this._level = 3;
      } else {
        this._level = value;
      }
      this.requestUpdate("level", oldValue);
    }

    @query(".md-accordion-expander") header!: HTMLButtonElement;

    private notifyExpandedHeader() {
      this.dispatchEvent(
        new CustomEvent("accordion-item-expanded", {
          composed: true,
          bubbles: true,
          detail: {
            id: this.uniqueId
          }
        })
      );
    }

    private notifyCollapsedHeader() {
      this.dispatchEvent(
        new CustomEvent("accordion-item-collapsed", {
          composed: true,
          bubbles: true,
          detail: {
            id: this.uniqueId
          }
        })
      );
    }

    private notifyAccordionFocus() {
      this.dispatchEvent(
        new CustomEvent("focus-visible", {
          composed: true,
          bubbles: true
        })
      );
    }

    protected firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);
      this.setAttribute("id", this.uniqueId);
    }

    static get styles() {
      return [reset, styles];
    }

    handleMouseDown(event: MouseEvent) {
      if (!this.disabled) {
        this.dispatchEvent(
          new CustomEvent<AccordionEvent>("accordion-item-click", {
            detail: {
              srcEvent: event
            },
            composed: true,
            bubbles: true
          })
        );
      }
    }

    handleKeyDown(event: KeyboardEvent) {
      if (!this.disabled) {
        this.dispatchEvent(
          new CustomEvent<AccordionEvent>("accordion-item-keydown", {
            detail: {
              srcEvent: event
            },
            bubbles: true,
            composed: true
          })
        );
      }
    }

    render() {
      return html`
        <div class="md-accordion-item">
          <div role="heading" aria-level=${this.level} class="md-accordion-header" part="accordion-header">
            <button
              type="button"
              aria-expanded=${this.expanded}
              class="md-accordion-expander"
              aria-label=${ifDefined(this.label || undefined)}
              aria-controls="panel-${this.uniqueId}"
              aria-disabled=${this.disabled}
              ?disabled=${this.disabled}
              id="header-${this.uniqueId}"
              part="accordion-button"
              tabindex=${ifDefined(this.disabled ? -1 : undefined)}
              @mousedown=${this.handleMouseDown}
              @keydown=${this.handleKeyDown}
            >
              <slot name="header-content">
                <span class="md-accordion-expander-label">${this.label}</span>
              </slot>
              <md-icon iconSet=${"momentumDesign"} size="14" name="arrow-down-bold"></md-icon>
            </button>
          </div>
          <div
            role="region"
            id="panel-${this.uniqueId}"
            aria-labelledby="header-${this.uniqueId}"
            class="md-accordion-panel"
            part="accordion-panel"
          >
            <slot></slot>
          </div>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-accordion-item": AccordionItem.ELEMENT;
  }
}
