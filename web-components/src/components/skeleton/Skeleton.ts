import { customElement, html, LitElement, property } from "lit-element";
import style from "./scss/module.scss";

export const skeletonAnimationTypes = ["none", "pulse"] as const;
export const skeletonVariants = ["circle", "rectangular", "rounded"] as const;

export namespace Skeleton {
  export type AnimationType = (typeof skeletonAnimationTypes)[number];
  export type Variant = (typeof skeletonVariants)[number];

  @customElement("md-skeleton")
  export class ELEMENT extends LitElement {
    @property({ type: String }) width?: string;
    @property({ type: String }) height?: string;
    @property({ reflect: true }) variant?: Variant = "rounded";
    @property({ reflect: true }) animation?: AnimationType = "pulse";

    public render() {
      this.style.width = this.width ?? this.style.width;
      this.style.height = this.height ?? this.style.height;

      return html`<slot></slot>`;
    }

    static get styles() {
      return [style];
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-skeleton": Skeleton.ELEMENT;
  }
}
