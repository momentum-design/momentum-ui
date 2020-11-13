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
  sourceEvent: Event;
  placement: Tooltip.Placement;
  reference: HTMLElement;
  popper: HTMLElement;
};

export namespace Tooltip {
  export type Placement = typeof tooltipPlacement[number];
  export type Strategy = typeof tooltipStrategy[number];
}

@customElement("md-tooltip")
export class Tooltip extends FocusMixin(LitElement) {
  @property({ type: String }) message = "";
  @property({ type: String, reflect: true }) placement: Tooltip.Placement = "auto";

  @query(".md-tooltip__popper") popper!: HTMLDivElement;
  @query(".md-tooltip__reference") reference!: HTMLDivElement;

  protected handleFocusIn(event: Event) {
    if (super.handleFocusIn) {
      super.handleFocusIn(event);
    }
    this.notifyTooltipCreate(event);
  }

  protected handleFocusOut(event: Event) {
    if (super.handleFocusOut) {
      super.handleFocusOut(event);
    }
    this.notifyTooltipDestroy(event);
  }

  notifyTooltipCreate(event: Event) {
    this.dispatchEvent(
      new CustomEvent<TooltipEvent>("tooltip-create", {
        bubbles: true,
        composed: true,
        detail: {
          sourceEvent: event,
          placement: this.placement,
          reference: this.reference,
          popper: this.popper
        }
      })
    );
  }

  notifyTooltipDestroy(event: Event) {
    this.dispatchEvent(
      new CustomEvent<TooltipEvent>("tooltip-destroy", {
        bubbles: true,
        composed: true,
        detail: {
          sourceEvent: event,
          placement: this.placement,
          reference: this.reference,
          popper: this.popper
        }
      })
    );
  }

  render() {
    return html`
      <div class="md-tooltip">
        <div class="md-tooltip__popper" role="tooltip">
          <div class="md-tooltip__content">
            ${this.message
              ? this.message
              : html`
                  <slot name="tooltip-content"></slot>
                `}
          </div>
          <div id="arrow" class="md-tooltip__arrow" data-popper-arrow></div>
        </div>
        <div
          class="md-tooltip__reference"
          @mouseenter=${this.notifyTooltipCreate}
          @mouseleave=${this.notifyTooltipDestroy}
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
