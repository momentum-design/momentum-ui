import reset from "@/wc_scss/reset.scss";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { html, internalProperty, LitElement, property } from "lit-element";
import { nothing } from "lit-html";
import styles from "./scss/module.scss";

const ScrollDirection = ["vertical", "horizontal"] as const;

export namespace Scrollbar {
  export type ScrollDirection = typeof ScrollDirection[number];

  @customElementWithCheck("md-scrollbar")
  export class ELEMENT extends LitElement {
    @property({ type: String }) height = "200px";
    @property({ type: String }) width = "348px";
    @property({ type: String }) scrollDirection: ScrollDirection = "vertical";
    @property({ type: Boolean }) disabled = false;

    @internalProperty() private hideScrollbarTimeout: number | null;

    renderHeight = () => {
      return this.height ? `height: ${this.height};` : nothing;
    };
    renderWidth = () => {
      return this.width ? `width: ${this.width};` : nothing;
    };

    getStyles = () => {
      if (this.height || this.width) {
        return html`
          <style>
            :host .scroll-container {
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

    constructor() {
      super();
      this.hideScrollbarTimeout = null;
      this.handleScroll = this.handleScroll.bind(this);
    }

    connectedCallback() {
      super.connectedCallback();
      this.shadowRoot?.addEventListener("scroll", this.handleScroll, true);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.shadowRoot?.removeEventListener("scroll", this.handleScroll, true);
    }

    handleScroll() {
      const content = this.shadowRoot?.querySelector(".scroll-container");
      content?.classList.add("show-scrollbar");

      if (this.hideScrollbarTimeout) {
        clearTimeout(this.hideScrollbarTimeout);
      }
      this.hideScrollbarTimeout = window.setTimeout(() => {
        content?.classList.remove("show-scrollbar");
      }, 1000);
    }

    render() {
      return html`
        ${this.getStyles()}

        <div class="scroll-container ${`scrollbar-${this.scrollDirection}`}">
          <slot></slot>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-scrollbar": Scrollbar.ELEMENT;
  }
}
