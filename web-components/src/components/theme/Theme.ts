/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { arrow, createPopper, flip, Instance, offset, Placement } from "@popperjs/core/lib";
import { defaultModifiers } from "@popperjs/core/lib/popper-lite";
import { html, LitElement, PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import styles from "../tooltip/scss/module.scss";
import { Tooltip, TooltipEvent } from "../tooltip/Tooltip";
import { lumosDark, lumosLight, momentumV2Dark, momentumV2Light } from "./index";

declare global {
  interface Window {
    ShadyCSS: {
      nativeShadow: boolean;
      prepareTemplate(template: HTMLTemplateElement, elementName: string, typeExtension?: string): void;
      styleElement(host: HTMLElement): void;
      ScopingShim: {
        prepareAdoptedCssText(cssTextArray: string[], elementName: string): void;
      };
    };
  }
  interface ShadowRoot {
    adoptedStyleSheets?: ThemeStyleSheet[];
  }

  interface ThemeStyleSheet {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    replaceSync: Function;
  }
}

export type ThemeName = "momentum" | "lumos" | "momentumV2";
export const ThemeNameValues: ThemeName[] = ["momentum", "lumos", "momentumV2"];
export const BackgroundModeValues = ["DEFAULT", "SERENE", "AURORA"];
export type BackgroundMode = (typeof BackgroundModeValues)[number];

const TOOLTIP_HALF_ARROW_SIZE = 8;
const TOOLTIP_ADDITIONAL_PADDING = 4;
const TOOLTIP_OFFSET = TOOLTIP_HALF_ARROW_SIZE + TOOLTIP_ADDITIONAL_PADDING;

export namespace Theme {
  export type Attributes = {
    darkTheme: boolean;
    mdTheme: boolean;
  };

  /**
   * Popper.js can't position overlay content correct in
   * case when element inside container with overflow: hidden.
   * https://github.com/popperjs/popper-core/issues/112.
   * To make possible to position such element correctly, we need
   * move creating popper instance in parent container that guarantee
   * will not contain overflow property with hidden value;
   */

  @customElementWithCheck("md-theme")
  export class ELEMENT extends LitElement {
    @property({ type: Boolean }) darkTheme = false;
    @property({ type: Boolean }) lumos = false;
    @property({ type: String }) theme?: ThemeName;

    @state() private activeTheme = lumosLight;

    @query("[data-virtual-global-popper]") virtualWrapper!: HTMLDivElement;
    @query("[data-virtual-global-reference]") virtualReference!: HTMLDivElement;

    private placement: Tooltip.Placement = "bottom";
    private popperInstance: Instance | null = null;
    private activeTooltipTrigger: HTMLElement | null = null;
    private positionTrackingId: number | undefined;
    private virtualPopperMouseEnterHandler: (() => void) | null = null;
    private virtualPopperMouseLeaveHandler: (() => void) | null = null;

    private get tooltipOffset() {
      return TOOLTIP_OFFSET;
    }

    private getTooltipHost(reference: HTMLElement): Tooltip.ELEMENT | null {
      const root = reference.getRootNode();
      if (root instanceof ShadowRoot && root.host instanceof Tooltip.ELEMENT) {
        return root.host;
      }
      return null;
    }

    private setTheme() {
      //If the theme property is set, prefer using that theme over the lumos property
      if (this.theme === "momentum") {
        return this.darkTheme ? momentumV2Dark : momentumV2Light;
      } else if (this.theme === "lumos") {
        return this.darkTheme ? lumosDark : lumosLight;
      } else if (this.theme === "momentumV2") {
        return this.darkTheme ? momentumV2Dark : momentumV2Light;
      }
      if (this.lumos) {
        return this.darkTheme ? lumosDark : lumosLight;
      } else {
        return this.darkTheme ? momentumV2Dark : momentumV2Light;
      }
    }

    public getStyleElement() {
      return document.createElement("style");
    }

    public applyStyle() {
      const shadow = this.shadowRoot as ShadowRoot;
      /* c8 ignore next 4 */
      if ("adoptedStyleSheets" in document) {
        const newTheme: ThemeStyleSheet = new CSSStyleSheet();
        newTheme.replaceSync(this.activeTheme);
        shadow.adoptedStyleSheets = [newTheme];
      } else {
        const styleNode: HTMLStyleElement = this.getStyleElement();
        styleNode.textContent = this.activeTheme.cssText;
        shadow.appendChild(styleNode);
      }
    }

    private removeChildFromVirtualPopper() {
      while (this.virtualWrapper.firstElementChild) {
        this.virtualWrapper.firstElementChild.remove();
      }
    }

    private setInitStyleToVirtualReference() {
      const { style } = this.virtualReference;

      style.top = "0";
      style.bottom = "0";
      style.left = "0";
      style.right = "0";
      style.width = "0";
      style.height = "0";
      style.zIndex = "-1";
    }

    private setStyleToVirtualReference(triggerRect: DOMRect) {
      const { style } = this.virtualReference;
      const { top, bottom, left, right, width, height } = triggerRect;

      style.position = "fixed";
      style.top = `${top}px`;
      style.bottom = `${bottom}px`;
      style.left = `${left}px`;
      style.right = `${right}px`;
      style.width = `${width}px`;
      style.height = `${height}px`;
      style.zIndex = "-1";
    }

    private setVirtualReferencePosition(trigger: HTMLElement) {
      const triggerRect = trigger.getBoundingClientRect();

      this.setStyleToVirtualReference(triggerRect);
    }

    private initVirtualElements(
      popper: HTMLElement,
      reference: HTMLElement,
      slotContent: Element[] | null | undefined
    ) {
      const popperClone = popper.cloneNode(true) as HTMLDivElement;
      const hoverBridge = document.createElement("div");
      hoverBridge.classList.add("tooltip-hover-bridge");
      popperClone.prepend(hoverBridge);

      if (this.virtualWrapper.hasChildNodes()) {
        this.removeChildFromVirtualPopper();
      }

      this.virtualWrapper.append(popperClone);

      if (slotContent) {
        this.setVirtualSlotContent(slotContent);
      }

      this.setVirtualReferencePosition(reference);
    }

    private setupTooltipHoverBridge() {
      const popper = this.virtualPopper;
      const hoverBridge = popper?.querySelector(".tooltip-hover-bridge") as HTMLElement | null;

      if (!hoverBridge || !this.popperInstance) {
        return;
      }

      const placement = this.popperInstance.state.placement;
      const side = placement.split("-")[0];
      const bridgeSize = `calc(0.75rem + ${this.tooltipOffset}px)`;
      const popperHeight = popper.offsetHeight || 0;
      const popperWidth = popper.offsetWidth || 0;

      Object.assign(hoverBridge.style, {
        top: "",
        left: "",
        right: "",
        bottom: "",
        width: "",
        height: ""
      });

      switch (side) {
        case "top":
          hoverBridge.style.height = bridgeSize;
          hoverBridge.style.bottom = `calc(-1 * (${bridgeSize}))`;
          hoverBridge.style.left = "50%";
          hoverBridge.style.width = `${popperWidth}px`;
          break;
        case "left":
          hoverBridge.style.height = `${popperHeight}px`;
          hoverBridge.style.width = bridgeSize;
          hoverBridge.style.right = `calc(-1.5 * (${bridgeSize}))`;
          break;
        case "right":
          hoverBridge.style.height = `${popperHeight}px`;
          hoverBridge.style.width = bridgeSize;
          hoverBridge.style.left = `calc(-0.5 * (${bridgeSize}))`;
          break;
        case "bottom":
        default:
          hoverBridge.style.height = bridgeSize;
          hoverBridge.style.top = `calc(-1 * (${bridgeSize}))`;
          hoverBridge.style.left = "50%";
          hoverBridge.style.width = `${popperWidth}px`;
          break;
      }
    }

    private setupVirtualPopperHoverHandlers(reference: HTMLElement) {
      this.teardownVirtualPopperHoverHandlers();

      const popper = this.virtualPopper;
      const tooltipHost = this.getTooltipHost(reference);

      if (!popper || !tooltipHost) {
        return;
      }

      this.virtualPopperMouseEnterHandler = () => {
        tooltipHost.cancelCloseDelay();
      };

      this.virtualPopperMouseLeaveHandler = () => {
        tooltipHost.startCloseDelay();
      };

      popper.addEventListener("mouseenter", this.virtualPopperMouseEnterHandler);
      popper.addEventListener("mouseleave", this.virtualPopperMouseLeaveHandler);
    }

    private teardownVirtualPopperHoverHandlers() {
      const popper = this.virtualPopper;

      if (popper && this.virtualPopperMouseEnterHandler) {
        popper.removeEventListener("mouseenter", this.virtualPopperMouseEnterHandler);
      }

      if (popper && this.virtualPopperMouseLeaveHandler) {
        popper.removeEventListener("mouseleave", this.virtualPopperMouseLeaveHandler);
      }

      this.virtualPopperMouseEnterHandler = null;
      this.virtualPopperMouseLeaveHandler = null;
    }

    private setVirtualSlotContent(slotContent: Element[]) {
      if (this.virtualTooltipContent) {
        while (this.virtualTooltipContent.firstElementChild) {
          this.virtualTooltipContent.firstElementChild.remove();
        }

        slotContent.forEach((element) => this.virtualTooltipContent!.append(element));
      }
    }

    protected willUpdate(changedProperties: PropertyValues): void {
      super.willUpdate?.(changedProperties);
      if (changedProperties.has("lumos") || changedProperties.has("darkTheme") || changedProperties.has("theme")) {
        this.activeTheme = this.setTheme();
      }
    }

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("lumos") || changedProperties.has("darkTheme") || changedProperties.has("theme")) {
        this.dispatchEvent(
          new CustomEvent("theme-changed", {
            composed: true,
            bubbles: true,
            detail: {
              darkTheme: this.darkTheme,
              lumos: this.lumos,
              theme: this.theme
            }
          })
        );
        this.applyStyle();
      }
    }

    handleVirtualTooltipCreate(event: CustomEvent<TooltipEvent>) {
      event.stopPropagation();

      const { popper, placement, reference, slotContent } = event.detail;
      const previousTrigger = this.activeTooltipTrigger;
      const previousHost =
        previousTrigger && previousTrigger !== reference ? this.getTooltipHost(previousTrigger) : null;

      this.activeTooltipTrigger = reference;
      this.placement = placement;
      this.teardownVirtualPopperHoverHandlers();
      this.initVirtualElements(popper, reference, slotContent);
      this.startContinuousPositionTracking(reference);
      this.showVirtualTooltip();

      if (previousHost) {
        previousHost.cancelCloseDelay();
        if (previousHost.opened) {
          previousHost.opened = false;
        }
      }
    }

    private startContinuousPositionTracking(trigger: HTMLElement): void {
      this.stopContinuousPositionTracking();
      let lastHoverBridgePlacement: string | null = null;

      const trackPosition = () => {
        if (this.activeTooltipTrigger === trigger && this.popperInstance) {
          this.setVirtualReferencePosition(trigger);
          void this.popperInstance.update().then(() => {
            const placement = this.popperInstance?.state.placement;
            if (placement && placement !== lastHoverBridgePlacement) {
              lastHoverBridgePlacement = placement;
              this.setupTooltipHoverBridge();
            }
          });
          this.positionTrackingId = requestAnimationFrame(trackPosition);
        }
      };

      this.positionTrackingId = requestAnimationFrame(trackPosition);
    }

    private stopContinuousPositionTracking(): void {
      if (this.positionTrackingId) {
        cancelAnimationFrame(this.positionTrackingId);
        this.positionTrackingId = undefined;
      }
    }

    handleVirtualTooltipDestroy(event: CustomEvent<TooltipEvent>) {
      event.stopPropagation();

      if (this.activeTooltipTrigger !== event.detail.reference) {
        return;
      }

      this.hideVirtualTooltip();
      this.activeTooltipTrigger = null;
    }

    handleVirtualTooltipChangeMessage(event: CustomEvent<TooltipEvent>) {
      const { popper, reference } = event.detail;

      if (this.activeTooltipTrigger !== reference) {
        return;
      }

      const content = popper.querySelector(".md-tooltip__content");
      const virtualContent = this.virtualWrapper.querySelector(".md-tooltip__content");

      if (content && virtualContent) {
        const message = content.textContent;
        const virtualMessage = virtualContent.textContent;
        if (message && virtualMessage) {
          virtualContent.textContent = message;
          this.popperInstance?.update();
        }
      }
    }

    handleVirtualTooltipSlotChange(event: CustomEvent<TooltipEvent>) {
      const { slotContent } = event.detail;

      if (slotContent) {
        this.setVirtualSlotContent(slotContent);
      }
    }

    handleTooltipRemoved = () => {
      this.hideVirtualTooltip();
      this.activeTooltipTrigger = null;
    };

    private destroyPopperInstance() {
      if (this.popperInstance) {
        this.popperInstance.destroy();
        this.popperInstance = null;
      }
    }

    private createPopperInstance(placement: Tooltip.Placement) {
      this.destroyPopperInstance();

      if (this.virtualPopper) {
        const halfArrowSize = TOOLTIP_HALF_ARROW_SIZE;
        const additionalPadding = TOOLTIP_ADDITIONAL_PADDING;

        this.popperInstance = createPopper(this.virtualReference, this.virtualPopper, {
          placement,
          modifiers: [
            ...defaultModifiers,
            flip,
            offset,
            arrow,
            {
              name: "offset",
              options: {
                offset: ({ placement }: { placement: Placement }) => {
                  const padding = halfArrowSize + additionalPadding;
                  if (
                    placement.startsWith("left") ||
                    placement.startsWith("right") ||
                    placement.startsWith("top") ||
                    placement.startsWith("bottom")
                  ) {
                    return [0, padding];
                  }
                  return [8, 8]; // leave old defaults
                }
              }
            },
            ...(this.virtualArrow
              ? [
                  {
                    name: "arrow",
                    options: {
                      element: this.virtualArrow,
                      padding: halfArrowSize
                    }
                  }
                ]
              : [])
          ]
        });

        void this.popperInstance.update().then(() => {
          this.setupTooltipHoverBridge();
        });
      }
    }

    private get virtualPopper() {
      return this.shadowRoot!.querySelector(".md-tooltip__popper") as HTMLElement;
    }

    private get virtualArrow() {
      return this.shadowRoot!.querySelector(".md-tooltip__arrow") as HTMLElement;
    }

    private get virtualTooltipContent() {
      return this.shadowRoot!.querySelector(".md-tooltip__content");
    }

    private showVirtualTooltip() {
      if (this.virtualPopper) {
        this.virtualPopper.toggleAttribute("data-show", true);
        this.createPopperInstance(this.placement);

        if (this.activeTooltipTrigger) {
          this.setupVirtualPopperHoverHandlers(this.activeTooltipTrigger);
        }
      }
    }

    private hideVirtualTooltip() {
      if (this.virtualPopper) {
        this.teardownVirtualPopperHoverHandlers();
        this.virtualPopper.toggleAttribute("data-show", false);
        this.destroyPopperInstance();
        this.stopContinuousPositionTracking();
        this.setInitStyleToVirtualReference();
      }
    }

    private setupEvents() {
      this.addEventListener("tooltip-create", this.handleVirtualTooltipCreate as EventListener);
      this.addEventListener("tooltip-destroy", this.handleVirtualTooltipDestroy as EventListener);
      this.addEventListener("tooltip-message", this.handleVirtualTooltipChangeMessage as EventListener);
      this.addEventListener("tooltip-slot", this.handleVirtualTooltipSlotChange as EventListener);

      document.addEventListener("tooltip-disconnected", this.handleTooltipRemoved as EventListener, true);
    }

    private teardownEvents() {
      this.removeEventListener("tooltip-create", this.handleVirtualTooltipCreate as EventListener);
      this.removeEventListener("tooltip-destroy", this.handleVirtualTooltipDestroy as EventListener);
      this.removeEventListener("tooltip-message", this.handleVirtualTooltipChangeMessage as EventListener);
      this.removeEventListener("tooltip-slot", this.handleVirtualTooltipSlotChange as EventListener);

      document.removeEventListener("tooltip-disconnected", this.handleTooltipRemoved as EventListener, true);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.teardownVirtualPopperHoverHandlers();
      this.stopContinuousPositionTracking();
      this.teardownEvents();
    }

    protected async firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);
      await new Promise((resolve) => setTimeout(resolve, 0));
      this.setupEvents();
    }

    static get styles() {
      return [lumosLight];
    }

    render() {
      return html`
        <div class="theme-wrapper" part="theme-wrapper">
          <style>
            ${styles} .theme-wrapper {
              width: 100%;
            }
          </style>
          <slot></slot>
          <div class="md-tooltip" data-virtual-global-popper></div>
          <div data-virtual-global-reference></div>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-theme": Theme.ELEMENT;
  }
}
