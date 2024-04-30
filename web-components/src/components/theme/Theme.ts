/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import styles from "@/components/tooltip/scss/module.scss";
import { Tooltip, TooltipEvent } from "../tooltip/Tooltip"; // Keep type import as a relative path
import { arrow, createPopper, flip, Instance, offset } from "@popperjs/core/lib";
import { defaultModifiers } from "@popperjs/core/lib/popper-lite";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { html, internalProperty, LitElement, property, PropertyValues, query } from "lit-element";
import { lumosDark, lumosLight, momentumDark, momentumLight } from "./index";

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
    replaceSync: Function;
  }
}

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

    @internalProperty() private activeTheme = momentumLight;

    @query("[virtual-global-popper]") virtualWrapper!: HTMLDivElement;
    @query("[virtual-global-reference]") virtualReference!: HTMLDivElement;

    private placement: Tooltip.Placement = "bottom";
    private popperInstance: Instance | null = null;
    private eventListeners: {
      mouseEnter?: (event: MouseEvent) => void;
      mouseLeave?: (event: MouseEvent) => void;
    } = {};
    private currentPopperClone: HTMLElement | null = null;
    private parentPopper: HTMLElement | null = null;

    private setTheme() {
      if (this.lumos) {
        if (this.darkTheme) {
          return lumosDark;
        } else {
          return lumosLight;
        }
      } else {
        if (this.darkTheme) {
          return momentumDark;
        } else {
          return momentumLight;
        }
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

      this.eventListeners.mouseEnter = () => this.mdToolTip.toggleAttribute('opened',true);
      this.eventListeners.mouseLeave = () => this.mdToolTip.toggleAttribute('opened',false);
      popperClone.addEventListener('mouseenter', this.eventListeners.mouseEnter);
      popperClone.addEventListener('mouseleave', this.eventListeners.mouseLeave);
      this.currentPopperClone = popperClone;

      if (this.virtualWrapper.hasChildNodes()) {
        this.removeChildFromVirtualPopper();
      }

      this.virtualWrapper.append(popperClone);

      if (slotContent) {
        this.setVirtualSlotContent(slotContent);
      }

      this.setVirtualReferencePosition(reference);
    }

    private setVirtualSlotContent(slotContent: Element[]) {
      if (this.virtualTooltipContent) {
        while (this.virtualTooltipContent.firstElementChild) {
          this.virtualTooltipContent.firstElementChild.remove();
        }

        slotContent.forEach(element => this.virtualTooltipContent!.append(element));
      }
    }

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("lumos") || changedProperties.has("darkTheme")) {
        this.dispatchEvent(
          new CustomEvent("theme-changed", {
            composed: true,
            bubbles: true,
            detail: {
              darkTheme: this.darkTheme,
              lumos: this.lumos
            }
          })
        );
      }
      this.activeTheme = this.setTheme();
      this.applyStyle();
    }

    handleVirtualTooltipCreate(event: CustomEvent<TooltipEvent>) {
      event.stopPropagation();

      const { popper, placement, reference, slotContent } = event.detail;

      this.placement = placement;
      this.parentPopper = popper;
      this.initVirtualElements(popper, reference, slotContent);
      this.showVirtualTooltip();
    }

    handleVirtualTooltipDestroy(event: CustomEvent<TooltipEvent>) {
      event.stopPropagation();
      this.hideVirtualTooltip();
    }

    handleVirtualTooltipChangeMessage(event: CustomEvent<TooltipEvent>) {
      const { popper } = event.detail;

      const content = popper.querySelector(".md-tooltip__content");
      const virtualContent = this.virtualWrapper.querySelector(".md-tooltip__content");

      if (content && virtualContent) {
        const message = content.textContent;
        const virtualMessage = virtualContent.textContent;
        if (message && virtualMessage) {
          virtualContent.textContent = message;
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
    };

    private destroyPopperInstance() {
      if (this.popperInstance) {
        this.popperInstance.destroy();
        this.popperInstance = null;
      }
    }

    private createPopperInstance(placement: Tooltip.Placement) {
      if (this.virtualPopper) {
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
                offset: [8, 8]
              }
            },
            ...(this.virtualArrow
              ? [
                  {
                    name: "arrow",
                    options: {
                      element: this.virtualArrow,
                      padding: 5
                    }
                  }
                ]
              : [])
          ]
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

    private get mdToolTip() {
      return (this.parentPopper!.getRootNode() as ShadowRoot).host;
    }

    private showVirtualTooltip() {
      if (this.virtualPopper) {
        this.virtualPopper.toggleAttribute("data-show", true);
        this.createPopperInstance(this.placement);
      }
    }

    private hideVirtualTooltip() {
      if (this.virtualPopper) {
        this.virtualPopper.toggleAttribute("data-show", false);
        this.destroyPopperInstance();
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

    private removeVirtualPopperEvents() {
      if (this.eventListeners.mouseEnter && this.currentPopperClone) {
        this.currentPopperClone.removeEventListener('mouseenter', this.eventListeners.mouseEnter);
      }
      if (this.eventListeners.mouseLeave && this.currentPopperClone) {
        this.currentPopperClone.removeEventListener('mouseleave', this.eventListeners.mouseLeave);
      }
      this.eventListeners.mouseEnter = undefined;
      this.eventListeners.mouseLeave = undefined;
      this.currentPopperClone = null;
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.teardownEvents();
      this.removeVirtualPopperEvents();
    }

    protected async firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);
      await new Promise(resolve => setTimeout(resolve, 0));
      this.setupEvents();
    }

    static get styles() {
      return [momentumLight];
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
          <div class="md-tooltip" virtual-global-popper></div>
          <div virtual-global-reference aria-describedby="tooltip"></div>
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
