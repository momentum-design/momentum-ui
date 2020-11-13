/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElement, html, internalProperty, LitElement, property, PropertyValues, query } from "lit-element";
import { Tooltip, TooltipEvent } from "@/components/tooltip/Tooltip";
import { lumosDark, lumosLight, momentumDark, momentumLight } from "./index";
import { arrow, createPopper, flip, Instance, offset } from "@popperjs/core/lib";
import { defaultModifiers } from "@popperjs/core/lib/popper-lite";

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
    adoptedStyleSheets?: CSSStyleSheet[];
  }

  interface CSSStyleSheet {
    replaceSync: Function;
  }
}
export namespace Theme {
  export type Attributes = {
    darkTheme: boolean;
    mdTheme: boolean;
  };
}

@customElement("md-theme")
export class Theme extends LitElement {
  @property({ type: Boolean }) darkTheme = false;
  @property({ type: Boolean }) lumos = false;

  @internalProperty() private activeTheme = momentumLight;

  @query("[popper-virtual-popper]") virtualPopper!: HTMLDivElement;
  @query("[popper-virtual-reference]") virtualReference!: HTMLDivElement;

  private placement: Tooltip.Placement = "bottom";
  private popperInstance: Instance | null = null;

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

  private applyStyle() {
    const shadow = this.shadowRoot as ShadowRoot;
    /* c8 ignore next 4 */
    if ("adoptedStyleSheets" in document) {
      const newTheme = new CSSStyleSheet();
      newTheme.replaceSync(this.activeTheme);
      shadow.adoptedStyleSheets = [newTheme];
    } else {
      const styleNode = document.createElement("style");
      styleNode.textContent = this.activeTheme.cssText;
      shadow.appendChild(styleNode);
    }
  }

  private removeChildFromvirtualPopper() {
    while (this.virtualPopper.firstElementChild) {
      this.virtualPopper.firstElementChild.remove();
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
    style.zIndex = "1000";
  }

  private setVirtualReferencePosition(trigger: HTMLElement) {
    const triggerRect = trigger.getBoundingClientRect();

    this.setStyleToVirtualReference(triggerRect);
  }

  private initVirtualElements(popper: HTMLElement, reference: HTMLElement) {
    const popperClone = popper.cloneNode(true) as HTMLDivElement;

    if (this.virtualPopper.hasChildNodes()) {
      this.removeChildFromvirtualPopper();
    }

    this.virtualPopper.append(popperClone);

    this.setVirtualReferencePosition(reference);
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    this.activeTheme = this.setTheme();
    this.applyStyle();
  }

  handleVirtualTooltipCreate(event: CustomEvent<TooltipEvent>) {
    const { popper, placement, reference } = event.detail;

    this.placement = placement;
    this.initVirtualElements(popper, reference);

    reference.setAttribute("style", "pointer-events:none");
  }

  handleVirtualTooltipDestroy(event: CustomEvent<TooltipEvent>) {
    const { reference } = event.detail;

    this.setInitStyleToVirtualReference();
    reference.removeAttribute("style");
  }

  private destroyPopperInstance() {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
  }

  private createPopperInstance(placement: Tooltip.Placement) {
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
            offset: [0, 8]
          }
        }
      ]
    });
  }

  private showVirtualTooltip() {
    this.virtualPopper.toggleAttribute("data-show", true);
    this.createPopperInstance(this.placement);
  }

  private hideVirtualTooltip() {
    this.virtualPopper.toggleAttribute("data-show", false);
    this.destroyPopperInstance();
  }

  private setupEvents() {
    this.addEventListener("tooltip-create", this.handleVirtualTooltipCreate as EventListener);
    this.addEventListener("tooltip-destroy", this.handleVirtualTooltipDestroy as EventListener);
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
      <div class="theme-wrapper">
        <slot></slot>
        <div class="md-tooltip" popper-virtual-popper></div>
        <div
          popper-virtual-reference
          @mouseenter=${this.showVirtualTooltip}
          @mouseleave=${this.hideVirtualTooltip}
          aria-describedby="tooltip"
        ></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-theme": Theme;
  }
}
