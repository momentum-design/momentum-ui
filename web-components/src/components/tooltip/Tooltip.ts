/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { FocusMixin } from "@/mixins";
import reset from "@/wc_scss/reset.scss";
import arrow from "@popperjs/core/lib/modifiers/arrow";
import flip from "@popperjs/core/lib/modifiers/flip";
import offset from "@popperjs/core/lib/modifiers/offset";
import { createPopper, defaultModifiers, Instance, State } from "@popperjs/core/lib/popper-lite";
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

export namespace Tooltip {
  export type Placement = typeof tooltipPlacement[number];
  export type Strategy = typeof tooltipStrategy[number];
}

@customElement("md-tooltip")
export class Tooltip extends FocusMixin(LitElement) {
  @property({ type: String }) message = "";
  @property({ type: String }) placement: Tooltip.Placement = "auto";
  @property({ type: Boolean }) disabled = false;

  @query(".md-tooltip__container") tooltip?: HTMLDivElement;
  @query(".md-tooltip__trigger") trigger?: HTMLDivElement;
  @query(".md-tooltip__arrow") arrow!: HTMLDivElement;

  private popperInstance: Instance | null = null;
  private parentLevelsUp = 0;

  withinOverlayCheck = (element: HTMLElement | null): Promise<Partial<State>> | undefined => {
    const menuOverlayTag = "MD-MENU-OVERLAY";
    const themeTag = "MD-THEME";
    const maxLevelsUp = 10;

    if (!element || !element.parentElement) return;
    const currentTagName = element.parentElement.tagName;
    if (currentTagName === menuOverlayTag) {
      return this.popperInstance?.setOptions({ strategy: "absolute" });
    } else if (this.parentLevelsUp > maxLevelsUp || currentTagName === themeTag) {
      return;
    } else {
      this.parentLevelsUp++;
      return this.withinOverlayCheck(element.parentElement);
    }
  };

  protected handleFocusIn(event: Event) {
    if (super.handleFocusIn) {
      super.handleFocusIn(event);
    }
    this.showTooltip();
  }

  protected handleFocusOut(event: Event) {
    if (super.handleFocusOut) {
      super.handleFocusOut(event);
    }
    this.hideTooltip();
  }

  private destroy() {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
  }

  private create() {
    const { trigger, tooltip } = this;
    this.popperInstance = createPopper(trigger!, tooltip!, {
      placement: this.placement,
      strategy: "fixed",
      modifiers: [
        ...defaultModifiers,
        flip,
        offset,
        arrow,
        {
          name: "arrow",
          options: {
            element: this.arrow
          }
        },
        {
          name: "offset",
          options: {
            offset: [0, 8]
          }
        }
      ]
    });
  }

  showTooltip() {
    if (this.tooltip) {
      this.tooltip.toggleAttribute("data-show", true);
      this.create();
      this.withinOverlayCheck(this);
    }
  }

  hideTooltip() {
    if (this.tooltip) {
      this.tooltip.toggleAttribute("data-show", false);
      this.destroy();
    }
  }

  get tooltipClassMap() {
    return {
      "md-tooltip--disabled": this.disabled
    };
  }

  content = () => {
    return html`
      <slot name="tooltip-content"></slot>
    `;
  };

  render() {
    return html`
      <div class="md-tooltip ${classMap(this.tooltipClassMap)}">
        <div class="md-tooltip__container" role="tooltip">
          <div class="md-tooltip__content">
            ${this.message || this.content()}
          </div>
          <div id="arrow" class="md-tooltip__arrow" data-popper-arrow></div>
        </div>
        <div
          class="md-tooltip__trigger"
          @mouseenter=${this.showTooltip}
          @mouseleave=${this.hideTooltip}
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
