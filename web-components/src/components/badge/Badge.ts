/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property } from "lit-element";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import { BadgeCircleSize } from "./badge.constant";
import styles from "./scss/module.scss";

export namespace Badge {
  export type BadgeCircleSize = (typeof BadgeCircleSize)[keyof typeof BadgeCircleSize];
  @customElementWithCheck("md-badge")
  export class ELEMENT extends LitElement {
    @property({ type: String }) ariaLabel = "";
    @property({ type: String }) color = "";
    @property({ type: String }) bgColor = "";
    @property({ type: String }) textColor = "";
    @property({ type: String }) height = "";
    @property({ type: String }) width = "";
    @property({ type: Boolean }) outlined = false;
    @property({ type: Boolean }) compact = false;
    @property({ type: Boolean }) circle = false;
    @property({ type: Number, attribute: "circle-size" }) circleSize: BadgeCircleSize = BadgeCircleSize[40];
    @property({ type: Boolean }) small = false;
    @property({ type: Boolean }) split = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: String }) tabIndexing = "";
    @property({ type: String }) ariaHiddenSplits = "";

    renderBgColor = () => {
      return this.bgColor ? `background-color: ${this.bgColor};` : nothing;
    };
    renderTextColor = () => {
      return this.textColor ? `color: ${this.textColor};` : nothing;
    };
    renderHeight = () => {
      return this.height ? `height: ${this.height};` : nothing;
    };
    renderWidth = () => {
      return this.width ? `width: ${this.width};` : nothing;
    };

    getStyles = () => {
      if (this.bgColor || this.textColor || this.height || this.width) {
        return html`
          <style>
            :host .md-badge {
              ${this.renderBgColor()};
              ${this.renderTextColor()};
              ${this.renderHeight()};
              ${this.renderWidth()};
            }
          </style>
        `;
      } else return nothing;
    };

    static get styles() {
      return [reset, styles];
    }

    private get computedAriaHiddenSplits(): boolean | undefined {
      if (this.ariaHiddenSplits === "true") {
        return true;
      } else if (this.ariaHiddenSplits === "false") {
        return false;
      }
      return undefined;
    }

    private get computedTabIndex(): number | undefined {
      const parsedValue = parseInt(this.tabIndexing);
      return isNaN(parsedValue) ? undefined : parsedValue;
    }

    render() {
      const classNamesInfo = {
        "md-badge--circle": this.circle,
        [`md-badge--circle-${this.circleSize}`]: this.circle,
        "md-badge--split": this.split,
        "md-badge--compact": this.compact,
        "md-badge--small": this.small,
        "md-badge--outline": this.outlined,
        "md-badge--disabled": this.disabled,
        [`md-badge--${this.color}`]: !this.disabled && this.color
      };

      const splitContent = () => {
        return html`
          <slot
            aria-hidden=${ifDefined(this.computedAriaHiddenSplits)}
            name="split-left"
            class="split split-left"
          ></slot>
          <span aria-hidden="true" class="split-separator"> | </span>
          <slot
            aria-hidden=${ifDefined(this.computedAriaHiddenSplits)}
            name="split-right"
            class="split split-right"
          ></slot>
        `;
      };

      return html`
        ${this.getStyles()}
        <span
          tabindex=${ifDefined(this.computedTabIndex)}
          part="badge"
          class="md-badge ${classMap(classNamesInfo)}"
          aria-label=${this.ariaLabel}
        >
          ${this.split ? splitContent() : nothing}
          <slot></slot>
        </span>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-badge": Badge.ELEMENT;
  }
}
