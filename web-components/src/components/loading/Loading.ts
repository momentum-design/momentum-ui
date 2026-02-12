/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./scss/module.scss";

export namespace Loading {
  export type LoadingSize = "small" | "middle" | "large" | "";

  @customElementWithCheck("md-loading")
  export class ELEMENT extends LitElement {
    @property({ type: String })
    size: LoadingSize = "";

    private isAnimating = false;

    private animationFrameId: number | null = null;

    static get styles() {
      return [reset, styles];
    }

    protected override firstUpdated(_changedProperties: PropertyValues): void {
      super.firstUpdated(_changedProperties);
      this.isAnimating = true;
      this.startAnimation();
    }

    override disconnectedCallback(): void {
      super.disconnectedCallback();
      this.isAnimating = false;
      this.stopAnimation();
    }

    private startAnimation() {
      const loadingElements = this.shadowRoot?.querySelectorAll<HTMLElement>(".md-loading__icon");
      if (!loadingElements) return;

      let start: number | null = null;
      const duration = 1400;

      const animate = (timestamp: number) => {
        if (!this.isAnimating) return;

        if (!start) start = timestamp;
        const progress = (timestamp - start) % duration;

        loadingElements.forEach((element, index) => {
          const delay = index * 200;
          const adjustedProgress = (progress - delay + duration) % duration;

          let scale = 0;
          let opacity = 0.1;
          if (adjustedProgress < 280) {
            // Animation growing phase (0% to 20%)
            const growProgress = 0.1 + (adjustedProgress / 280) * 0.9;
            scale = growProgress;
            opacity = growProgress;
          } else if (adjustedProgress < 1400) {
            // Animation fading phase (20% to 100%)
            const fadingProgress = Math.min(((adjustedProgress - 280) / (duration - 280)) * 2, 1);
            scale = Math.max(1 - fadingProgress * 0.9, 0.9);
            opacity = Math.max(1 - fadingProgress * 0.9, 0.2);
          }

          element.style.transform = `scale(${scale})`;
          element.style.opacity = `${opacity}`;
        });

        this.animationFrameId = requestAnimationFrame(animate);
      };

      this.animationFrameId = requestAnimationFrame(animate);
    }

    private stopAnimation() {
      if (this.animationFrameId !== null) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      const loadingElements = this.shadowRoot?.querySelectorAll<HTMLElement>(".md-loading__icon");
      if (loadingElements) {
        loadingElements.forEach((element) => {
          element.style.transform = "scale(0, 0)";
          element.style.opacity = "0.1";
        });
      }
    }

    get loadingClassMap() {
      return {
        [`md-loading--${this.size}`]: !!this.size
      };
    }

    get loadingIconClassMap() {
      return {
        "md-loading__icon": true
      };
    }

    render() {
      return html`
        <div class="md-loading ${classMap(this.loadingClassMap)}">
          <span class=${classMap(this.loadingIconClassMap)}></span>
          <span class=${classMap(this.loadingIconClassMap)}></span>
          <span class=${classMap(this.loadingIconClassMap)}></span>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-loading": Loading.ELEMENT;
  }
}
