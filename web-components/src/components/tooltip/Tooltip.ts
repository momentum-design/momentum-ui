/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Placement, PlacementType, StrategyType } from "../popover/Popover.types";
import { Key } from "@/constants";
import { FocusMixin, ResizeMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { debounce } from "@/utils/helpers";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, PropertyValues } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./scss/module.scss";

export const tooltipPlacement = Placement;

export const tooltipStrategy = ["fixed", "absolute"] as const;
export type TooltipEvent = {
  placement: Tooltip.Placement;
  reference: HTMLElement;
  popper: HTMLElement;
  slotContent?: Element[] | null;
};

export namespace Tooltip {
  export type Placement = PlacementType;
  export type Strategy = StrategyType;

  @customElementWithCheck("md-tooltip")
  export class ELEMENT extends ResizeMixin(FocusMixin(LitElement)) {
    @property({ type: String }) message = "";
    @property({ type: String, reflect: true }) placement: Tooltip.Placement = "auto";
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) opened = false;
    @property({ type: Boolean, reflect: true, attribute: "slot-to-tooltip" }) slotToTooltip = false;

    @query(".md-tooltip__popper") popper!: HTMLDivElement;
    @query(".md-tooltip__reference") reference!: HTMLDivElement;

    private slotContent: Element[] | null = null;
    private referenceHovered = false;
    private tooltipHovered = false;
    private referenceFocused = false;
    private tooltipSurface: HTMLElement | null = null;
    private awaitingPointerMoveAfterZoom = false;
    private hideTimeout?: ReturnType<typeof setTimeout>;

    private readonly _tooltipSurfaceEnterListener = () => {
      this.tooltipHovered = true;
      this.clearHideTimeout();
    };

    private readonly _tooltipSurfaceLeaveListener = () => {
      this.tooltipHovered = false;
      this.scheduleTooltipDestroy();
    };

    private readonly _tooltipSurfaceUpdateListener = (event: Event) => {
      this.tooltipSurface = (event as CustomEvent<HTMLElement>).detail;
    };

    private readonly _keyDownListener = (e: KeyboardEvent) => {
      this.handleKeyDown(e);
    };

    private readonly _wheelListener = (event: WheelEvent) => {
      if (!this.opened) return;
      if (event.ctrlKey) {
        this._zoomListener();
      } else {
        this.notifyTooltipDestroy();
      }
    };

    private readonly _afterZoomMouseMoveListener = (event: MouseEvent) => {
      const path = event.composedPath();
      this.referenceHovered = path.includes(this.reference);
      this.tooltipHovered = !!this.tooltipSurface && path.includes(this.tooltipSurface);
      this.awaitingPointerMoveAfterZoom = false;
      this.scheduleTooltipDestroy();
    };

    private readonly _zoomListener = () => {
      if (
        this.opened &&
        (this.referenceHovered || this.tooltipHovered || this.referenceFocused || this.awaitingPointerMoveAfterZoom)
      ) {
        this.awaitingPointerMoveAfterZoom = true;
        this.clearHideTimeout();
        window.addEventListener("mousemove", this._afterZoomMouseMoveListener, { passive: true, capture: true });
      }
    };

    private hasMessage() {
      return this.message && this.message.trim().length > 0;
    }

    private hasSlotContent() {
      return this.slotContent && this.slotContent.length > 0;
    }

    private get hasTooltipContent() {
      return this.hasMessage() || this.hasSlotContent();
    }

    connectedCallback() {
      super.connectedCallback();
      document.addEventListener("keydown", this._keyDownListener);
      window.addEventListener("wheel", this._wheelListener, { passive: true });
      window.addEventListener("gesturestart", this._zoomListener, { passive: true });
      window.visualViewport?.addEventListener("resize", this._zoomListener, { passive: true });
      this.addEventListener("tooltip-surface-enter", this._tooltipSurfaceEnterListener);
      this.addEventListener("tooltip-surface-leave", this._tooltipSurfaceLeaveListener);
      this.addEventListener("tooltip-surface-update", this._tooltipSurfaceUpdateListener);
    }

    disconnectedCallback(): void {
      this.notifyTooltipDisconnected();

      super.disconnectedCallback();
      document.removeEventListener("keydown", this._keyDownListener);
      window.removeEventListener("wheel", this._wheelListener);
      window.removeEventListener("gesturestart", this._zoomListener);
      window.visualViewport?.removeEventListener("resize", this._zoomListener);
      this.removeEventListener("tooltip-surface-enter", this._tooltipSurfaceEnterListener);
      this.removeEventListener("tooltip-surface-leave", this._tooltipSurfaceLeaveListener);
      this.removeEventListener("tooltip-surface-update", this._tooltipSurfaceUpdateListener);
      this.clearInteractionState();
    }

    protected handleResize(contentRect: DOMRect) {
      super.handleResize?.(contentRect);

      debounce(() => {
        if (this.slotToTooltip) {
          this.disabled = this.reference && !this.isContentTruncated(this.reference);
        }
      }, 100)();
    }

    protected handleFocusIn(event: Event) {
      if (super.handleFocusIn) {
        super.handleFocusIn(event);
      }
      this.referenceFocused = true;
      this.clearHideTimeout();
      this.notifyTooltipCreate();
    }

    protected handleFocusOut(event: Event) {
      if (super.handleFocusOut) {
        super.handleFocusOut(event);
      }
      const nextTarget = (event as FocusEvent).relatedTarget as Node | null;
      this.referenceFocused = !!nextTarget && this.reference.contains(nextTarget);
      if (!this.referenceFocused && !this.referenceHovered && !this.tooltipHovered) {
        this.notifyTooltipDestroy();
      }
    }

    private clearHideTimeout() {
      if (this.hideTimeout !== undefined) {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = undefined;
      }
    }

    private clearInteractionState() {
      this.clearHideTimeout();
      this.referenceHovered = false;
      this.tooltipHovered = false;
      this.referenceFocused = false;
      this.tooltipSurface = null;
      this.awaitingPointerMoveAfterZoom = false;
      window.removeEventListener("mousemove", this._afterZoomMouseMoveListener, true);
    }

    private scheduleTooltipDestroy() {
      this.clearHideTimeout();
      if (this.referenceHovered || this.tooltipHovered || this.referenceFocused || this.awaitingPointerMoveAfterZoom) {
        return;
      }
      this.hideTimeout = setTimeout(() => {
        this.hideTimeout = undefined;
        if (!this.referenceHovered && !this.tooltipHovered && !this.referenceFocused) {
          this.notifyTooltipDestroy();
        }
      }, 0);
    }

    private handleReferenceMouseEnter() {
      this.referenceHovered = true;
      this.clearHideTimeout();
      this.notifyTooltipCreate();
    }

    private handleReferenceMouseLeave() {
      this.referenceHovered = false;
      this.scheduleTooltipDestroy();
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

    private notifyTooltipDisconnected() {
      document.dispatchEvent(
        new CustomEvent("tooltip-disconnected", {
          bubbles: true,
          composed: true,
          detail: { reference: this.reference }
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
      if (!this.disabled && this.hasTooltipContent) {
        this.opened = true;
      }
    }

    notifyTooltipDestroy() {
      this.clearInteractionState();
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
          this.clearInteractionState();
          this.closeTooltip();
        }
      }
      if (changedProperties.has("message")) {
        this.changeMessage();
      }

      if (changedProperties.has("disabled")) {
        if (this.opened) {
          this.opened = false;
        }
      }
    }

    handleSlotChanged(event: Event) {
      const slot = event.target as HTMLSlotElement;
      if (this.slotToTooltip && slot) {
        const slotContent = slot.assignedNodes({ flatten: true });
        const contentText = slotContent
          .map((el) => el.textContent)
          .join(" ")
          .trim();

        this.message = contentText;
        this.disabled = this.reference && !this.isContentTruncated(this.reference);
      }
    }

    private isContentTruncated(element: HTMLElement): boolean {
      return element.scrollWidth > element.clientWidth;
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
              ${this.message ||
              html` <slot name="tooltip-content" @slotchange=${this.handleSlotContentChange}></slot> `}
            </div>
            <div id="arrow" class="md-tooltip__arrow" data-popper-arrow></div>
          </div>
          <div
            class="md-tooltip__reference"
            part="tooltip_reference"
            @mouseenter=${() => this.handleReferenceMouseEnter()}
            @mouseleave=${() => this.handleReferenceMouseLeave()}
            @focusin=${(event: Event) => this.handleFocusIn(event)}
            @focusout=${(event: Event) => this.handleFocusOut(event)}
            @keydown=${(event: KeyboardEvent) => this.handleKeyDown(event)}
            aria-describedby="md-tooltip__content"
          >
            <slot @slotchange=${this.handleSlotChanged}></slot>
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
