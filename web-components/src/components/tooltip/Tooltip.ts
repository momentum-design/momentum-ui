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
import { html, LitElement, property, PropertyValues, query } from "lit-element";
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
  export type Placement = (typeof tooltipPlacement)[number];
  export type Strategy = (typeof tooltipStrategy)[number];

  @customElementWithCheck("md-tooltip")
  export class ELEMENT extends FocusMixin(LitElement) {
    @property({ type: String }) message = "";
    @property({ type: String, reflect: true }) placement: Tooltip.Placement = "auto";
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) opened = false;

    @query(".md-tooltip__popper") popper!: HTMLDivElement;
    @query(".md-tooltip__reference") reference!: HTMLDivElement;

    private slotContent: Element[] | null = null;

    private _keyDownListener = (e: KeyboardEvent) => {
      this.handleKeyDown(e);
    };

    private _wheelListener = (_e: Event) => {
      if (this.opened) {
        this.notifyTooltipDestroy();
      }
    };

    connectedCallback() {
      super.connectedCallback();
      document.addEventListener("keydown", this._keyDownListener);
      window.addEventListener("wheel", this._wheelListener, { passive: true });
    }

    disconnectedCallback(): void {
      super.disconnectedCallback();
      document.removeEventListener("keydown", this._keyDownListener);
      window.removeEventListener("wheel", this._wheelListener);
    }

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

    private openTooltip() {
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

    private closeTooltip() {
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

    private changeMessage() {
      this.dispatchEvent(
        new CustomEvent<TooltipEvent>("tooltip-message", {
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

    private changeSlotContent(slotContent: Element[]) {
      this.dispatchEvent(
        new CustomEvent<TooltipEvent>("tooltip-slot", {
          bubbles: true,
          composed: true,
          detail: {
            placement: this.placement,
            reference: this.reference,
            popper: this.popper,
            slotContent
          }
        })
      );
    }

    notifyTooltipCreate() {
      if (!this.disabled) {
        this.opened = true;
      }
    }

    notifyTooltipDestroy() {
      if (!this.disabled) {
        this.opened = false;
      }
    }

    handleKeyDown(event: KeyboardEvent) {
      if (event.code === Key.Escape) {
        this.notifyTooltipDestroy();
      }
    }

    handleSlotContentChange(event: Event) {
      const slot = event.target as HTMLSlotElement;
      if (slot) {
        const slotContent = slot.assignedElements({ flatten: true });
        if (slotContent.length) {
          if (this.slotContent) {
            this.changeSlotContent(slotContent);
          }
          this.slotContent = slotContent;
        }
      }
    }

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("opened")) {
        if (this.opened) {
          this.openTooltip();
        } else {
          this.closeTooltip();
        }
      }
      if (changedProperties.has("message")) {
        this.changeMessage();
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
          <div class="md-tooltip__popper" role="tooltip" part="tooltip-popper">
            <div id="md-tooltip__content" class="md-tooltip__content" part="tooltip-content">
              ${this.message
                ? this.message
                : html` <slot name="tooltip-content" @slotchange=${this.handleSlotContentChange}></slot> `}
            </div>
            <div id="arrow" class="md-tooltip__arrow" data-popper-arrow></div>
          </div>
          <div
            class="md-tooltip__reference"
            part="tooltip_reference"
            @mouseenter=${() => this.notifyTooltipCreate()}
            @mouseleave=${() => this.notifyTooltipDestroy()}
            @click=${() => this.notifyTooltipDestroy()}
            @focusin=${(event: Event) => this.handleFocusIn(event)}
            @focusout=${(event: Event) => this.handleFocusOut(event)}
            @keydown=${(event: KeyboardEvent) => this.handleKeyDown(event)}
            aria-describedby="md-tooltip__content"
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
}

declare global {
  interface HTMLElementTagNameMap {
    "md-tooltip": Tooltip.ELEMENT;
  }
}
