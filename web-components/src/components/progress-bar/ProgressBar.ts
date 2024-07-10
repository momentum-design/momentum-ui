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
import { classMap } from "lit-html/directives/class-map";
import styles from "./scss/module.scss";

export namespace ProgressBar {
  export type BarFormat = "none" | "fraction" | "percentage";
  export type BarType = "determinate" | "indeterminate";

  @customElementWithCheck("md-progress-bar")
  export class ELEMENT extends LitElement {
    @property({ type: Boolean }) dynamic = false;

    @property({ type: String }) color = "";
    @property({ type: String }) label = "";
    @property({ type: String }) displayFormat: ProgressBar.BarFormat = "percentage";
    @property({ type: String }) type: ProgressBar.BarType = "indeterminate";

    @property({ type: Number }) min = 0;
    @property({ type: Number }) max = 100;
    @property({ type: Number }) value = 25;
    @property({ type: Number }) adjustedValue = 0;
    @property({ type: Number }) valueFraction = 0;
    @property({ type: String }) meterWidth = "100";

    connectedCallback() {
      super.connectedCallback();
      this.requestUpdate("value");
    }

    getDisplayFormat = () => {
      if (this.type === "indeterminate") {
        this.value = 100;
        return null;
      }
      this.adjustedValue = this.max - this.value < 0 ? this.max : this.value;
      this.valueFraction = (this.adjustedValue / this.max) * 100 || 0;
      this.meterWidth = this.valueFraction.toFixed(0) + "%";

      if (this.displayFormat === "none") {
        return null;
      } else if (this.displayFormat === "percentage") {
        return this.meterWidth;
      }

      return `${this.adjustedValue} / ${this.max}`;
    };

    getColor = () => {
      if (this.color) {
        return this.color;
      } else if (this.dynamic) {
        if (this.valueFraction < 25) {
          return "success";
        } else if (this.valueFraction < 50) {
          return "info";
        } else if (this.valueFraction < 75) {
          return "warning";
        }

        return "danger";
      }
    };

    static get styles() {
      return [reset, styles];
    }

    render() {
      const classNamesInfo = {
        [`progress--${this.type}`]: this.type,
        [`progress--${this.color}`]: this.color
      };
      return html`
        <span>
          <div class="progressbar-info" data-key="${this.min}">
            <span class="progressbar-label">${this.label}</span>
            <span class="progressbar-progress">${this.getDisplayFormat()}</span>
          </div>
          <div class="progress ${classMap(classNamesInfo)}" data-key="${this.max}">
            <span
              class="meter"
              role="progressbar"
              aria-labelledby="progressbar"
              aria-valuenow=${this.adjustedValue}
              aria-valuemin=${this.min}
              aria-valuemax=${this.max}
              aria-valuetext=${this.meterWidth}
              style="${`width: ` + this.meterWidth + `; background: ` + this.getColor()}"
            >
            </span>
          </div>
        </span>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-progress-bar": ProgressBar.ELEMENT;
  }
}
