/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { FocusMixin } from "@/mixins";
import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property, query } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import styles from "./scss/module.scss";

export const tooltipPlacement = [
  "auto",
  "auto-start",
  "auto-end",
  "left-start",
  "left",
  "left-end",
  "right-start",
  "right",
  "right-end",
  "top-start",
  "top",
  "top-end",
  "bottom-start",
  "bottom",
  "bottom-end"
] as const;

export const tooltipStrategy = ["fixed", "absolute"] as const;
export type TooltipEvent = {
  placement: Tooltip.Placement;
  reference: HTMLElement;
  popper: HTMLElement;
  slotContent?: Element[] | undefined | null;
};

export namespace Tooltip {
  export type Placement = typeof tooltipPlacement[number];
  export type Strategy = typeof tooltipStrategy[number];
}

@customElement("md-tooltip")
export class Tooltip extends FocusMixin(LitElement) {
  @property({ type: String }) message = "";
  @property({ type: String, reflect: true }) placement: Tooltip.Placement = "auto";
  @property({ type: Boolean, reflect: true }) disabled = false;

  @query(".md-tooltip__popper") popper!: HTMLDivElement;
  @query(".md-tooltip__reference") reference!: HTMLDivElement;

  private slotContent: Element[] | null = null;

  protected handleFocusIn(event: Event) {
    if (super.handleFocusIn) {
      super.handleFocusIn(event);
    }
    this.notifyTooltipCreate();
  }

  protected handleFocusOut(event: Event) {
    if (super.handleFocusOut) {
      super.handleFocusOut(event);
    }
    this.notifyTooltipDestroy();
  }

  notifyTooltipCreate() {
    if (!this.disabled) {
      this.dispatchEvent(
        new CustomEvent<TooltipEvent>("tooltip-create", {
          bubbles: true,
          composed: true,
          detail: {
            placement: this.placement,
            reference: this.reference,
            popper: this.popper,
            ...(!this.message && { slotContent: this.slotContent })
          }
        })
      );
    }
  }

  notifyTooltipDestroy() {
    if (!this.disabled) {
      this.dispatchEvent(
        new CustomEvent<TooltipEvent>("tooltip-destroy", {
          bubbles: true,
          composed: true,
          detail: {
            placement: this.placement,
            reference: this.reference,
            popper: this.popper
          }
        })
      );
    }
  }

  handleSlotContentChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    if (slot) {
      const slotContent = slot.assignedElements({ flatten: true });
      if (slotContent.length) {
        this.slotContent = slotContent;
      }
    }
  }

  private get tooltipClassMap() {
    return {
      "md-tooltip--disabled": this.disabled
    };
  }

  render() {
    return html`
      <div class="md-tooltip ${classMap(this.tooltipClassMap)}">
        <div class="md-tooltip__popper" role="tooltip">
          <div class="md-tooltip__content">
            ${this.message
              ? this.message
              : html`
                  <slot name="tooltip-content" @slotchange=${this.handleSlotContentChange}></slot>
                `}
          </div>
          <div id="arrow" class="md-tooltip__arrow" data-popper-arrow></div>
        </div>
        <div
          class="md-tooltip__reference"
          @mouseenter=${() => this.notifyTooltipCreate()}
          @mouseleave=${() => this.notifyTooltipDestroy()}
          aria-describedby="tooltip"
        >
          <slot></slot>
        </div>
      </div>
    `;
  }

  static get styles() {
    return [reset, styles];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-tooltip": Tooltip;
  }
}
