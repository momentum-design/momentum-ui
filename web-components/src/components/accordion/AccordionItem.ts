/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { customElement, html, LitElement, property, query, PropertyValues } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { nanoid } from "nanoid";
import reset from "@/wc_scss/reset.scss";
import styles from "./scss/module.scss";
import { FocusMixin } from "@/mixins";

export type AccordionEvent = {
  srcEvent: MouseEvent | KeyboardEvent;
};

@customElement("md-accordion-item")
export class AccordionItem extends FocusMixin(LitElement) {
  private _expanded = false;
  private _level = 3;

  private uniqueId = nanoid();

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
    }
    this.requestUpdate("expanded", oldValue);
  }
  @property({ type: Number, reflect: true })
  get level() {
    return this._level;
  }
  set level(value: number) {
    const oldValue = this.level;

    if (value < 1 && value > 6) {
      console.warn("Please set appropriate section heading level");
      this._level = 3;
    } else {
      this._level = value;
    }
    this.requestUpdate("level", oldValue);
  }

  @query(".accordion-header") header!: HTMLButtonElement;

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

  handleClick(event: MouseEvent) {
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
      <div role="heading" aria-level=${this.level}>
        <div class="md-accordion-heading">
          <button
            type="button"
            aria-expanded=${this.expanded}
            class="md-accordion-header"
            aria-label=${ifDefined(this.label || undefined)}
            aria-controls="section-${this.uniqueId}"
            aria-disabled=${this.disabled}
            ?disabled=${this.disabled}
            id="accordion-${this.uniqueId}"
            part="accordion-header"
            tabindex=${ifDefined(this.disabled ? -1 : undefined)}
            @click=${this.handleClick}
            @keydown=${this.handleKeyDown}
          >
            ${this.label}
            <md-icon name=${this.expanded ? "icon-arrow-up_18" : "icon-arrow-down_18"}></md-icon>
          </button>
        </div>
      </div>
      <div
        role="region"
        id="section-${this.uniqueId}"
        aria-labelledby="accordion-${this.uniqueId}"
        class="md-accordion-panel"
        part="accordion-panel"
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-accordion-item": AccordionItem;
  }
}
