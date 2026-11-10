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
import { TooltipInteraction } from "../tooltip/TooltipInteraction";
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

    private placement: Tooltip.Placement = "bottom";
    private popperInstance: Instance | null = null;
    private activeTooltipTrigger: HTMLElement | null = null;
    private activeTooltipHost: Tooltip.ELEMENT | null = null;
    private customTooltipInteraction: TooltipInteraction | null = null;
    private virtualTooltipHoverBridge: HTMLDivElement | null = null;
    private positionTrackingId: number | undefined;

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
      this.virtualTooltipHoverBridge = null;
    }

    private initVirtualElements(popper: HTMLElement, slotContent: Element[] | null | undefined) {
      const popperClone = popper.cloneNode(true) as HTMLDivElement;

      if (this.virtualWrapper.hasChildNodes()) {
        this.removeChildFromVirtualPopper();
      }

      this.virtualWrapper.append(popperClone);

      const hoverBridge = document.createElement("div");
      hoverBridge.className = "md-tooltip__hover-bridge";
      hoverBridge.setAttribute("aria-hidden", "true");
      Object.assign(hoverBridge.style, {
        position: "absolute",
        display: "none",
        pointerEvents: "auto",
        background: "transparent"
      });
      this.virtualTooltipHoverBridge = hoverBridge;
      popperClone.append(hoverBridge);
      if (this.customTooltipInteraction) {
        this.customTooltipInteraction.setSurface(popperClone);
      } else {
        this.activeTooltipHost?.setTooltipSurface(popperClone);
      }

      if (slotContent) {
        this.setVirtualSlotContent(slotContent);
      }
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

      if (this.activeTooltipTrigger !== reference) {
        this.activeTooltipHost?.notifyTooltipDestroy();
      }
      this.customTooltipInteraction?.disconnect();
      this.customTooltipInteraction = null;
      this.destroyPopperInstance();
      this.activeTooltipTrigger = reference;
      const root = reference.getRootNode() as ShadowRoot;
      const host = root.host?.localName === "md-tooltip" ? (root.host as Tooltip.ELEMENT) : null;
      this.activeTooltipHost = host?.opened ? host : null;
      if (!this.activeTooltipHost) {
        this.customTooltipInteraction = new TooltipInteraction({
          reference: () => reference,
          isOpen: () => this.activeTooltipTrigger === reference,
          open: () => undefined,
          close: () => this.closeActiveTooltip()
        });
        this.customTooltipInteraction.connect(reference);
      }
      this.placement = placement;
      this.initVirtualElements(popper, slotContent);
      this.startContinuousPositionTracking(reference);
      this.showVirtualTooltip();
    }

    private updateTooltipHoverBridge() {
      const bridge = this.virtualTooltipHoverBridge;
      const trigger = this.activeTooltipTrigger;
      const popper = this.virtualPopper;

      if (!bridge || !trigger || !popper || !popper.hasAttribute("data-show")) {
        if (bridge) {
          bridge.style.display = "none";
        }
        return;
      }

      const triggerRect = trigger.getBoundingClientRect();
      const popperRect = popper.getBoundingClientRect();
      const side = (popper.getAttribute("data-popper-placement") || this.placement).split("-")[0];
      const scaleX = popper.offsetWidth ? popperRect.width / popper.offsetWidth || 1 : 1;
      const scaleY = popper.offsetHeight ? popperRect.height / popper.offsetHeight || 1 : 1;
      // Keep the bridge inside the popper so positioning, stacking and transforms are shared.
      // One pixel of overlap at each end avoids a gap caused by fractional positioning.
      Object.assign(bridge.style, {
        display: "block",
        left: "",
        right: "",
        top: "",
        bottom: "",
        width: "",
        height: ""
      });
      if (side === "top" || side === "bottom") {
        const gap =
          Math.max(0, side === "top" ? triggerRect.top - popperRect.bottom : popperRect.top - triggerRect.bottom) /
          scaleY;
        bridge.style.left = "-1px";
        bridge.style.width = "calc(100% + 2px)";
        bridge.style.height = `${gap + 2}px`;
        bridge.style[side === "top" ? "bottom" : "top"] = `${-gap - 1}px`;
      } else if (side === "left" || side === "right") {
        const gap =
          Math.max(0, side === "left" ? triggerRect.left - popperRect.right : popperRect.left - triggerRect.right) /
          scaleX;
        bridge.style.top = "-1px";
        bridge.style.height = "calc(100% + 2px)";
        bridge.style.width = `${gap + 2}px`;
        bridge.style[side === "left" ? "right" : "left"] = `${-gap - 1}px`;
      } else {
        bridge.style.display = "none";
      }
    }

    private startContinuousPositionTracking(trigger: HTMLElement): void {
      this.stopContinuousPositionTracking();

      const trackPosition = () => {
        if (this.activeTooltipTrigger === trigger && this.popperInstance) {
          if (!trigger.isConnected) {
            this.closeActiveTooltip();
            return;
          }
          this.popperInstance.update();
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

    handleVirtualTooltipDestroy(event: CustomEvent<Partial<TooltipEvent>>) {
      event.stopPropagation();
      const reference = event.detail?.reference;
      // Legacy custom callers dispatch on md-theme with no detail; that closes its current tooltip.
      // Callers supplying a reference retain protection against stale close events.
      if (reference && reference !== this.activeTooltipTrigger) {
        return;
      }
      if (this.customTooltipInteraction) {
        this.customTooltipInteraction.requestClose();
      } else {
        this.closeActiveTooltip();
      }
    }

    private closeActiveTooltip() {
      const host = this.activeTooltipHost;
      this.customTooltipInteraction?.disconnect();
      this.customTooltipInteraction = null;
      this.hideVirtualTooltip();
      this.activeTooltipTrigger = null;
      this.activeTooltipHost = null;
      host?.notifyTooltipDestroy();
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
      const { slotContent, reference } = event.detail;

      if (reference === this.activeTooltipTrigger && slotContent) {
        this.setVirtualSlotContent(slotContent);
      }
    }

    handleTooltipRemoved = (event: Event) => {
      const reference = (event as CustomEvent<Partial<TooltipEvent>>).detail?.reference;
      if (reference !== this.activeTooltipTrigger) {
        return;
      }
      this.closeActiveTooltip();
    };

    private destroyPopperInstance() {
      if (this.popperInstance) {
        this.popperInstance.destroy();
        this.popperInstance = null;
      }
    }

    private createPopperInstance(placement: Tooltip.Placement) {
      if (this.virtualPopper && this.activeTooltipTrigger) {
        const halfArrowSize = 8;
        const additionalPadding = 4;

        this.popperInstance = createPopper(this.activeTooltipTrigger, this.virtualPopper, {
          placement,
          modifiers: [
            ...defaultModifiers,
            flip,
            offset,
            arrow,
            {
              name: "tooltipHoverBridge",
              enabled: true,
              phase: "afterWrite",
              fn: () => this.updateTooltipHoverBridge()
            },
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
      }
    }

    private get virtualPopper() {
      return this.shadowRoot?.querySelector<HTMLElement>(".md-tooltip__popper") ?? null;
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
      }
    }

    private hideVirtualTooltip() {
      this.virtualPopper?.toggleAttribute("data-show", false);
      if (this.virtualTooltipHoverBridge) {
        this.virtualTooltipHoverBridge.style.display = "none";
      }
      this.destroyPopperInstance();
      this.stopContinuousPositionTracking();
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
      this.closeActiveTooltip();
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
