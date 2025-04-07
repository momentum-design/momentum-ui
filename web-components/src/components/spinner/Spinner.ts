/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property, PropertyValues } from "lit-element";
import { styleMap } from "lit-html/directives/style-map";
import styles from "./scss/module.scss";

export namespace Spinner {
  @customElementWithCheck("md-spinner")
  export class ELEMENT extends LitElement {
    @property({ type: Number, reflect: true })
    size = 56;

    private isAnimating = false;

    private animationFrameId: number | null = null;

    static get styles() {
      return [reset, styles];
    }

    get spinnerStyleMap() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`
      };
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
      super.firstUpdated(_changedProperties);
      this.isAnimating = true;
      this.startAnimation();
    }

    disconnectedCallback(): void {
      super.disconnectedCallback();
      this.isAnimating = false;
      this.stopAnimation();
    }

    private startAnimation() {
      const spinner = this.shadowRoot?.querySelector<HTMLElement>(".md-spinner");
      if (!spinner) return;

      let start: number | null = null;
      const duration = 1000;

      const animate = (timestamp: number) => {
        if (!this.isAnimating) return;

        if (!start) start = timestamp;
        const progress = timestamp - start;
        const rotation = (progress / duration) * 360;
        spinner.style.transform = `rotate(${rotation}deg)`;

        if (progress >= duration) {
          start = timestamp;
        }

        this.animationFrameId = requestAnimationFrame(animate);
      };

      this.animationFrameId = requestAnimationFrame(animate);
    }

    private stopAnimation() {
      if (this.animationFrameId !== null) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      const spinner = this.shadowRoot?.querySelector<HTMLElement>(".md-spinner");
      if (spinner) {
        spinner.style.transform = "";
      }
    }

    render() {
      return html` <i class="md-spinner" part="spinner" style=${styleMap(this.spinnerStyleMap)}></i> `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-spinner": Spinner.ELEMENT;
  }
}
